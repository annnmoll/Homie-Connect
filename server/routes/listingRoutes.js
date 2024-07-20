const express = require("express") ;
const router = express.Router() ;
const {createListing,  getListingsByLocation} = require("../controllers/listingController")
const isAuthenticated = require("../middlewares/auth") ; 


router.post("/create" , isAuthenticated ,  createListing)
router.get('/listings/location/:location', getListingsByLocation);

module.exports = router ; 


