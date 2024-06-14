import { apis } from "./apis"
import axios from "axios"  
const {SIGNUP} = apis
export const signup = async (email )=>{
    try{
        // console.log(email)
        const response =  await axios.post(SIGNUP, {
             email 
          });
        if(response.data.success) {
            
        }
        else{
            new Error(response.data.message)
        }
    }catch(error){
        console.log(error)
    } 
}