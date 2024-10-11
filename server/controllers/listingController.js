// controllers/listingController.js
const Listing = require("../models/listingSchema");
const User = require("../models/userSchema"); // Assuming you have a User model
const { uploadImage } = require("../utils/imageUploader");

exports.createListing = async (req, res) => {
  const {
    type,
    title,
    description,
    location,
    isInterestedInPg,
    price,
    lookingFor,
    occupancy,
    roommateDetails,
    highlights,
    amenities,
    roomDetails,
  } = req.body;

  // Validate the required fields
  if (
    !type ||
    !title ||
    !description ||
    !location ||
    !price ||
    !lookingFor ||
    !occupancy
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be filled.",
      error: "Required fields missing.",
    });
  }

  let roommateObj = roommateDetails ? JSON.parse(roommateDetails) : {};

  const imgArr = []; // Initialize the image array

  if (req.files && req.files["images[]"]) {
    const imagesArray = Array.isArray(req.files["images[]"])
      ? req.files["images[]"]
      : [req.files["images[]"]]; // Ensure images are handled as an array

    for (let i = 0; i < imagesArray.length; i++) {
      const tempPath = imagesArray[i]?.tempFilePath;

      if (tempPath) {
        try {
          const response = await uploadImage(tempPath, "Flatmate");
          imgArr.push(response.secure_url); // Push the secure URL to imgArr
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Image upload failed.",
            error: error.message,
          });
        }
      }
    }

    console.log(imgArr, "Uploaded Image URLs");
    console.log(req.body);
    roommateObj = { ...roommateObj, images: imgArr };
    console.log(roommateObj);
  }

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
    isInterestedInPg,
    roommateDetails: type === "Roommate" ? roommateObj : null,
    roomDetails: type === "Room" ? roomDetails : null,
  });

  try {
    await newListing.save();
    res.status(201).json({
      success: true,
      message: "Listing created successfully.",
      newListing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create listing.",
      error: error.message,
    });
  }
};

exports.getListings = async (req, res) => {
  const { location, id } = req.query;
  console.log(req.query);

  if (!location && !id) {
    return res.status(404).json({
      success: false,
      message: "Please select a query parameter",
    });
  }

  try {
    const query = {};
    if (location) query.location = location;
    if (id) query.user = id;

    const listings = await Listing.find(query)
      .populate("user")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    console.error("Error fetching listings:", error); // For debugging
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Please try again",
    });
  }
  try {
    await Listing.findOneAndDelete({ _id: id }).populate("user");
    const listings = await Listing.find({ user: req.user.userId }).populate(
      "user"
    );

    if (listings?.length === 0) {
      return res
        .status(200)
        .json({ success: true, listings: [], message: "Deleted Successfully" });
    }
    res
      .status(200)
      .json({ success: true, listings, message: "Deleted Successfully " });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
