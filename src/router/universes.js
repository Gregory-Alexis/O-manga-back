const asyncHelper = require('../helpers/async');
const universesController = require('../controllers/universes');
const { Router } = require('express');
const validation = require('../middlewares/validate');
const schema = require('../schemas/universes');
const adminCheck = require('../middlewares/adminCheck');
const router = Router();

router.get(`/`, asyncHelper(universesController.getAllUniverses))

router.get(`/:id`, asyncHelper(universesController.getOneUniverse))

router.post(`/`, adminCheck, validation(schema.create, 'body'), asyncHelper(universesController.createUniverse))

router.put(`/:id`, adminCheck, validation(schema.update, 'body'), asyncHelper(universesController.updateOneUniverse))

router.delete(`/:id`, adminCheck, asyncHelper(universesController.deleteOneUniverse))


module.exports = router;