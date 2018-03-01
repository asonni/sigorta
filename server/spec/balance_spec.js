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
  Balance
} = mongoose

describe("Balance", () => {
  const baseUrl = "http://localhost:8888"
  const apiUrl = baseUrl + "/api/v1"
  let server,
    user,
    user2,
    client,
    balance,
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
      client = new Client({ user: user2._id.toString(), name: 'sigortaclient', discount: 5.5, balance: 4000 })
      client.save()
    })
    .then(() => {
      balance = new Balance({ client: client._id.toString(), balance: 3000, transaction: 'add' })
      balance.save()
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
  // Balance API endpoints
  // ----------------------------------------

  // balancesIndex
  it("renders all balances in the database", done => {
    request.get(
      {
        url: `${apiUrl}/balances`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.balances.length).toBe(1)
        done()
      }
    )
  })

  // balanceShow
  it("shows balance at /api/v1/balance/:id", done => {
    request.get(
      {
        url: `${apiUrl}/balances/${balance._id}`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.balance.balance).toBe(3000)
        expect(body.balance.transaction).toBe('add')
        expect(body.balance.client.name).toBe("sigortaclient")
        done()
      }
    )
  })

  // show balances for a clinet
  it("shows balances for a client at /api/v1/clients/:id/balances", done => {
    request.get(
      {
        url: `${apiUrl}/clients/${client._id}/balances`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.balances[0].balance).toBe(3000)
        expect(body.balances[0].transaction).toBe('add')
        done()
      }
    )
  })
  
  it("throws an error for a bad route at /api/v1/balances/:id", done => {
    request.get(
      {
        url: `${apiUrl}/balances/frog`,
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

  it("post a balance at /api/v1/balances", done => {
    request.post(
      {
        url: `${apiUrl}/balances`,
        headers: {
          Authorization: `JWT ${token}`
        },
        form: {
          balance: 4000,
          client: JSON.parse(JSON.stringify(client._id))
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(201)
        expect(body.balance.client.name).toBe("sigortaclient")
        expect(body.balance.balance).toBe(4000)
        expect(body.balance.transaction).toBe('add')
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
            expect(body.client.name).toBe("sigortaclient")
            expect(body.client.user.fname).toBe("sig2")
            expect(body.client.user.lname).toBe("gorta2")
            expect(body.client.user.email).toBe("dev2@sigorta.com")
            expect(body.client.user.phone).toBe("094847474774")
            expect(body.client.discount).toBe(5.5)
            expect(body.client.balance).toBe(8000)
            done()
          }
        )
      }
    )
  })

  // balanceDelete
  it("delete a balance at /api/v1/balances/:id", done => {
    request.delete(
      {
        url: `${apiUrl}/balances/${balance._id}`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.id).toBe(balance._id.toString())
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
            expect(body.client.name).toBe("sigortaclient")
            expect(body.client.user.fname).toBe("sig2")
            expect(body.client.user.lname).toBe("gorta2")
            expect(body.client.user.email).toBe("dev2@sigorta.com")
            expect(body.client.user.phone).toBe("094847474774")
            expect(body.client.discount).toBe(5.5)
            expect(body.client.balance).toBe(1000)
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