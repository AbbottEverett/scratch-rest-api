const express = require('express');
const model = require('../models/foods.js');

// Controller is for returning data, sending status codes
// and managing error handing

function getAll (req, res, next) {
  const data = model.getAll();
  res.status(200).json({ data });
}

function getOne (req, res, next) {
  const data = model.getOne(req.params.id);
  if (data.errors) {
    return next({ status: 404, message: `Could not find food at id: ${req.params.id}`, errors: data.errors });
  }
  res.status(200).json({ data });
}

function create (req, res, next) {
  const data = model.create(req.body);
  if (data.errors) {
    return next({ status: 400, message: `Could not create new food`, errors: data.errors });
  }
  res.status(201).json({ data });
}

function update (req, res, next) {
  res.send('test');
}

function remove (req, res, next) {
  res.send('test');
}

module.exports = { getAll, getOne, create, update, remove };
