// controllers/listingController.js
const Listing = require('../models/listingSchema');
const User = require('../models/userSchema'); // Assuming you have a User model
const { uploadImage } = require('../utils/imageUploader');

exports.createListing = async (req, res) => {
  const { type, title, description, location, isInterestedInPg ,  price, lookingFor, occupancy, roommateDetails, roomDetails } = req.body;
  
  console.log(req.body, "body")
  console.log(req.files,"diles" )
  
// Validate the required fields
  if (!type || !title || !description || !location || !price || !lookingFor || !occupancy) {
    return res.status(400).json({ success : false , message : "All fields must be filled" ,  error: 'All required fields must be filled.' });
  }

  if(roommateDetails && req.files &&  req.files['images[]'].length > 0){
    for(let i=0 ; req.files['images[]'].length ; i++){

      const tempPath = req.files['images[]'][i]?.tempFilePath  
      const response = tempPath ? await uploadImage(tempPath, "Flatmate") : { secure_url: "" };
      if(response){imgArr.push(response.secure_url)}
    }
    console.log(imgArr , "imgArr") ; 
    roommateDetails.images = imgArr ; 
}



  console.log(roommateDetails )
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



exports.getListings = async (req, res) => {
  const { location , id  } = req.query;
  console.log(req.query)
   
  if( !location && !id){
    
    return res.status(404).json({
      success:false ,
      message : "Please select a query parameter"
    })
  }
  try {
     let listings = [] ;

     if(location && id ){
      listings = await Listing.find({ location , user:id }).populate('user');

     }
     else if(location){

       listings = await Listing.find({ location }).populate('user');
     }
     else{
      listings = await Listing.find({ user: id  }).populate('user');

     }
    if (listings.length === 0) {
      return res.status(200).json({ success:true, listings: []});
    }
    res.status(200).json({success: true , listings});
  } catch (error) {
    res.status(500).json({success: false , message: "Server error", error });
  }
};


exports.deleteListing = async(req, res)=>{
  const {  id  } = req.params;
  
  if( !id){
    
    return res.status(404).json({
      success:false ,
      message : "Please try again"
    })
  }
  try {
     
        
       await Listing.findOneAndDelete({ _id: id  }).populate('user');
       const listings = await Listing.find({user : req.user.userId}).populate('user') ;

    
    if (listings?.length === 0) {
      return res.status(200).json({ success:true, listings: [] , message: "Deleted Successfully"});
    }
    res.status(200).json({success: true , listings , message : "Deleted Successfully "});
  } catch (error) {
    res.status(500).json({success: false , message: "Server error", error });
  }
}