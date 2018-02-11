const express = require("express")
const _ = require('lodash')
const moment = require('moment')
const Service = require('./service')

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

    service.fetchBalanceByClientId(id)
    .then(balances => {
      res.json({ balances })
    })
    .catch(e => {
      console.log(`\nError at GET /balances/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

  balancesCreate(req, res) {
    const service = new Service(req)
    const { client, transaction, balance } = req.body

    if (!client) {
      res.status(400).json({ error: `You must provide a clientId.` })
    }

    if (!balance) {
      res.status(400).json({ error: `You must provide a transaction type.` })
    }

    service.createBalance({ client, balance, transaction: 'add' })
    .then(balance => {
      service.fetchBalanceById(balance._id)
      .then(balance => {
        res.status(201).json({ balance })
      })
    })
    .catch(e => {
      res.status(401).json({ error: `Error persisting balance: ${e}` })
    })

  }

  balancesUpdate(req, res) {
    const service = new Service(req)
    const { id } = req.params

    let updateBalance = service.findByIdAndUpdate(id, req.body)

    updateBalance.then(() => {
      service.fetchBalanceByClientId(id)
      .then(balance => {
        service.fetchBalanceById(id)
        .then(balance => {
          res.status(200).json({ balance })
        })
      })
    })
    .catch(e => {
      console.log(`Error at PUT /balances/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

  balancesDelete(req, res) {
    const service = new Service(req)
    const { id } = req.params

    let deleteBalance = service.deleteBalanceById(id)

    deleteBalance.then(() => res.status(200).json({ id }))
    .catch(e => {
      console.log(`Error at Delete /balances/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

}

module.exports = new BalancesAPIController
