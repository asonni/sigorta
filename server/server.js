const express = require("express")
const app = express()

require("dotenv").config()

// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT || process.argv[2]
const host = process.env.HOST

let args
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host])

args.push(() => {
  console.log(`Listening: http://${host}:${port}\n`)
})

// If we're running this file directly, start up the server
if (require.main === module) {
  app.listen.apply(app, args)
}

// ----------------------------------------
// Logging
// ----------------------------------------
const morgan = require("morgan")
const highlight = require("cli-highlight").highlight

const format = [
  ":separator",
  ":newline",
  ":method ",
  ":url ",
  ":status ",
  ":res[content-length] ",
  "- :response-time ms",
  ":newline",
  ":newline",
  ":data",
  ":newline",
  ":separator",
  ":newline",
  ":newline"
].join("")

if (process.env.NODE_ENV !== "test") {
  app.use(morgan(format))
}

morgan.token("separator", () => "****")
morgan.token("newline", () => "\n")

// Set data token to output
// req query params and body
morgan.token("data", (req, res, next) => {
  let data = []

  if (/\.[\w]+$/.test(req.url)) {
    return ""
  }

  ["query", "params", "body", "session", "user"].forEach(key => {
    if (req[key]) {
      let capKey = key[0].toUpperCase() + key.substr(1)
      let value = JSON.stringify(req[key], null, 2)
      data.push(`${capKey}: ${value}`)
    }
  })
  data = highlight(data.join("\n"), {
    language: "json",
    ignoreIllegals: true
  })
  return `${data}`
})

// ---------------------------------------
// Mongoose init
// ---------------------------------------
const mongoose = require("mongoose")
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next()
  } else {
    require("./utils/mongo")(req).then(() => next())
  }
})

require("./config/init")(app)
module.exports = app
