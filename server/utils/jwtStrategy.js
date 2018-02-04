const JwtStrategy = require("passport-jwt").Strategy

class JWTStrategy extends JwtStrategy {
  authenticate(req, options) {
    var self = this

    var token = self._jwtFromRequest(req)

    if (!token) {
      return self.pass()
    }

    // Verify the JWT
    JwtStrategy.JwtVerifier(token, self._secretOrKey, self._verifOpts, function(
      jwt_err,
      payload
    ) {
      if (jwt_err) {
        return self.fail(jwt_err)
      } else {
        //Pass the parsed token to the user
        var verified = function(err, user, info) {
          if (err) {
            return self.error(err)
          } else if (!user) {
            return self.fail(info)
          } else {
            return self.success(user, info)
          }
        }

        try {
          if (self._passReqToCallback) {
            self._verify(req, payload, verified)
          } else {
            self._verify(payload, verified)
          }
        } catch (ex) {
          self.error(ex)
        }
      }
    })
  }
}

module.exports = JWTStrategy
