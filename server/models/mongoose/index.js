var mongoose = require("mongoose")
var bluebird = require("bluebird")

mongoose.Promise = bluebird

module.exports = {
  User: require("./user"),
  Client: require("./client")
}
