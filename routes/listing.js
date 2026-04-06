const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listings.js');
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js"); 

router.route('/')
    .get(listingController.index)
    .post(isLoggedIn, validateListing, listingController.createListing);

router.get('/new', isLoggedIn, listingController.renderNewForm);

router.route('/:id')
    .get(listingController.showListing)
    .put(isLoggedIn, isOwner, validateListing, listingController.updateListing)
    .delete(isLoggedIn, isOwner, listingController.destroyListing);

router.get('/:id/edit', isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;