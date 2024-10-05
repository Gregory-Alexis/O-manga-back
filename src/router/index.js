const express = require('express');
const { Router } = require('express');
const router = Router();

router.use(express.json())

router.use('/categories', require('./categories'));
router.use('/universes', require('./universes'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));
router.use('/users', require('./userFavoriteCategories'));
router.use('/users', require('./userFavoriteUniverses'));
router.use('/refreshToken', require('./refreshToken'));
router.use('/forgot-password', require('./forgotPassword'));
router.use('/reset-password', require('./resetPassword'));
router.use('/admin', require('./admin'));


// error handler
router.use(require('../middlewares/error'));

// 404
router.use((req, res) => res.status(404).json({ code: 404, message: 'page not found' }));

module.exports = router;
