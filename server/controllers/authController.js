const User = require("../models/userSchema")
const Otp = require("../models/otpSchema") 


const {generateOtp} = require("../utils/otpGenerator")
const {sendEmail} = require("../utils/mailSender") ;

exports.signup = async(req , res )=>{
    try{
        const {  email} = req.body ;
        const otp = await generateOtp() ; 
        
        const newOtp =  await Otp.create({email , otp})
        
        
          const options = {email : email  , subject : "OTP for verification" , message : `<h1>${otp}</h1>` }
          sendEmail(options) ; 
        res.status(200).json({
            success : true , 
            message : "OTP sent successfully" , 
     
        }) 
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false , 
            message :  "Failed to Signup" , 
            error : error.message
        })
    } 
}

