const express = require("express")
const _ = require('lodash')
const moment = require('moment')
const Service = require('./service')
const UserService = require('../users/service')
const SalesService = require('../sales/service')

class ClientsAPIController {
  clientsIndex(req, res) {
    const service = new Service(req)

    service.fetchClients()
    .then(clients => {
      return res.json({ clients })
    })
    .catch(e => {
      console.log("\nError on at clientsIndex - GET /clients", e)
      return res.status(400).json({ error: e })
    })
  }

  clientsShow(req, res) {
    const service = new Service(req)
    const { id } = req.params

    service.fetchClientById(id)
    .then(client => {
      return res.json({ client })
    })
    .catch(e => {
      console.log(`\nError at GET /clients/${id}`, e)
      return res.status(400).json({ error: e })
    })
  }

  clientsCreate(req, res) {
    const service = new Service(req)
    const userService = new UserService(req)
    const { user, name, discount } = req.body
    if (!user) {
      return res.status(400).json({ error: `You must provide a userId` })
    }
    if (!name) {
      return res.status(400).json({ error: `You must provide a client name.` })
    }
    let c
    service.createClient({ user, name, discount })
    .then(client => {
      c = client
      return userService.findByIdAndUpdate(user, { client: c._id })
    })
    .then(() => {
      return service.fetchClientById(c._id)
    })
    .then(client => {
      return res.status(201).json({ client })
    })
    .catch(e => {
      return res.status(401).json({ error: `Error persisting client: ${e}` })
    })

  }

  clientsUpdate(req, res) {
    const service = new Service(req)
    const { id } = req.params

    let updateClient = service.findByIdAndUpdate(id, req.body)

    updateClient.then(() => {
      service.fetchClientById(id)
      .then(client => {
        return res.status(200).json({ client })
      })
    })
    .catch(e => {
      console.log(`Error at PUT /clients/${id}`, e)
      return res.status(400).json({ error: e })
    })
  }

  clientsDelete(req, res) {
    const service = new Service(req)
    const { id } = req.params

    let deleteClient = service.deleteClientById(id)

    deleteClient.then(() => res.status(200).json({ id }))
    .catch(e => {
      console.log(`Error at Delete /clients/${id}`, e)
      return res.status(400).json({ error: e })
    })
  }

  clientsBalances(req, res) {
    const service = new Service(req)
    const { id } = req.params

    service.fetchBalancesByClientId(id)
    .then(balances => {
      return res.json({ balances })
    })
    .catch(e => {
      console.log(`\nError at GET /clients/${id}`, e)
      return res.status(400).json({ error: e })
    })
  }

  clientsOrders(req, res) {
    const service = new Service(req)
    const { id } = req.params

    service.fetchOrdersByClientId(id)
    .then(orders => {
      return res.json({ orders })
    })
    .catch(e => {
      console.log(`\nError at GET /clients/${id}`, e)
      return res.status(400).json({ error: e })
    })
  }

  clientsSales(req, res) {
    const service = new Service(req)
    const salesService = new SalesService(req)
    const { id } = req.params
    const dateType = req.query.dateType ? req.query.dateType : 'month'
    const from = req.query.from ? moment(req.query.from) : moment().startOf('month')
    const to = req.query.to ? moment(req.query.to) : moment(start).add(1, 'month')

    let c
    service.fetchClientById(id)
    .then(client => {
      c = client
      return salesService.fetchAllSales(from, to, [client._id], dateType)
    })
    .then(sales => {
      return res.status(200).json({ sales, client: c, totalPriceSum: _.sumBy(sales, 'totalPrice'), totalPriceAfterDiscountSum: _.sumBy(sales, 'totalPriceAfterDiscount'), dateType, from , to })
    })
    .catch(e => {
      console.log(`\nError at GET /sales`, e)
      return res.status(400).json({ error: e })
    })
  }
}

module.exports = new ClientsAPIController
