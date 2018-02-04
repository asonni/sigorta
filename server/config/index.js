
const port = process.env.PORT || process.argv[2]
const host = process.env.HOST
const jwtSecret = process.env.JWT_SECRET || "abc123"


module.exports = {
  host,
  jwtSecret,
  port
}
