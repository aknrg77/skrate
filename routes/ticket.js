const express = require('express');
const routes = express.Router();
const {createTicket, getTicket, getAllTicket, markClosedTicket, deleteTicket} = require('../controllers/tickets')
const {validateCreateBody, validateMarkAsClosed} = require('../middleware/tickets');
const {setUser} = require('../middleware/users');

routes.post('/new',setUser, validateCreateBody, createTicket);
routes.get('/all', getAllTicket);
routes.get('/', getTicket);
routes.post('/markAsClosed',setUser, validateMarkAsClosed, markClosedTicket);
routes.delete('/delete',setUser, deleteTicket);

module.exports = routes;