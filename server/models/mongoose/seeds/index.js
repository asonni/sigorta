var mongoose = require('mongoose')
var models = require('./../../mongoose')

// Assign models to the global namespace
// so we can reference them easily
// in seeds/seeds.js
Object.keys(models).forEach((modelName) => {
  global[modelName] = mongoose.model(modelName)
})

require('../../../utils/mongo')()
// Clean the database
.then(() => console.log('Cleaning Database...'))
.then(() => {
  return require('./clean')()
})
.then(() => console.log('Seeding...'))
.then(() => {
  return require('./seeds')()
})
.then(() => console.log('Done'))
.catch((e) => console.error(e))
.then(() => mongoose.disconnect())
