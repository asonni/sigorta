
class OrderService {

  constructor(req) {
    this.req = req
  }

  fetchOrders() {
    const { Order } = this.req.models
    return Order.find().populate('client', ['name', 'discount', 'balance', '_id']).populate('plan', ['name', 'price', '_id'])
  }

  fetchOrderById(id) {
    const { Order } = this.req.models
    return Order.findById(id).populate('client', ['name', 'discount', 'balance', '_id']).populate('plan', ['name', 'price', '_id'])
  }

  createOrder(data) {
    const { Order } = this.req.models
    return Order.create(data)
  }

  getClient(id) {
    const { Client } = this.req.models
    return Client.findById(id)
  }

  getPlan(id) {
    const { Plan } = this.req.models
    return Plan.findById(id)
  }

  findByIdAndUpdate(id, body) {
    const { Order } = this.req.models
    const { 
      name,
      passport,
      gender,
      nationality,
      phone,
      dob,
      fatherName,
      motherName,
      fatherPassport,
      motherPassport,
      address,
      status
    } = body
    let updates = {}

    if (name) {
      updates.name = name
    }
    if (passport) {
      updates.passport = passport
    }
    if (gender) {
      updates.gender = gender
    }
    if (nationality) {
      updates.nationality = nationality
    }
    if (phone) {
      updates.phone = phone
    }
    if (dob) {
      updates.dob = dob
    }
    if (fatherName) {
      updates.fatherName = fatherName
    }
    if (motherName) {
      updates.motherName = motherName
    }
    if (fatherPassport) {
      updates.fatherPassport = fatherPassport
    }
    if (motherPassport) {
      updates.motherPassport = motherPassport
    }
    if (address) {
      updates.address = address
    }
    if (status) {
      updates.status = status
    }
    return Order.findByIdAndUpdate(id, updates, { new: true })
  }

  deleteOrderById(id) { 
    const { Order } = this.req.models
    return Order.remove({ _id: id })
  }
}

module.exports =  OrderService
