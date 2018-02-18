
class ClientService {

  constructor(req) {
    this.req = req
  }

  fetchClients() {
    const { Client } = this.req.models
    return Client.find().populate('user', ['fname', 'lname', 'email', 'phone', '_id'])
  }

  fetchClientById(id) {
    const { Client } = this.req.models
    return Client.findById(id).populate('user', ['fname', 'lname', 'email', 'phone', '_id'])
  }

  createClient(data) {
    const { Client } = this.req.models
    return Client.create(data)
  }

  findByIdAndUpdate(id, body) {
    const { Client } = this.req.models
    const { user, name, discount } = body
    let updates = {}

    if (user) {
      updates.user = user
    }
    if (name) {
      updates.name = name
    }
    if (discount) {
      updates.discount = discount
    }
    
    return Client.findByIdAndUpdate(id, updates)
  }

  deleteClientById(id, body) { 
    const { Client } = this.req.models
    return Client.remove(id)
  }

  fetchBalancesByClientId(id) {
    const { Balance } = this.req.models
    return Balance.find({ client: id })
  }
}

module.exports =  ClientService
