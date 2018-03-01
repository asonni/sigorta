const express = require("express")
const _ = require('lodash')
const moment = require('moment')
const Service = require('./service')
const ClientService = require('../clients/service')

class BalancesAPIController {
  balancesIndex(req, res) {
    const service = new Service(req)

    service.fetchBalances()
    .then(balances => {
      res.json({ balances: balances })
    })
    .catch(e => {
      console.log("\nError on at balancesIndex - GET /balances", e)
      res.status(400).json({ error: e })
    })
  }

  balancesShow(req, res) {
    const service = new Service(req)
    const { id } = req.params

    service.fetchBalanceById(id)
    .then(balance => {
      res.json({ balance })
    })
    .catch(e => {
      console.log(`\nError at GET /balances/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

  balancesCreate(req, res) {
    const service = new Service(req)
    const clientService = new ClientService(req)
    const { client, transaction, balance } = req.body

    if (!client) {
      res.status(400).json({ error: `You must provide a clientId.` })
    }

    if (!balance) {
      res.status(400).json({ error: `You must provide a transaction type.` })
    }

    let b
    service.createBalance({ client, balance, transaction: 'add' })
    .then(balance => {
      b = balance
      return clientService.findByIdAndUpdateBalance(client, balance.balance, 'add')
    })
    .then(() => {
      return service.fetchBalanceById(b._id)
    })
    .then(balance => {
      return res.status(201).json({ balance })
    })
    .catch(e => {
      res.status(401).json({ error: `Error persisting balance: ${e}` })
    })
  }

  balancesDelete(req, res) {
    const service = new Service(req)
    const clientService = new ClientService(req)
    const { id } = req.params

    let deleteBalance = service.deleteBalanceById(id)
    let b

    service.fetchBalanceById(id)
    .then(balance => {
      b = balance
      return service.deleteBalanceById(id)
    })
    .then(() => {
      return clientService.findByIdAndUpdateBalance(b.client, b.balance, 'substract')
    })
    .then(() => {
      return res.status(200).json({ id })
    })
    .catch(e => {
      console.log(`Error at Delete /balances/${id}`, e)
      res.status(400).json({ error: e })
    })
    
  }

}

module.exports = new BalancesAPIController
