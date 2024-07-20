// controllers/listingController.js
const Listing = require('../models/listingSchema');
const User = require('../models/userSchema'); // Assuming you have a User model

exports.createListing = async (req, res) => {
  const { type, title, description, location, isInterestedInPg ,  price, lookingFor, occupancy, roommateDetails, roomDetails } = req.body;

// Validate the required fields
  if (!type || !title || !description || !location || !price || !lookingFor || !occupancy) {
    return res.status(400).json({ success : false , message : "All fields must be filled" ,  error: 'All required fields must be filled.' });
  }

  console.log(req.user)
// Create the new listing
  const newListing = new Listing({
    user: req.user.userId,
    type,
    title,
    description,
    location,
    price,
    lookingFor,
    occupancy,
    isInterestedInPg ,
    roommateDetails: type === 'Roommate' ? roommateDetails : null,
    roomDetails: type === 'Room' ? roomDetails : null
  });

  try {
    await newListing.save();
    res.status(201).json({ success : true , message : "Listing created successfully" , newListing});
  } catch (error) {
    res.status(400).json({ success : false , message : "Failed to create listing" ,  error: error.message });
  }
};



exports.getListingsByLocation = async (req, res) => {
  const { location } = req.params;

  try {
    const listings = await Listing.find({ location }).populate('user');
    if (listings.length === 0) {
      return res.status(200).json({ success:true, listings: []});
    }
    res.status(200).json({success: true , listings});
  } catch (error) {
    res.status(500).json({success: false , message: "Server error", error });
  }
};