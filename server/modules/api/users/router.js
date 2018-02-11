const express = require("express")
const controller = require("./controller")
const { isUser, isCurrentUserOrAdmin, isAdmin } = require("../../../middleware/auth")

module.exports = () => {
  const router = express.Router()

  router.route("/")
  .get(isAdmin, controller.usersIndex)
  .post(isAdmin, controller.usersCreate)

  router.route("/me")
  .get(isUser, controller.me)

  router.route("/login")
  .post(controller.loginUser)

  router.route("/:id")
  .get(isCurrentUserOrAdmin, controller.usersShow)
  .put(isCurrentUserOrAdmin, controller.usersUpdate)
  .delete(isAdmin, controller.usersDelete)


  return router
}
