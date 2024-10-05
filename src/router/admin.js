const asyncHelper = require('../helpers/async');
const adminController = require('../controllers/admin');
const { Router } = require('express');
const adminCheck = require('../middlewares/adminCheck');
const router = Router();

router.get(`/dashboard`, adminCheck, asyncHelper(adminController.getDashboardInfos))

module.exports = router;
