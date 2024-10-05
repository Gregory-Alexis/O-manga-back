const asyncHelper = require('../helpers/async');
const forgotPasswordController = require('../controllers/forgotPassword');
const schema = require('../schemas/forgotPassword');
const validation = require('../middlewares/validate');
const { Router } = require('express');
const router = Router();

router.post(`/`, validation(schema.create, 'body'), asyncHelper(forgotPasswordController.forgotPassword))

module.exports = router;
