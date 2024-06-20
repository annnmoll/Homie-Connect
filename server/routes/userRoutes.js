const express = require("express") ; 
const { signup, validateOtp, createUser, loginUser } = require("../controllers/authController");
const router = express.Router() ;


router.post("/register" , signup) ;
router.post("/validate" , validateOtp) ;
router.post("/createuser" , createUser) ;
router.post("/login" , loginUser)

module.exports = router ;