var mongoose = require('mongoose')
var env = process.env.NODE_ENV || 'development'
var config = require('../config/mongoose.json')[env]

module.exports = () => {
  // Set the production MongoDB URL if
  // we're using the production config
  var envUrl = process.env[config.use_env_variable]

  // Define a local URL variable if we're
  // not in production
  var localUrl = `mongodb://${ config.host }/${ config.database }`

  // Set the connection URL
  var mongoUrl =  envUrl ? envUrl : localUrl

  return mongoose.connect(mongoUrl, { useMongoClient: true })
}
