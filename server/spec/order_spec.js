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
    client,
    balance,
    plan,
    order,
    body,
    token,
    token2

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
      client = new Client({ user: user2._id.toString(), name: 'sigortaclient', discount: 5.5, balance: 3000 })
      client.save()
    })
    .then(() => {
      balance = new Balance({ client: client._id.toString(), balance: 3000, transaction: 'add' })
      balance.save()
    })
    .then(() => {
      plan = new Plan({ name: 'sigortaplan', price: 100 })
      plan.save()
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
      order.save()
    })
    .then(() => {
      request.post(
        {
          url: `${apiUrl}/users/login`,
          form: {
            email: user2.email,
            password: '111111'
          }
        },
        (err, res, body) => {
          body = JSON.parse(body)
          token2 = body.id_token
        }
      )
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
  // Order API endpoints
  // ----------------------------------------

  //ordersIndex
  it("renders all orders in the database", done => {
    request.get(
      {
        url: `${apiUrl}/orders`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.orders.length).toBe(1)
        done()
      }
    )
  })

  // orderShow
  it("shows order at /api/v1/order/:id", done => {
    request.get(
      {
        url: `${apiUrl}/orders/${order._id}`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.order.name).toBe('first last')
        expect(body.order.client._id).toBe(client._id.toString())
        expect(body.order.client.name).toBe("sigortaclient")
        expect(body.order.dob).toBe('1985-02-24T00:00:00.000Z')
        expect(body.order.gender).toBe('female')
        expect(body.order.nationality).toBe('Libyan')
        expect(body.order.passport).toBe('xtyz')
        expect(body.order.phone).toBe('122112222')
        expect(body.order.fatherName).toBe('father name')
        expect(body.order.motherName).toBe('mother name')
        expect(body.order.fatherPassport).toBe('xxx')
        expect(body.order.motherPassport).toBe('yyy')
        expect(body.order.address).toBe('address')
        expect(body.order.numberOfYears).toBe(1)
        expect(body.order.discount).toBe(client.discount)
        expect(body.order.price).toBe(plan.price)
        expect(body.order.totalPrice).toBe(plan.price)
        expect(body.order.totalPriceAfterDiscount).toBe((plan.price) - (plan.price * client.discount /100))
        done()
      }
    )
  })

  // show orders for a clinet
  it("shows orders for a client at /api/v1/clients/:id/orders", done => {
    request.get(
      {
        url: `${apiUrl}/clients/${client._id}/orders`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.orders[0].name).toBe('first last')
        expect(body.orders[0].numberOfYears).toBe(1)
        done()
      }
    )
  })
  
  it("throws an error for a bad route at /api/v1/orders/:id", done => {
    request.get(
      {
        url: `${apiUrl}/orders/frog`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(400)
        expect(body.error).toBeDefined()
        done()
      }
    )
  })

  it("post an order at /api/v1/orders", done => {
    request.post(
      {
        url: `${apiUrl}/orders`,
        headers: {
          Authorization: `JWT ${token}`
        },
        form: {
          name: 'customer',
          client: JSON.parse(JSON.stringify(client._id)),
          plan: JSON.parse(JSON.stringify(plan._id)),
          dob: '1985-02-24',
          gender: 'male',
          nationality: 'Libyan',
          passport: '243423423',
          phone: '1123333',
          fatherName: 'FATHER',
          motherName: 'Mother',
          fatherPassport: 'xxxxx',
          motherPassport: 'yyyyy',
          address: 'sfasfv sdfas dasdf',
          numberOfYears: 2
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(201)
        expect(body.order.name).toBe('customer')
        expect(body.order.client._id).toBe(client._id.toString())
        expect(body.order.client.balance).toBe(2811)
        expect(body.order.plan._id).toBe(plan._id.toString())
        expect(body.order.dob).toBe('1985-02-24T00:00:00.000Z')
        expect(body.order.gender).toBe('male')
        expect(body.order.nationality).toBe('Libyan')
        expect(body.order.passport).toBe('243423423')
        expect(body.order.phone).toBe('1123333')
        expect(body.order.fatherName).toBe('FATHER')
        expect(body.order.motherName).toBe('Mother')
        expect(body.order.fatherPassport).toBe('xxxxx')
        expect(body.order.motherPassport).toBe('yyyyy')
        expect(body.order.address).toBe('sfasfv sdfas dasdf')
        expect(body.order.numberOfYears).toBe(2)
        done()
      }
    )
  })

  // orderUpdate
  it("updates an order at /api/v1/orders/:id", done => {
    request.put(
      {
        url: `${apiUrl}/orders/${order._id.toString()}`,
        headers: {
          Authorization: `JWT ${token}`
        },
        form: {
          name: 'Salma Ahmed',
          gender: 'female',
          passport: '1111111jidk',
          nationality: 'Egyptian',
          phone: '111112222',
          dob: '1986-04-16',
          fatherName: 'Father Name',
          motherName: 'motherName',
          fatherPassport: 'oooo',
          motherPassport: 'iiiiii',
          address: 'second address',
          status: 'approved'
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.order.name).toBe('Salma Ahmed')
        expect(body.order.passport).toBe('1111111jidk')
        expect(body.order.gender).toBe('female')
        expect(body.order.nationality).toBe('Egyptian')
        expect(body.order.phone).toBe('111112222')
        expect(body.order.dob).toBe('1986-04-16T00:00:00.000Z')
        expect(body.order.fatherName).toBe('Father Name')
        expect(body.order.motherName).toBe('motherName')
        expect(body.order.fatherPassport).toBe('oooo')
        expect(body.order.motherPassport).toBe('iiiiii')
        expect(body.order.address).toBe('second address')
        expect(body.order.status).toBe('approved')
        done()
      }
    )
  })

  // orderDelete
  it("delete an order at /api/v1/orders/:id", done => {
    request.delete(
      {
        url: `${apiUrl}/orders/${order._id}`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.id).toBe(order._id.toString())
        request.get(
          {
            url: `${apiUrl}/clients/${client._id}`,
            headers: {
              Authorization: `JWT ${token}`
            }
          },
          (err, res, body) => {
            body = JSON.parse(body)
            expect(res.statusCode).toBe(200)
            expect(body.client.balance).toBe(3094.5)
            done()
          }
        )
      }
    )
  })

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  const { getUserObj } = helpers
})