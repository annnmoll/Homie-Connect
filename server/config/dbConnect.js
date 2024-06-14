const mongoose = require("mongoose") ;
require("dotenv").config() ;



const dbConnect =()=>{
    // console.log("db connected")
 mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("DB Connected Successfully" )
 }).catch(error => {console.log(error) ; process.exit(1)})
} 


module.exports = dbConnect ;