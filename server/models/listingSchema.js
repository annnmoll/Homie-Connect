const mongoose = require("mongoose") ;


const roommateSchema = new mongoose.Schema({
  highlights : {
   attachedWashroom : {type :Boolean , required : true } , 
   marketNearby : {type :Boolean , required : true } ,
   attachedBalcony  : {type :Boolean , required : true } ,
   closeToMetroStation : {type :Boolean , required : true } ,
   publicTransportNearby : {type :Boolean , required : true } , 
   gatedSociety : {type :Boolean , required : true } ,
   separateWashrooms : {type :Boolean , required : true } , 
   newlyBuilt : {type :Boolean , required : true } , 
   housekeeping : {type :Boolean , required : true } , 
   gymNearby : {type :Boolean , required : true } , 
   parkNearby : {type :Boolean , required : true } 
   }  , 
   amenities : {
    television : {type :Boolean , required : true } , 
    fridge : {type :Boolean , required : true } , 
    kitchen : {type :Boolean , required : true } ,
    wifi : {type :Boolean , required : true } , 
    washingMachine : {type :Boolean , required : true } , 
    ac : {type :Boolean , required : true } , 
    cook : {type :Boolean , required : true }  , 
    parking : {type :Boolean , required : true } 
   }
    // Add other roommate-specific fields here
  });
  
  const roomSchema = new mongoose.Schema({
    highlights : {
      vegetarian : {type :Boolean , required : true } , 
      workingFullTime : {type : Boolean , required : true } , 
      collegeStudent : {type :Boolean , required : true } , 
      above25 : {type :Boolean , required : true } , 
      below25 : {type :Boolean , required : true } , 
      have2Wheeler : {type :Boolean , required : true } ,
      have4Wheeler : {type :Boolean , required : true } , 
      willShiftImmediately : {type :Boolean , required : true } , 
      havePets : {type :Boolean , required : true } ,
      needNoFurnishing : {type :Boolean , required : true }
  
      
     }  , 
    isInterestedInPg : {type : Boolean , required : true } ,
  
  });

const listingSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Roommate', 'Room'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  lookingFor : {type : String , required : true } , 
  occupancy : {type : String , enum : ["Single" , "Shared" , "Any"]} , 
  roommateDetails: roommateSchema,
  roomDetails: roomSchema,
  createdAt: { type: Date, default: Date.now },

})

module.exports = mongoose.model("Listing" , listingSchema)
