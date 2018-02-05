const mongoose = require("mongoose")

const FileSchema = mongoose.Schema({
  name: { type: String },
  path: { type: String },
  order: { type: mongoose.Schema.ObjectId, required: true, ref: 'Order' }
},{
  timestamps: true
})

const File = mongoose.model("File", FileSchema)

module.exports = File
