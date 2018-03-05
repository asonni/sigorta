class UsersService {

  constructor(req) {
    this.req = req
  }

  fetchUsers() {
    const { User } = this.req.models
    return User.find()
  }

  fetchUserById(id) {
    const { User } = this.req.models
    return User.findById(id)
  }

  createUser(data) {
    const { User } = this.req.models
    return User.create(data)
  }

  updatePassword(id, password) {
    const { User } = this.req.models
    return User.findById(id).then(user =>{
      user.password = password
      return user.save()
    })
  }

  findByIdAndUpdate(id, body) {
    const { User } = this.req.models
    const { fname, lname, password, phone, client } = body
    let updates = {}

    if (fname) {
      updates.fname = fname
    }
    if (lname) {
      updates.lname = lname
    }
    if (phone) {
      updates.phone = phone
    }
    if (client) {
      updates.client = client
    }
    
    return User.findByIdAndUpdate(id, updates, { new: true })
  }

  deleteUserById(id) { 
    const { User } = this.req.models
    return User.remove({ _id: id })
  }

  logIn(email, password) {
    const { User } = this.req.models
    return User.findOne({ email }).then(user => {
      if (!user || !user.validatePassword(password)) {
        return { status: 401, error: "The email or password doesn't match." }
      } else {
        delete user.passwordHash
        return user
      }
    })
  }

  validateUserRegistrationReq(user) {
   
    if (!user.email) {
      return { status: 400, error: "You must provide an email." }
    }
    if (!user.fname || !user.lname) {
      return { status: 400, error: "You must provide your full name." }
    }

    const validatePassword = this.validatePassword(user.password)

    if (validatePassword.error) {
      return validatePassword
    }

    return
  }

  validatePassword(password) {
    if (!password) {
      return { status: 400, error: "You must provide a password." }
    }
    if (password.length < 8) {
      return { status: 400, error: "Password must be 8 characters or longer." }
    }
    if (password.length > 128) {
      return { status: 400, error: "Password must be 128 characters or less." }
    }
    return true
  }

}

module.exports =  UsersService
