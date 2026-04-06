if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const cookieParser = require('cookie-parser'); 
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const ExpressError = require('./utils/ExpressError');
const User = require('./models/user.js');

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;
const port = process.env.PORT || 3000;

mongoose.connect(dbUrl)
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser(process.env.SECRET));
app.use(express.static(path.join(__dirname, 'public')));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600 
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionConfig = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
});

app.get('/', (req, res) => {
    res.redirect('/listings');
});

app.use("/listings" , listingRouter);
app.use("/listings/:id/reviews" , reviewRouter);
app.use("/", userRouter);

app.use((req, res, next) => {
    throw new ExpressError(404, "Page Not Found");
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    
    res.locals.currUser = res.locals.currUser || req.user || null;
    res.locals.success = res.locals.success || '';
    res.locals.error = res.locals.error || '';

    res.status(statusCode).render('error', { statusCode, message });  
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});