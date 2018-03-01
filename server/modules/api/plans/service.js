
class PlanService {

  constructor(req) {
    this.req = req
  }

  fetchPlans() {
    const { Plan } = this.req.models
    return Plan.find()
  }

  fetchPlanById(id) {
    const { Plan } = this.req.models
    return Plan.findById(id)
  }

  createPlan(data) {
    const { Plan } = this.req.models
    return Plan.create(data)
  }

  findByIdAndUpdate(id, body) {
    const { Plan } = this.req.models
    const { name, price } = body
    let updates = {}

    if (name) {
      updates.name = name
    }
    if (price) {
      updates.price = price
    }
    
    return Plan.findByIdAndUpdate(id, updates, { new: true })
  }

  deletePlanById(id) { 
    const { Plan } = this.req.models
    return Plan.remove({ _id: id })
  }
}

module.exports =  PlanService
