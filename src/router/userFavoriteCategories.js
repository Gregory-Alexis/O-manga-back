const asyncHelper = require('../helpers/async');
const favoriteCategoriesController = require('../controllers/favoriteCategories');
const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const router = Router();

router.post('/:userId/favorite/categories/:categoryId', authenticate, asyncHelper(favoriteCategoriesController.addOneFavoriteCategory));

router.get('/:userId/favorite/categories', authenticate, asyncHelper(favoriteCategoriesController.getAllFavoriteCategories));

router.delete('/:userId/favorite/categories/:categoryId', authenticate, asyncHelper(favoriteCategoriesController.removeOneFavoriteCategory));


module.exports = router;
