const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const md5 = require("md5")
const uuid = require("uuid/v4")
const uniqueValidator = require("mongoose-unique-validator")
const moment = require("moment")

const UserSchema = mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: false },
    token: { type: String, unique: true },
    isAdmin: { type: Boolean, default: false },
    passwordHash: { type: String, required: false }
  },
  {
    timestamps: true
  }
)

UserSchema.plugin(uniqueValidator)

UserSchema.virtual("password").get(function() {
  return this.passwordHash
})

UserSchema.virtual("password").set(function(value) {
  this._password = value
  this.passwordHash = bcrypt.hashSync(value, 8)
})

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

// Create the token before save
UserSchema.pre("save", function(next) {
  this.token = md5(`${this.email}${uuid()}`)
  next()
})

const User = mongoose.model("User", UserSchema)

module.exports = User
