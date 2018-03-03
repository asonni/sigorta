
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
    const { user, name, discount, limit } = body
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
    if (limit) {
      updates.limit = limit
    }
    return Client.findByIdAndUpdate(id, updates)
  }

  findByIdAndUpdateBalance(clientId, balance, transaction) {
    const { Client } = this.req.models
    let updates = {}
    return Client.findById(clientId)
    .then(client => {
      if (transaction === 'add') {
        updates.balance = client.balance + balance
      } else {
        updates.balance = client.balance - balance
      }
      return Client.findByIdAndUpdate(client._id, updates)
    })
  }

  deleteClientById(id) { 
    const { Client } = this.req.models
    return Client.remove({ _id: id })
  }

  fetchBalancesByClientId(id) {
    const { Balance } = this.req.models
    return Balance.find({ client: id })
  }

  fetchOrdersByClientId(id) {
    const { Order } = this.req.models
    return Order.find({ client: id }).populate('client', ['name', 'discount', 'balance', '_id']).populate('plan', ['name', 'price', '_id'])
  }
}

module.exports =  ClientService
