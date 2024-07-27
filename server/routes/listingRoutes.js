const express = require("express") ;
const router = express.Router() ;
const {createListing,  getListings, deleteListing} = require("../controllers/listingController")
const isAuthenticated = require("../middlewares/auth") ; 


router.post("/create" , isAuthenticated ,  createListing)
router.get('/listings', getListings);
router.delete("/listing/:id" ,isAuthenticated ,  deleteListing)

module.exports = router ; 


  