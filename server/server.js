const express = require("express") ;
const dbConnect = require("./config/dbConnect")
require("dotenv").config() ;
const userRoutes = require("./routes/userRoutes")
const cors = require("cors") ;
const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json()) ; 
app.use(cors())
app.use( userRoutes) ; 

app.listen(PORT , ()=>{ console.log(`Server started at PORT = ${PORT}`)})
app.get("/" , (req,res)=>{ res.send("Backend is working fine")})
dbConnect() ;


