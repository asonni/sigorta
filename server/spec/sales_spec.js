// Disable all application logging while running tests
//console.log = function() {}

const app = require("../server")
const request = require("request")
const mongoose = require("../models/mongoose")
const moment = require("moment")
const helpers = require("./helpers/objectCreators")

const {
  User,
  Client,
  Balance,
  Plan,
  Order
} = mongoose

describe("Order", () => {
  const baseUrl = "http://localhost:8888"
  const apiUrl = baseUrl + "/api/v1"
  let server,
    user,
    user2,
    user3,
    client,
    client2,
    client3,
    plan,
    plan2,
    order,
    order2,
    order3,
    order4,
    order5,
    order6,
    body,
    token

  beforeAll(done => {
    server = app.listen(8888, () => {
      done()
    })
  })

  afterAll(done => {
    server.close()
    server = null
    done()
  })

  beforeEach(done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
    user = new User(getUserObj('sig', 'gorta', 'dev1@sigorta.com', '111111'))
    user.isAdmin = true
    user
    .save()
    .then(() => {
      user2 = new User(getUserObj('sig2', 'gorta2', 'dev2@sigorta.com', '111111'))
      user2.save()
    })
    .then(() => {
      user3 = new User(getUserObj('sig3', 'gorta3', 'dev3@sigorta.com', '111111'))
      user3.save()
    })
    .then(() => {
      client = new Client({ user: user._id.toString(), name: 'sigortaclient', discount: 5.5, balance: 3000 })
      client.save()
    })
    .then(() => {
      user.client = client._id
      user.save()
    })
    .then(() => {
      client2 = new Client({ user: user2._id.toString(), name: 'sigortaclient2', discount: 23, balance: 4000 })
      client2.save()
    })
    .then(() => {
      user2.client = client2._id
      user2.save()
    })
    .then(() => {
      client3 = new Client({ user: user3._id.toString(), name: 'sigortaclient3', discount: 40, balance: 2000 })
      client3.save()
    })
    .then(() => {
      user3.client = client3._id
      user3.save()
    })
    .then(() => {
      plan = new Plan({ name: 'sigortaplan', price: 100 })
      plan.save()
    })
    .then(() => {
      plan2 = new Plan({ name: 'sigortaplan2', price: 200 })
      plan2.save()
    })
    .then(() => {
      plan3 = new Plan({ name: 'sigortaplan3', price: 50 })
      plan3.save()
    })
    .then(() => {
      order = new Order({ 
        client: client._id,
        plan: plan._id,
        name: 'first last',
        dob: '1985-02-24',
        gender: 'female',
        nationality: 'Libyan',
        passport: 'xtyz',
        phone: '122112222',
        fatherName: 'father name', 
        motherName: 'mother name',
        fatherPassport: 'xxx',
        motherPassport: 'yyy',
        address: 'address',
        numberOfYears: 1,
        discount: client.discount,
        price: plan.price,
        totalPrice: plan.price,
        totalPriceAfterDiscount: (plan.price) - (plan.price * client.discount /100)
      })
      order.createdAt = moment().subtract(1, 'days').toJSON(),
      order.save()
    })
    .then(() => {
      order2 = new Order({ 
        client: client._id,
        plan: plan._id,
        name: 'first last',
        dob: '1985-02-24',
        gender: 'female',
        nationality: 'Libyan',
        passport: 'xtyz',
        phone: '122112222',
        fatherName: 'father name', 
        motherName: 'mother name',
        fatherPassport: 'xxx',
        motherPassport: 'yyy',
        address: 'address',
        numberOfYears: 2,
        discount: client.discount,
        price: plan.price,
        totalPrice: plan.price * 2,
        totalPriceAfterDiscount: (plan.price * 2) - ((plan.price * 2) * client.discount /100)
      })
      order2.createdAt = moment().subtract(2, 'days').toJSON(),
      order2.save()
    })
    .then(() => {
      order3 = new Order({ 
        client: client2._id,
        plan: plan2._id,
        name: 'first last',
        dob: '1985-02-24',
        gender: 'female',
        nationality: 'Libyan',
        passport: 'xtyz',
        phone: '122112222',
        fatherName: 'father name', 
        motherName: 'mother name',
        fatherPassport: 'xxx',
        motherPassport: 'yyy',
        address: 'address',
        numberOfYears: 1,
        discount: client2.discount,
        price: plan2.price,
        totalPrice: plan2.price,
        totalPriceAfterDiscount: (plan2.price) - (plan2.price * client2.discount /100)
      })
      order3.createdAt = moment().add(2, 'days').toJSON(),
      order3.save()
    })
    .then(() => {
      order4 = new Order({ 
        client: client3._id,
        plan: plan2._id,
        name: 'first last',
        dob: '1985-02-24',
        gender: 'female',
        nationality: 'Libyan',
        passport: 'xtyz',
        phone: '122112222',
        fatherName: 'father name', 
        motherName: 'mother name',
        fatherPassport: 'xxx',
        motherPassport: 'yyy',
        address: 'address',
        numberOfYears: 1,
        discount: client3.discount,
        price: plan2.price,
        totalPrice: plan2.price,
        totalPriceAfterDiscount: (plan2.price) - (plan2.price * client3.discount /100)
      })
      order4.createdAt = moment().add(2, 'days').toJSON(),
      order4.save()
    })
    .then(() => {
      order5 = new Order({ 
        client: client2._id,
        plan: plan3._id,
        name: 'first last',
        dob: '1985-02-24',
        gender: 'female',
        nationality: 'Libyan',
        passport: 'xtyz',
        phone: '122112222',
        fatherName: 'father name', 
        motherName: 'mother name',
        fatherPassport: 'xxx',
        motherPassport: 'yyy',
        address: 'address',
        numberOfYears: 2,
        discount: client2.discount,
        price: plan3.price,
        totalPrice: plan3.price * 2,
        totalPriceAfterDiscount: (plan3.price * 2) - ((plan3.price * 2) * client2.discount /100)
      })
      order5.save()
    })
    .then(() => {
      order6 = new Order({ 
        client: client2._id,
        plan: plan3._id,
        name: 'first last',
        dob: '1985-02-24',
        gender: 'female',
        nationality: 'Libyan',
        passport: 'xtyz',
        phone: '122112222',
        fatherName: 'father name', 
        motherName: 'mother name',
        fatherPassport: 'xxx',
        motherPassport: 'yyy',
        address: 'address',
        numberOfYears: 2,
        discount: client2.discount,
        price: plan3.price,
        totalPrice: plan3.price * 2,
        totalPriceAfterDiscount: (plan3.price * 2) - ((plan3.price * 2) * client2.discount /100)
      })
      order6.createdAt = moment().add(2, 'months').toJSON(),
      order6.save()
    })
    .then(() => {
      request.post(
        {
          url: `${apiUrl}/users/login`,
          form: {
            email: user.email,
            password: '111111'
          }
        },
        (err, res, body) => {
          body = JSON.parse(body)
          token = body.id_token
          done()
        }
      )
    })
  })

  // ----------------------------------------
  // Sales API endpoints
  // ----------------------------------------

  //salesIndex
  it("renders all monthly sales in the database", done => {
    request.get(
      {
        url: `${apiUrl}/sales`,
        qs: {
          from: moment().subtract(3, 'days').toJSON(),
          to: moment().add(3, 'days').toJSON(),
          dateType: 'month'
        },
        headers: {
          Authorization: `JWT ${token}`
        },
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.sales.length).toBe(5)
        expect(body.totalPriceSum).toBe(800)
        expect(body.totalPriceAfterDiscountSum).toBe(634.5)
        done()
      }
    )
  })
  it("renders all daily sales in the database", done => {
    request.get(
      {
        url: `${apiUrl}/sales`,
        qs: {
          from: moment().subtract(3, 'days').toJSON(),
          to: moment().add(3, 'days').toJSON(),
          dateType: 'day'
        },
        headers: {
          Authorization: `JWT ${token}`
        },
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.sales.length).toBe(5)
        expect(body.totalPriceSum).toBe(800)
        expect(body.totalPriceAfterDiscountSum).toBe(634.5)
        expect(body.dateType).toBe('day')
        done()
      }
    )
  })

  it("renders all yearly sales in the database", done => {
    request.get(
      {
        url: `${apiUrl}/sales`,
        qs: {
          from: moment().subtract(3, 'months').toJSON(),
          to: moment().add(4, 'months').toJSON(),
          dateType: 'year'
        },
        headers: {
          Authorization: `JWT ${token}`
        },
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.sales.length).toBe(4)
        expect(body.totalPriceSum).toBe(900)
        expect(body.totalPriceAfterDiscountSum).toBe(711.5)
        expect(body.dateType).toBe('year')
        done()
      }
    )
  })

  //clientsSales
  it("renders all sales for a client in the database", done => {
    request.get(
      {
        url: `${apiUrl}/clients/${client._id}/sales`,
        qs: {
          from: moment().subtract(3, 'days').toJSON(),
          to: moment().add(3, 'days').toJSON(),
          dateType: 'month'
        },
        headers: {
          Authorization: `JWT ${token}`
        },
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.sales.length).toBe(2)
        expect(body.totalPriceSum).toBe(300)
        expect(body.totalPriceAfterDiscountSum).toBe(283.5)
        done()
      }
    )
  })

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  const { getUserObj } = helpers
})