const express = require("express")
const controller = require("./controller")
const { isUser, isCurrentUserOrAdmin, isAdmin } = require("../../../middleware/auth")

module.exports = () => {
  const router = express.Router()

  router.route("/")
  .get(isAdmin, controller.clientsIndex)
  .post(isAdmin, controller.clientsCreate)

  router.route("/:id")
  .get(isUser, controller.clientsShow)
  .put(isAdmin, controller.clientsUpdate)
  .delete(isAdmin, controller.clientsDelete)

  router.route("/:id/balances")
  .get(isUser, controller.clientsBalances)

  router.route("/:id/orders")
  .get(isUser, controller.clientsOrders)

  return router
}
