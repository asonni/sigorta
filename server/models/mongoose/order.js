const mongoose = require("mongoose")

const OrderSchema = mongoose.Schema({
  client: { type: mongoose.Schema.ObjectId, required: true, ref: 'Client' },
  plan: { type: mongoose.Schema.ObjectId, required: true, ref: 'Plan' },
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female'] },
  nationality: { type: String },
  passport: { type: String, required: true },
  phone: { type: String, required: true },
  fatherName: { type: String },
  motherName: { type: String },
  fatherPassport: { type: String },
  motherPassport: { type: String },
  address: { type: String, required: true },
  numberOfYears: { type: Number, enum: [1, 2], default: 1 },
  discount: { type: Number, default: 0 },
  price: { type: Number },
  totalPrice: { type: Number, default: 0 },
  totalPriceAfterDiscount: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
},{
  timestamps: true
})

const Order = mongoose.model("Order", OrderSchema)

module.exports = Order
