const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const hotelInfoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
        set: (v) => v === "" ? "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800" : v
    },
    price: {
        type: Number,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

hotelInfoSchema.post('findOneAndDelete', async function (listing) {
    if (listing && listing.reviews.length > 0) {
        await Review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });
    }
});

const HotelInfo = mongoose.model('HotelInfo', hotelInfoSchema);

module.exports = HotelInfo;