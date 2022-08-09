const express = require('express');
const routes = express.Router();
const {createTicket, getTicket, getAllTicket, markClosedTicket, deleteTicket} = require('../controllers/tickets')
const {validateCreateBody, validateGetParam, validateMarkAsClosed} = require('../middleware/tickets');

routes.post('/new', validateCreateBody, createTicket);
routes.get('/all', getAllTicket);
routes.get('/', validateGetParam, getTicket);
routes.post('/markAsClosed', validateMarkAsClosed, markClosedTicket);
routes.delete('/delete', deleteTicket);

module.exports = routes;