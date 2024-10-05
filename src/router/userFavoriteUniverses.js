const asyncHelper = require('../helpers/async');
const favoriteUniversesController = require('../controllers/favoriteUniverses');
const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const router = Router();

router.post('/:userId/favorite/universes/:universeId', authenticate, asyncHelper(favoriteUniversesController.addOneFavoriteUniverse));

router.get('/:userId/favorite/universes', authenticate, asyncHelper(favoriteUniversesController.getAllFavoriteUniverses));

router.delete('/:userId/favorite/universes/:universeId', authenticate, asyncHelper(favoriteUniversesController.removeOneFavoriteUniverse));

module.exports = router;
