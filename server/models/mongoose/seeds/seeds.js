let faker = require('faker')
const _ = require('lodash')
module.exports = () => {

  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log('Creating Users')
  let users = []
  users.push( new User({
    fname: 'Ahmed',
    lname: 'Fituri',
    email: 'ahmed.fituri@gmail.com',
    password: '111111',
    components: []
  }))
  
  for (let i = 0; i < 5; i++) {
    let user = new User({
      fname: faker.name.firstName(),
      lname: faker.name.lastName(),
      email: faker.internet.email(),
      password: '222222',
      components: []
    })
    users.push(user)
  }

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  let promises = [];
  [users].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save())
    })
  })
  return Promise.all(promises)
}
