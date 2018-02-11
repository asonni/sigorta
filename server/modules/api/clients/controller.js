const express = require("express")
const _ = require('lodash')
const moment = require('moment')
const Service = require('./service')

class ClientsAPIController {
  clientsIndex(req, res) {
    const service = new Service(req)

    service.fetchClients()
    .then(clients => {
      res.json({ clients: clients })
    })
    .catch(e => {
      console.log("\nError on at clientsIndex - GET /clients", e)
      res.status(400).json({ error: e })
    })
  }

  clientsShow(req, res) {
    const service = new Service(req)
    const { id } = req.params

    service.fetchClientById(id)
    .then(client => {
      res.json({ client: client })
    })
    .catch(e => {
      console.log(`\nError at GET /clients/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

  clientsCreate(req, res) {
    const service = new Service(req)
    const { user, name, discount } = req.body
    if (!user) {
      res.status(400).json({ error: `You must provide a userId` })
    }
    if (!name) {
      res.status(400).json({ error: `You must provide a client name.` })
    }

    service.createClient({ user, name, discount })
    .then(client => {
      service.fetchClientById(client._id)
      .then(client => {
        res.status(201).json({ client })
      })
    })
    .catch(e => {
      res.status(401).json({ error: `Error persisting client: ${e}` })
    })

  }

  clientsUpdate(req, res) {
    const service = new Service(req)
    const { id } = req.params

    let updateClient = service.findByIdAndUpdate(id, req.body)

    updateClient.then(() => {
      service.fetchClientById(id)
      .then(client => {
        res.status(200).json({ client })
      })
    })
    .catch(e => {
      console.log(`Error at PUT /clients/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

  clientsDelete(req, res) {
    const service = new Service(req)
    const { id } = req.params

    let deleteClient = service.deleteClientById(id)

    deleteClient.then(() => res.status(200).json({ id }))
    .catch(e => {
      console.log(`Error at Delete /clients/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

}

module.exports = new ClientsAPIController
