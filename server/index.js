const express = require("express") ;
const dbConnect = require("./config/dbConnect")
const cloudinaryConnect = require("./config/cloudinaryConfig");
require("dotenv").config() ;
const userRoutes = require("./routes/userRoutes")
const listingRoutes = require("./routes/listingRoutes")
const cors = require("cors") ;
const PORT = process.env.PORT || 4000
const app = express()
const fileUpload = require("express-fileupload")


app.use(express.json()) ; 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin : "*"})); 
app.use( userRoutes) ;
app.use("/api/listing" , listingRoutes) 

app.listen(PORT , ()=>{ console.log(`Server started at PORT = ${PORT}`)})
app.get("/" , (req,res)=>{ res.json("Backend is working fine")})
dbConnect() ;
cloudinaryConnect() ;  


