const cloudinary = require("cloudinary").v2 ; 

exports.uploadImage = async(image , folder)=>{
  try{
    const response = await  cloudinary.uploader.upload(image, 
    { folder });
    return response ; 
  }catch(error){
    return error ;
  }
}