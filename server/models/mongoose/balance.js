const mongoose = require("mongoose")

const BalanceSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
  balance: { type: Number, default: 0 }
},{
  timestamps: true
})

const Balance = mongoose.model("Balance", BalanceSchema)

module.exports = { Balance, BalanceSchema }
