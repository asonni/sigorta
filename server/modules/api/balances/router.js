const express = require("express")
const controller = require("./controller")
const { isUser, isCurrentUserOrAdmin, isAdmin } = require("../../../middleware/auth")

module.exports = () => {
  const router = express.Router()

  router.route("/")
  .get(isAdmin, controller.balancesIndex)
  .post(isAdmin, controller.balancesCreate)

  router.route("/:id")
  .get(isUser, controller.balancesShow)
  .put(isAdmin, controller.balancesUpdate)
  .delete(isAdmin, controller.balancesDelete)


  return router
}
