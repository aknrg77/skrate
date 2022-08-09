const express = require('express');
const routes = express.Router();
const {createTicket, getTicket} = require('../controllers/tickets')
const {validateCreateBody} = require('../middleware/tickets');

routes.post('/new', validateCreateBody, createTicket);
routes.get('/', getTicket);

module.exports = routes;