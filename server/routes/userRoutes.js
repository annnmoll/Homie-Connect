const express = require("express") ; 
const { signup, validateOtp, createUser, loginUser, forgotPassword , resetPassword, updateProfile} = require("../controllers/authController");
const router = express.Router() ;
const isAuthenticated = require("../middlewares/auth")


router.post("/register" , signup) ;
router.post("/validate" , validateOtp) ;
router.post("/createuser" , createUser) ;
router.post("/login" , loginUser);
router.post("/forgot" , forgotPassword);
router.post("/reset/:token" , resetPassword)
router.put("/update/myprofile" ,isAuthenticated ,updateProfile)

module.exports = router ;