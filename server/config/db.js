module.exports = (app) => {
  app.locals.models = require('../models/mongoose')
}
