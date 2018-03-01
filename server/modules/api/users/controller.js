const express = require("express")
const _ = require('lodash')
const moment = require('moment')
const Service = require('./service')

const Auth = require("../../../services/auth")

class UsersAPIController {
  me(req, res) {
    return res.json({ me: req.user })
  }

  usersIndex(req, res) {
    const service = new Service(req)

    service.fetchUsers()
    .then(users => {
      return res.json({ users: users })
    })
    .catch(e => {
      console.log("\nError on at usersIndex - GET /users", e)
      return res.status(400).json({ error: e })
    })
  }

  usersShow(req, res) {
    const service = new Service(req)
    const { id } = req.params

    service.fetchUserById(id)
    .then(user => {
      user = user.toObject()
      delete user.passwordHash
      return res.json({ user })
    })
    .catch(e => {
      console.log(`\nError at GET /users/${id}`, e)
      return res.status(400).json({ error: e })
    })
  }

  usersCreate(req, res) {
    const service = new Service(req)
    const { fname, lname, email, password, phone } = req.body
    if (!email) {
      return res.status(400).json({ error: `You must provide an email.` })
    }
    if (!fname || !lname) {
      return res.status(400).json({ error: `You must provide your full name.` })
    }

    if (service.validatePassword(password).error) {
      return res.status(400).json({ error: service.validatePassword(password).error })
    }

    service.createUser({ fname, lname, email, password, phone })
    .then(user => {
      return res.status(201).send(Auth.createToken(user))
    })
    .catch(e => {
      return res.status(401).json({ error: `Error persisting user: ${e}` })
    })

  }

  usersUpdate(req, res) {
    const service = new Service(req)
    const { id } = req.params
    
    if (req.body.password) {
      if (service.validatePassword(req.body.password).error) {
        return res.status(400).json({ error: service.validatePassword(req.body.password).error })
      }
    }

    let updateUser = service.findByIdAndUpdate(id, req.body)

    updateUser.then(user => {
      user = user.toObject()
      delete user.passwordHash
      return res.status(200).json({ user })
    })
    .catch(e => {
      console.log(`Error at PUT /users/${id}`, e)
      return res.status(400).json({ error: e })
    })
  }

  usersDelete(req, res) {
    const service = new Service(req)
    const { id } = req.params

    let deleteUser = service.deleteUserById(id)

    deleteUser.then(() => res.status(200).json({ id }))
    .catch(e => {
      console.log(`Error at Delete /users/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

  loginUser(req, res) {
    const { User } = req.models
    const { email, password } = req.body
    const service = new Service(req)

    if (!email || !password) {
      return res.status(400).json("You must send the email and the password.")
    }
    service.logIn(email, password)
    .then(result => {
      if (result.error) {
        return res.status(result.status).json({ error: result.error })
      } else {
        return res.status(201).send(Auth.createToken(result))
      }
    })
  }
}

module.exports = new UsersAPIController
