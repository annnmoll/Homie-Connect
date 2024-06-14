
const otpGenerator = require("otp-generator")

exports.generateOtp = async() =>{
    const otp = await otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false , lowerCaseAlphabets : false });

    return otp ; 
}