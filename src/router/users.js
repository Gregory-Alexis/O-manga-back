const asyncHelper = require('../helpers/async');
const usersController = require('../controllers/users');
const authenticate = require('../middlewares/authenticate');
const adminCheck = require('../middlewares/adminCheck');
const validation = require('../middlewares/validate');
const schema = require('../schemas/users');
const { Router } = require('express');
const router = Router();

router.post(`/signup`, validation(schema.create, 'body'), asyncHelper(usersController.createOne));

router.post(`/login`, asyncHelper(usersController.login))

router.get(`/`, adminCheck, asyncHelper(usersController.getAllUsers))

router.get(`/:userId`, authenticate, asyncHelper(usersController.getOneUser))

router.put(`/:userId`, authenticate, validation(schema.update, 'body'), asyncHelper(usersController.updateOneUser))

router.delete(`/:userId`, authenticate, asyncHelper(usersController.deleteOneUser))

module.exports = router;
