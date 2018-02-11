const express = require("express")
const _ = require('lodash')
const moment = require('moment')
const Service = require('./service')

class PlansAPIController {
  plansIndex(req, res) {
    const service = new Service(req)

    service.fetchPlans()
    .then(plans => {
      res.json({ plans: plans })
    })
    .catch(e => {
      console.log("\nError on at plansIndex - GET /plans", e)
      res.status(400).json({ error: e })
    })
  }

  plansShow(req, res) {
    const service = new Service(req)
    const { id } = req.params

    service.fetchPlanById(id)
    .then(plan => {
      res.json({ plan: plan })
    })
    .catch(e => {
      console.log(`\nError at GET /plans/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

  plansCreate(req, res) {
    const service = new Service(req)
    const { name, price } = req.body

    if (!name) {
      res.status(400).json({ error: `You must provide a plan name.` })
    }

    if (!price) {
      res.status(400).json({ error: `You must provide a plan price.` })
    }

    service.createPlan({ name, price })
    .then(plan => {
      res.status(201).send(plan)
    })
    .catch(e => {
      res.status(401).json({ error: `Error persisting plan: ${e}` })
    })

  }

  plansUpdate(req, res) {
    const service = new Service(req)
    const { id } = req.params

    let updatePlan = service.findByIdAndUpdate(id, req.body)

    updatePlan.then(plan => res.status(200).json({ plan }))
    .catch(e => {
      console.log(`Error at PUT /plans/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

  plansDelete(req, res) {
    const service = new Service(req)
    const { id } = req.params

    let deletePlan = service.deletePlanById(id)

    deletePlan.then(() => res.status(200).json({ id }))
    .catch(e => {
      console.log(`Error at Delete /plans/${id}`, e)
      res.status(400).json({ error: e })
    })
  }

}

module.exports = new PlansAPIController
