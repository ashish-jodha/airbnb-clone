const HotelInfo = require('../models/hotelInfo.js');

module.exports.index = async (req, res) => {
    const allListings = await HotelInfo.find({});
    res.render('listings/home', { allListings });
};

module.exports.renderNewForm = async (req, res) => {
    res.render('listings/new');
};

module.exports.createListing = async (req, res) => {
    const newListing = new HotelInfo(req.body.listing);
    newListing.owner = req.user._id; 
    await newListing.save();

    req.flash("success", "New listing created successfully!");
    res.redirect('/listings');
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await HotelInfo.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('owner');

    if (!listing) {
        req.flash("error" , "The Listing you are trying to access is no longer available.");
        return res.redirect("/listings");
    }
    res.render('listings/show', { listing });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await HotelInfo.findById(id);

    if (!listing) {
        req.flash("error" , "The Listing you are trying to edit is no longer available.");
        return res.redirect("/listings");
    }
    res.render('listings/edit', { listing });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    await HotelInfo.findByIdAndUpdate(id, { ...req.body.listing });

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await HotelInfo.findByIdAndDelete(id);

    req.flash("success", "Listing deleted successfully!");
    res.redirect('/listings');
};