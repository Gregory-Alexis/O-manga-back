const asyncHelper = require('../helpers/async');
const reviewsController = require('../controllers/reviews');
const validation = require('../middlewares/validate');
const schema = require('../schemas/reviews');
const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const router = Router();

router.post('/users/:userId/products/:productId', authenticate, validation(schema.create, 'body'), asyncHelper(reviewsController.addReview));

router.get('/products/:productId', asyncHelper(reviewsController.getAllReviewsByProduct));

router.get('/:reviewId', asyncHelper(reviewsController.getOneReview));

router.put('/:reviewId/users/:userId', authenticate, validation(schema.update, 'body'), asyncHelper(reviewsController.updateOneReview));

router.delete('/:reviewId/users/:userId', authenticate, asyncHelper(reviewsController.deleteOneReview));

module.exports = router;
