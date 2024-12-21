const Joi = require('joi');

const ListingSchema = Joi.object({
    Listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        category: Joi.string().valid(
            'Trending', 'Room', 'Iconic Cities', 'Mountains', 'Castles',
            'Amazing Pools', 'Camping', 'Farms', 'Arctic', 'Domes', 'Boats'
        ).required() // Include category with valid options and required
    }).required()
});

const ReviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});

module.exports = { ListingSchema, ReviewSchema };
