module.exports = (app) => {
  require('./db')(app)
  require('./express')(app)
  require('./routes')(app)
}