const mongoose = require("mongoose")

const PlanSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number,  default: 0 }
},{
  timestamps: true
})

const Plan = mongoose.model("Plan", PlanSchema)

module.exports = Plan
