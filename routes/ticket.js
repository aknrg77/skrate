const express = require('express');
const routes = express.Router();
const {createTicket} = require('../controllers/tickets')

routes.post('/new', createTicket);

module.exports = routes;