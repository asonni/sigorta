
class BalanceService {

  constructor(req) {
    this.req = req
  }

  fetchBalances() {
    const { Balance } = this.req.models
    return Balance.find().populate('client', ['name', '_id'])
  }

  fetchBalanceById(id) {
    const { Balance } = this.req.models
    return Balance.findById(id).populate('client', ['name', '_id'])
  }

  createBalance(data) {
    const { Balance } = this.req.models
    return Balance.create(data)
  }

  findByIdAndUpdate(id, body) {
    const { Balance } = this.req.models
    const { balance } = body
    let updates = {}

    if (balance) {
      updates.balance = balance
    }
    
    return Balance.findByIdAndUpdate(id, updates)
  }

  deleteBalanceById(id, body) { 
    const { Balance } = this.req.models
    return Balance.remove(id)
  }
}

module.exports =  BalanceService
