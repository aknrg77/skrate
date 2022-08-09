const express = require('express');
const routes = express.Router();
const {createUser,loginUser} = require('../controllers/users');
const {validateBody} = require('../middleware/users');

routes.post('/new',validateBody,createUser);

routes.post('/login',validateBody,loginUser);


module.exports = routes;