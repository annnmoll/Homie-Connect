const cloudinary = require("cloudinary").v2;
require("dotenv");

const cloudinaryConfig = async () => {
    try{
       cloudinary
        .config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.CLOUD_API,
          api_secret: process.env.CLOUD_SECRET,
        })

        console.log("Connected to Cloudinary Successfully") ; 
    }
  catch(err){
    console.log(err.message);
    process.exit(1);
  }


   
};


module.exports = cloudinaryConfig ; 
