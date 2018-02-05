const request = require("request")

module.exports = {
  getUserObj: (fname, lname, email, password) => {
    return {
      fname,
      lname,
      email,
      password,
      phone: "094847474774"
    }
  },
  logIn: (user, apiUrl, cb) => {
    let token = ''
    request.post(
      {
        url: `${apiUrl}/users/login`,
        form: {
          email: user.email,
          password: '111111'
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        token = body.id_token
        cb(token)
      }
    )
  }
}
