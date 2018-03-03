const express = require("express")
const _ = require('lodash')
const moment = require('moment')
const Service = require('./service')
const ClientService = require('../clients/service')


class SalesAPIController {
  salesIndex(req, res) {
    const service = new Service(req)
    const clientService = new ClientService(req)
    const dateType = req.query.dateType ? req.query.dateType : 'month'
    const from = req.query.from ? moment(req.query.from) : moment().startOf('month')
    const to = req.query.to ? moment(req.query.to) : moment(start).add(1, 'month')

    let c
    clientService.fetchClients()
    .then(clients => {
      c = clients
      var clientsIds = _.map(clients, '_id')
      return service.fetchAllSales(from, to, clientsIds, dateType)
    })
    .then(sales => {
      return res.status(200).json({ sales, clients: c, totalPriceSum: _.sumBy(sales, 'totalPrice'), totalPriceAfterDiscountSum: _.sumBy(sales, 'totalPriceAfterDiscount'), dateType, from , to })
    })
    .catch(e => {
      console.log(`\nError at GET /sales`, e)
      return res.status(400).json({ error: e })
    })
  }
}

module.exports = new SalesAPIController