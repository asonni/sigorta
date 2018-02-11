const express = require("express")

module.exports = () => {
  const router = express.Router()

  router.use('/users', require('../modules/api/users/router')())
  router.use('/clients', require('../modules/api/clients/router')())
  router.use('/plans', require('../modules/api/plans/router')())
  router.use('/balances', require('../modules/api/balances/router')())



  return router
}
