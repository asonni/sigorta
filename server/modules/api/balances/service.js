
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

  deleteBalanceById(id) { 
    const { Balance } = this.req.models
    return Balance.remove({ _id: id })
  }

  deleteBalanceByOrderId(orderId) { 
    const { Balance } = this.req.models
    return Balance.remove({ order: orderId })
  }
}

module.exports =  BalanceService
