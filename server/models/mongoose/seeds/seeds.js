let faker = require('faker')
const _ = require('lodash')
module.exports = () => {

  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log('Creating Users')
  let users = []
  users.push( new User({
    fname: 'Tom',
    lname: 'Mclaughlin',
    email: 'tom@frankapp.com',
    password: '111111',
    components: []
  }))
  users.push( new User({
    fname: 'Cody',
    lname: 'Borden',
    email: 'cody@frankapp.com',
    password: '111111',
    components: []
  }))
  users.push( new User({
    fname: 'Kareem',
    lname: 'Sabri',
    email: 'kareem.sabri@gmail.com',
    password: '111111',
    components: []
  }))
  users.push( new User({
    fname: 'Not',
    lname: 'Whitelisted',
    email: 'tim5046@gmail.com',
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
  [users, admins, components].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save())
    })
  })
  return Promise.all(promises)
}
