//todo: use composable-middleware to compose isAdmin and isUser
const isUser = (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401).end()
  } else {
    next()
  }
}

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.sendStatus(401).end()
  } else {
    next()
  }
}
const isCurrentUserOrAdmin = (req, res, next) => {
  if (req.user) {
    const { _id, isAdmin } = req.user
    const { id } = req.params
    if (!isAdmin && (_id.toString() !== id.toString())) {
      res.sendStatus(401).end()
    } else {
      next()
    }
  } else {
    res.sendStatus(401).end()
  }
}

module.exports = {
  isUser,
  isAdmin,
  isCurrentUserOrAdmin
}
