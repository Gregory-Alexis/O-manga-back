const asyncHelper = require('../helpers/async');
const refreshTokenController = require('../controllers/refreshToken');
const { Router } = require('express');
const router = Router();

router.post('/', asyncHelper(refreshTokenController.getRefreshToken));

module.exports = router;
