process.env.NODE_ENV = 'test'
const mongoose = require('mongoose')

beforeAll((done) => {
  if (mongoose.connection.readyState) {
    done()
  } else {
    require('../../utils/mongo')()
    .then(() => done())
  }
})

afterEach((done) => {
  require('../../models/mongoose/seeds/clean')()
  .then(() => done())
  .catch((e) => console.error(e.stack))
})
