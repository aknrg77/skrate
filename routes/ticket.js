const express = require('express');
const routes = express.Router();
const {createTicket, getTicket, getAllTicket} = require('../controllers/tickets')
const {validateCreateBody, validateGetParam} = require('../middleware/tickets');

routes.post('/new', validateCreateBody, createTicket);
routes.get('/all', getAllTicket);
routes.get('/', validateGetParam, getTicket);

module.exports = routes;