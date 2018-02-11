const express = require("express")
const controller = require("./controller")
const { isUser, isCurrentUserOrAdmin, isAdmin } = require("../../../middleware/auth")

module.exports = () => {
  const router = express.Router()

  router.route("/")
  .get(isUser, controller.plansIndex)
  .post(isAdmin, controller.plansCreate)

  router.route("/:id")
  .get(isUser, controller.plansShow)
  .put(isAdmin, controller.plansUpdate)
  .delete(isAdmin, controller.plansDelete)


  return router
}
