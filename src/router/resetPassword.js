const asyncHelper = require('../helpers/async');
const resetPasswordController = require('../controllers/resetPassword');
const schema = require('../schemas/resetPassword');
const validation = require('../middlewares/validate');
const { Router } = require('express');
const router = Router();

router.patch(`/`, validation(schema.update, 'body'), asyncHelper(resetPasswordController.resetPassword))

module.exports = router;
