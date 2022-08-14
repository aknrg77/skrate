const express = require('express');
const routes = express.Router();
const user = require('./user');
const ticket = require('./ticket');


routes.use('/users', user);
routes.use('/tickets', ticket);

module.exports = routes;