// Disable all application logging while running tests
console.log = function() {}

const app = require("../server")
const request = require("request")
const mongoose = require("../models/mongoose")
const moment = require("moment")
const helpers = require("./helpers/objectCreators")

const {
  User
} = mongoose

describe("User", () => {
  const baseUrl = "http://localhost:8888"
  const apiUrl = baseUrl + "/api/v1"
  let server,
    user,
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

    user = new User(getUserObj('TesterFirst', 'TesterLast', 'dev1@sigorta.com', '111111'))
    user.isAdmin = true
    user
    .save()
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
  // User API endpoints
  // ----------------------------------------

  //usersIndex
  it("renders all users in the database", done => {
    request.get(
      {
        url: `${apiUrl}/users`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.users.length).toBe(1)
        done()
      }
    )
  })

  // me
  it("shows the loggedin user at /api/v1/users/me", done => {
    request.get(
      {
        url: `${apiUrl}/users/me`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.me.fname).toBe("TesterFirst")
        expect(body.me.lname).toBe("TesterLast")
        expect(body.me.email).toBe("dev1@sigorta.com")
        expect(body.me.phone).toBe("094847474774")
        done()
      }
    )
  })

  //usersShow
  it("shows a specific user at /api/v1/users/:id", done => {
    request.get(
      {
        url: `${apiUrl}/users/${user._id}`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.user.fname).toBe("TesterFirst")
        expect(body.user.lname).toBe("TesterLast")
        expect(body.user.email).toBe("dev1@sigorta.com")
        expect(body.user.phone).toBe("094847474774")
        done()
      }
    )
  })
  it("should not expose the passwordHash at /api/v1/users/:id", done => {
    request.get(
      {
        url: `${apiUrl}/users/${user._id}`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(body.user.passwordHash).toBeUndefined()
        done()
      }
    )
  })
  it("throws an error for a bad route at /api/v1/users/:id", done => {
    request.get(
      {
        url: `${apiUrl}/users/frog`,
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

  it("throws an error when creating a user that with an email that already exists at /api/v1/users", done => {
    request.post(
      {
        url: `${apiUrl}/users`,
        headers: {
          Authorization: `JWT ${token}`
        },
        form: {
          fname: "TesterTwoFirst",
          lname: "TesterTwoLast",
          email: "dev1@sigorta.com",
          password: "222224442"
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        console.log(body.error)
        expect(res.statusCode).toBe(401)
        expect(body.error).toBeDefined()
        done()
      }
    )
  })

  //usersUpdate
  it("updates a user at /api/v1/users/:id", done => {
    request.put(
      {
        url: `${apiUrl}/users/${user._id}`,
        headers: {
          Authorization: `JWT ${token}`
        },
        form: {
          fname: "TesterFirst1",
          lname: "TesterLast2",
          phone: "094984848"
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.user.fname).toBe("TesterFirst1")
        expect(body.user.lname).toBe("TesterLast2")
        expect(body.user.email).toBe("dev1@sigorta.com")
        expect(body.user.phone).toBe("094984848")
        expect(body.user.passwordHash).toBeUndefined()
        done()
      }
    )
  })

  //usersUpdatePassword
  it("updates a user at /api/v1/users/:id", done => {
    request.put(
      {
        url: `${apiUrl}/users/${user._id}`,
        headers: {
          Authorization: `JWT ${token}`
        },
        form: {
          password: "33333366",
        }
      },
      (err, res, body) => {
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.user.passwordHash).toBeUndefined()
        request.post(
          {
            url: `${apiUrl}/users/login`,
            form: {
              email: 'dev1@sigorta.com',
              password: '33333366'
            }
          },
          (err, res, body) => {
            body = JSON.parse(body)
            expect(res.statusCode).toBe(201)
            done()
          }
        )
      }
    )
  })

  it("fails to update a user when password is too short at /api/v1/users/:id", done => {
    request.put(
      {
        url: `${apiUrl}/users/${user._id}`,
        headers: {
          Authorization: `JWT ${token}`
        },
        form: {
          fname: "TesterFirst",
          lname: "TesterLast",
          password: "333333"
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

  // usersDelete
  it("delete a user at /api/v1/users/:id", done => {
    request.delete(
      {
        url: `${apiUrl}/users/${user._id}`,
        headers: {
          Authorization: `JWT ${token}`
        }
      },
      (err, res, body) => {
        console.log(body)
        body = JSON.parse(body)
        expect(res.statusCode).toBe(200)
        expect(body.id).toBe(user._id.toString())
        done()
      }
    )
  })
  


  // // ----------------------------------------
  // // Authentication Routes
  // // ----------------------------------------
  describe("Registration Route", () => {
    it("adds a new user when they register", done => {
      request.post(
        {
          url: `${apiUrl}/users`,
          headers: {
            Authorization: `JWT ${token}`
          },
          form: {
            email: "frogman1@gmail.com",
            password: "iamthefrogman",
            fname: "Mr.",
            lname: "Fantastic"
          }
        },
        (err, res, body) => {
          expect(res.statusCode).toBe(201)
          done()
        }
      )
    })

    it("doesnt register a user if their password is too short", done => {
      request.post(
        {
          url: `${apiUrl}/users`,
          headers: {
            Authorization: `JWT ${token}`
          },
          form: {
            email: "frogman2@gmail.com",
            password: "1234567",
            fname: "Mr.",
            lname: "Fantastic"
          }
        },
        (err, res, body) => {
          expect(res.statusCode).toBe(400)
          done()
        }
      )
    })

    it("doesnt register a user if their password is too long", done => {
      request.post(
        {
          url: `${apiUrl}/users`,
          headers: {
            Authorization: `JWT ${token}`
          },
          form: {
            email: "frogman2@gmail.com",
            password:
              "12345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678",
            fname: "Mr.",
            lname: "Fantastic"
          }
        },
        (err, res, body) => {
          expect(res.statusCode).toBe(400)
          done()
        }
      )
    })

    it("doesnt register a user if their email isnt supplied", done => {
      request.post(
        {
          url: `${apiUrl}/users`,
          headers: {
            Authorization: `JWT ${token}`
          },
          form: {
            password: "123456789",
            fname: "Mr.",
            lname: "Fantastic"
          }
        },
        (err, res, body) => {
          expect(res.statusCode).toBe(400)
          done()
        }
      )
    })

    it("doesnt register a user if a password isnt supplied", done => {
      request.post(
        {
          url: `${apiUrl}/users`,
          headers: {
            Authorization: `JWT ${token}`
          },
          form: {
            email: "frogman2@gmail.com",
            fname: "Mr.",
            lname: "Fantastic"
          }
        },
        (err, res, body) => {
          expect(res.statusCode).toBe(400)
          done()
        }
      )
    })

    it("doesnt register a user if a name isnt supplied", done => {
      request.post(
        {
          url: `${apiUrl}/users`,
          headers: {
            Authorization: `JWT ${token}`
          },
          form: {
            email: "frogman2@gmail.com",
            password: "12345678"
          }
        },
        (err, res, body) => {
          expect(res.statusCode).toBe(400)
          done()
        }
      )
    })

    it("doesnt register a user if a user is not admin", done => {
      request.post(
        {
          url: `${apiUrl}/users`,
          form: {
            fname: "someone",
            lname: "something",
            email: "frogman2@gmail.com",
            password: "12345678"
          }
        },
        (err, res, body) => {
          expect(res.statusCode).toBe(401)
          done()
        }
      )
    })

    it("returns a signed JWT with the user on successful registration", done => {
      request.post(
        {
          url: `${apiUrl}/users`,
          headers: {
            Authorization: `JWT ${token}`
          },
          form: {
            email: "frogman2@gmail.com",
            password: "12345678",
            fname: "Mr.",
            lname: "Fantastic"
          }
        },
        (err, res, body) => {
          body = JSON.parse(body)
          expect(body.id_token).toBeDefined()
          done()
        }
      )
    })
  })

  describe("Login Route", () => {
    it("returns a signed JWT on successful login", done => {
      request.post(
        {
          url: `${apiUrl}/users/login`,
          form: {
            email: "dev1@sigorta.com",
            password: "111111"
          }
        },
        (err, res, body) => {
          body = JSON.parse(body)
          expect(res.statusCode).toBe(201)
          expect(body.id_token).toBeDefined()
          expect(body.user.email).toBe("dev1@sigorta.com")
          expect(body.user.fname).toBe("TesterFirst")
          expect(body.user.lname).toBe("TesterLast")
          expect(body.user.phone).toBe("094847474774")
          expect(body.user.passwordHash).toBeUndefined()
          expect(body.error).toBe(undefined)
          done()
        }
      )
    })

    it("returns error when email or password not provided on login", done => {
      request.post(
        {
          url: `${apiUrl}/users/login`,
          form: {
            email: "dev1@sigorta.com"
          }
        },
        (err, res, body) => {
          body = JSON.parse(body)
          expect(res.statusCode).toBe(400)
          expect(body.error).toBe(undefined)
          done()
        }
      )
    })

    it("returns an error if user cant be found", done => {
      request.post(
        {
          url: `${apiUrl}/users/login`,
          form: {
            email: "frarg@sigorta.com",
            password: "111111"
          }
        },
        (err, res, body) => {
          body = JSON.parse(body)
          expect(res.statusCode).toBe(401)
          expect(body.id_token).toBe(undefined)
          expect(body.error).toBeDefined()
          done()
        }
      )
    })
  })

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  const { getUserObj } = helpers
})