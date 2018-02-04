//attach models to request instance
module.exports = (app) => {
  return (req, res, next) => {
    req.models = app.locals.models
    next()
  }
}
