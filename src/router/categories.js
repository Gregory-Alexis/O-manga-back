const asyncHelper = require('../helpers/async');
const categoriesController = require('../controllers/categories');
const validation = require('../middlewares/validate');
const schema = require('../schemas/categories');
const { Router } = require('express');
const adminCheck = require('../middlewares/adminCheck');
const router = Router();

router.get(`/`, asyncHelper(categoriesController.getAllCategories))

router.get(`/:id`, asyncHelper(categoriesController.getOneCategory))

router.post(`/`, adminCheck, validation(schema.create, 'body'), asyncHelper(categoriesController.createCategory))

router.delete(`/:id`, adminCheck, asyncHelper(categoriesController.deleteOneCategory))

router.put(`/:id`, adminCheck, validation(schema.update, 'body'), asyncHelper(categoriesController.updateOneCategory))

module.exports = router;
