const express = require('express');
const routes = express.Router();
const user = require('./user');
const ticket = require('./ticket');
const {setUser} = require('../middleware/users');


routes.use('/users', user);
routes.use('/tickets', setUser, ticket);

module.exports = routes;