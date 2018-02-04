const _ = require("lodash")
const jwt = require("jsonwebtoken")
const passport = require("passport")
const ExtractJwt = require("passport-jwt").ExtractJwt
const JwtStrategy = require("../utils/jwtStrategy")
const { jwtSecret } = require("../config")
const User = require("./../models/mongoose").User

class JWTAuth {
  createToken(user) {
    let id_token = jwt.sign(_.omit(user, "password"), jwtSecret, {
      expiresIn: "1h"
    })
    user = user.toObject()
    delete user.passwordHash
    return { user, id_token }
  }

  attachTo(app) {
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeader(),
          secretOrKey: jwtSecret
        },
        function(jwtPayload, done) {
          User.findById(jwtPayload._id).then(user => {
            return done(null, user)
          })
        }
      )
    )

    app.use(passport.initialize())
    app.use(passport.authenticate("jwt", { session: false }))
    return app
  }
}

module.exports = new JWTAuth()
