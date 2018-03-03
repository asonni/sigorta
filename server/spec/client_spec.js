// Disable all application logging while running tests
//console.log = function() {}

const app = require("../server")
const request = require("request")
const mongoose = require("../models/mongoose")
const moment = require("moment")
const helpers = require("./helpers/objectCreators")

const {
  User,
  Client
} = mongoose

describe("Client", () => {
  const baseUrl = "http://localhost:8888"
  const apiUrl = baseUrl + "/api/v1"
  let server,
    user,
    user2,
    client,
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
      client = new Client({ user: user2._id.toString(), name: 'sigortaclient', discount: 5.5 })
      client.save()
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
  // Client API endpoints
  // ----------------------------------------

  // clientsIndex
  it("renders all clients in the database", done => {
    request.get(
      {
        url: `${apiUrl}/clients`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.clients.length).toBe(1)
        done()
      }
    )
  })

  // clientShow
  it("shows a specific client at /api/v1/client/:id", done => {
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
        done()
      }
    )
  })
  
  it("throws an error for a bad route at /api/v1/clients/:id", done => {
    request.get(
      {
        url: `${apiUrl}/clients/frog`,
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

  it("post a client at /api/v1/clients", done => {
    request.post(
      {
        url: `${apiUrl}/clients`,
        headers: {
          Authorization: `JWT ${token}`
        },
        form: {
          name: "sigorta3",
          discount: 50,
          user: JSON.parse(JSON.stringify(user2._id))
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(body.client.name).toBe("sigorta3")
        expect(body.client.user.fname).toBe("sig2")
        expect(body.client.user.lname).toBe("gorta2")
        expect(body.client.user.email).toBe("dev2@sigorta.com")
        expect(body.client.user.phone).toBe("094847474774")
        expect(body.client.discount).toBe(50)
        done()
      }
    )
  })

  // clientUpdate
  it("updates a client at /api/v1/clients/:id", done => {
    request.put(
      {
        url: `${apiUrl}/clients/${client._id.toString()}`,
        headers: {
          Authorization: `JWT ${token}`
        },
        form: {
          name: "sigorta2",
          discount: 6.6,
          limit: false,
          user: JSON.parse(JSON.stringify(user._id))
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.client.name).toBe("sigorta2")
        expect(body.client.user.fname).toBe("sig")
        expect(body.client.user.lname).toBe("gorta")
        expect(body.client.user.email).toBe("dev1@sigorta.com")
        expect(body.client.user.phone).toBe("094847474774")
        expect(body.client.discount).toBe(6.6)
        expect(body.client.limit).toBe(false)
        done()
      }
    )
  })

  // clientDelete
  it("delete a client at /api/v1/clients/:id", done => {
    request.delete(
      {
        url: `${apiUrl}/clients/${client._id}`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.id).toBe(client._id.toString())
        done()
      }
    )
  })

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  const { getUserObj } = helpers
})