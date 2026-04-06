require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const HotelInfo = require('../models/hotelInfo.js');
const User = require('../models/user.js'); 
const initData = require('./data.js');

const dbUrl = process.env.ATLASDB_URL;

mongoose.connect(dbUrl)
    .then(() => {
        console.log("Connected to MongoDB Atlas!");
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });

const initDB = async () => {
    await HotelInfo.deleteMany({});
    console.log("Old data cleared...");

    let seedUser = await User.findOne({ username: "Ashish" });
    
    if (!seedUser) {
        const newUser = new User({ email: "ashish@gmail.com", username: "Ashish" });
        
        seedUser = await User.register(newUser, "hello");
        console.log("Created new owner: @Ashish");
    } else {
        console.log("Found existing owner: @Ashish");
    }

    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: seedUser._id
    }));

    await HotelInfo.insertMany(initData.data);
    console.log("Database initialized! Ashish now owns all sample properties in the cloud.");
};

initDB().then(() => {
    mongoose.connection.close();
});