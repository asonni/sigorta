// Disable all application logging while running tests
//console.log = function() {}

const app = require("../server")
const request = require("request")
const mongoose = require("../models/mongoose")
const moment = require("moment")
const helpers = require("./helpers/objectCreators")

const {
  User,
  Plan
} = mongoose

describe("Plan", () => {
  const baseUrl = "http://localhost:8888"
  const apiUrl = baseUrl + "/api/v1"
  let server,
    user,
    user2,
    plan,
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
      plan = new Plan({ name: 'sigortaplan', price: 100 })
      plan.save()
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
  // Plan API endpoints
  // ----------------------------------------

  // plansIndex
  it("renders all plans in the database", done => {
    request.get(
      {
        url: `${apiUrl}/plans`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.plans.length).toBe(1)
        done()
      }
    )
  })

  // usersShow
  it("shows a specific plan at /api/v1/plan/:id", done => {
    request.get(
      {
        url: `${apiUrl}/plans/${plan._id}`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.plan.name).toBe("sigortaplan")
        expect(body.plan.price).toBe(100)
        done()
      }
    )
  })
  
  it("throws an error for a bad route at /api/v1/plans/:id", done => {
    request.get(
      {
        url: `${apiUrl}/plans/frog`,
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

  // planUpdate
  it("updates a plan at /api/v1/plans/:id", done => {
    request.put(
      {
        url: `${apiUrl}/plans/${plan._id.toString()}`,
        headers: {
          Authorization: `JWT ${token}`
        },
        form: {
          name: "plan2",
          price: 6.6
        }
      },
      (err, res, body) => {
        console.log(body)
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.data).toBe("OK")
        request.get(
          {
            url: `${apiUrl}/plans/${plan._id.toString()}`,
            headers: {
              Authorization: `JWT ${token}`
            }
          },
          (err1, res1, body1) => {
            body1 = JSON.parse(body1)
            expect(body1.plan.name).toBe("plan2")
            expect(body1.plan.price).toBe(6.6)
            done()
          }
        )
      }
    )
  })

  // planDelete
  it("delete a plan at /api/v1/plans/:id", done => {
    request.delete(
      {
        url: `${apiUrl}/plans/${plan._id}`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        console.log(body)
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.data).toBe("OK")
        done()
      }
    )
  })

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  const { getUserObj } = helpers
})