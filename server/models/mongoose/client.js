const mongoose = require("mongoose")

const ClientSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  discount: { type: Number, min: 0, max: 100, default: 0 },
  limit: { type: Boolean, default: true },
  balance: { type: Number, default: 0 }
},{
  timestamps: true
})

const Client = mongoose.model("Client", ClientSchema)

module.exports = Client