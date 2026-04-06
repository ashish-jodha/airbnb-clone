const Joi = require('joi');

// Joi Schema for Listings
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null) 
    }).required()
});

// Joi Schema for Reviews
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});