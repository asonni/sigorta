const bodyParser = require('body-parser')
const cors = require('cors')
const Auth = require('../services/auth')

module.exports = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())
  Auth.attachTo(app)
}
