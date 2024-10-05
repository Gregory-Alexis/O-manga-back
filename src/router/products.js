const productsController = require('../controllers/products');
const { Router } = require('express');
const validation = require('../middlewares/validate');
const schema = require('../schemas/products');
const asyncHelper = require('../helpers/async');
const adminCheck = require('../middlewares/adminCheck');
const router = Router();

router.get(`/`, asyncHelper(productsController.getAllProducts))

router.get(`/:id`, asyncHelper(productsController.getOneProduct))

router.post(`/`, adminCheck, validation(schema.create, 'body'), asyncHelper(productsController.createProduct))

router.delete(`/:id`, adminCheck, asyncHelper(productsController.deleteOneProduct))

router.put(`/:id`, adminCheck, validation(schema.update, 'body'), asyncHelper(productsController.updateOneProduct))

module.exports = router;
