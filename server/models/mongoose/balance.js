const mongoose = require("mongoose")

const BalanceSchema = mongoose.Schema({
  client: { type: mongoose.Schema.ObjectId, required: true, ref: 'Client' },
  order: { type: mongoose.Schema.ObjectId, required: true, ref: 'Order' },
  transaction: { type: String, enum: ['add', 'substract'] },
  balance: { type: Number, default: 0 }
},{
  timestamps: true
})

const Balance = mongoose.model("Balance", BalanceSchema)

module.exports = { Balance, BalanceSchema }
