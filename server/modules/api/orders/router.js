const express = require("express")
const controller = require("./controller")
const { isUser, isCurrentUserOrAdmin, isAdmin } = require("../../../middleware/auth")

module.exports = () => {
  const router = express.Router()

  router.route("/")
  .get(isAdmin, controller.ordersIndex)
  .post(isUser, controller.ordersCreate)

  router.route("/:id")
  .get(isUser, controller.ordersShow)
  .put(isAdmin, controller.ordersUpdate)
  .delete(isAdmin, controller.ordersDelete)


  return router
}
