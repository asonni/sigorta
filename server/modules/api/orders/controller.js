const express = require("express")
const _ = require('lodash')
const moment = require('moment')
const Service = require('./service')
const ClientService = require('../clients/service')
const BalanceService = require('../balances/service')


class OrdersAPIController {
  ordersIndex(req, res) {
    const service = new Service(req)

    service.fetchOrders()
    .then(orders => {
      return res.json({ orders })
    })
    .catch(e => {
      console.log("\nError on at ordersIndex - GET /orders", e)
      return res.status(400).json({ error: e })
    })
  }

  ordersShow(req, res) {
    const service = new Service(req)
    const { id } = req.params

    service.fetchOrderById(id)
    .then(order => {
      return res.json({ order: order })
    })
    .catch(e => {
      console.log(`\nError at GET /orders/${id}`, e)
      return res.status(400).json({ error: e })
    })
  }

  ordersCreate(req, res) {
    const service = new Service(req)
    const balanceService = new BalanceService(req)
    const clientService = new ClientService(req)
    
    let { client, plan, name, dob, gender, nationality, passport, phone, fatherName, motherName, fatherPassport, motherPassport, address, numberOfYears } = req.body

    if (!client) {
      client = req.user.client
    }

    if (!plan) {
      return res.status(400).json({ error: `You must provide a plan` })
    }

    if (!name) {
      return res.status(400).json({ error: `You must provide a name` })
    }

    if (!dob) {
      return res.status(400).json({ error: `You must provide a dob` })
    }

    if (!gender) {
      return res.status(400).json({ error: `You must provide a gender` })
    }

    if (!nationality) {
      return res.status(400).json({ error: `You must provide a nationality` })
    }

    if (!passport) {
      return res.status(400).json({ error: `You must provide a passport` })
    }

    if (!numberOfYears) {
      return res.status(400).json({ error: `You must provide a numberOfYears` })
    }

    let c, p, o, b
    return service.getClient(client)
    .then(cli =>{
      c = cli
      return service.getPlan(plan)
    })
    .then(p =>{
      if (!c.limit || c.balance >= p.price * numberOfYears ) {
        return service.createOrder({ 
          client: c._id,
          plan: p._id,
          name,
          dob, 
          gender,
          nationality,
          passport,
          phone,
          fatherName,
          motherName,
          fatherPassport,
          motherPassport,
          address,
          numberOfYears,
          discount: c.discount,
          price: p.price,
          totalPrice: p.price * numberOfYears,
          totalPriceAfterDiscount: (p.price * numberOfYears) - ((p.price * numberOfYears) * c.discount /100) 
        })
      } else {
        throw new Error('Balance is not enough!')
      }
    })
    .then(order => {
      o = order
      return balanceService.createBalance({ client: o.client, balance: o.totalPriceAfterDiscount, transaction: 'substract', order: o._id })
    })
    .then(balance => {
      return clientService.findByIdAndUpdateBalance(o.client, o.totalPriceAfterDiscount, 'substract')
    })
    .then(() => {
      return service.fetchOrderById(o._id)
    })
    .then(order => {
      return res.status(201).send({ order })
    })
    .catch(e => {
      return res.status(401).json({ error: `Error persisting order: ${e}` })
    }) 
       
  }

  ordersUpdate(req, res) {
    const service = new Service(req)
    const { id } = req.params

    service.findByIdAndUpdate(id, req.body)
    .then(order => {
      return service.fetchOrderById(order._id)
    })
    .then(order => {
      return res.status(200).json({ order })
    })
    .catch(e => {
      console.log(`Error at PUT /orders/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

  ordersDelete(req, res) {
    const service = new Service(req)
    const balanceService = new BalanceService(req)
    const clientService = new ClientService(req)
    const { id } = req.params

    let o
    service.fetchOrderById(id)
    .then(order => {
      o = order
      return service.deleteOrderById(id)
    })
    .then(() => {
      return balanceService.deleteBalanceByOrderId(o._id)
    })
    .then(() => {
      return clientService.findByIdAndUpdateBalance(o.client, o.totalPriceAfterDiscount, 'add')
    })
    .then(() => res.status(200).json({ id }))
    .catch(e => {
      console.log(`Error at Delete /orders/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

}



module.exports = new OrdersAPIController
