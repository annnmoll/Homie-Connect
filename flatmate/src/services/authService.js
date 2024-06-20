import { apis } from "./apis"
import axios from "axios" 
import {setLoading} from "../redux/slices/userSlice" 
import {toast} from "react-toastify" 
import 'react-toastify/dist/ReactToastify.css';
    
const {SIGNUP} = apis
export const signup = async (email , navigate )=>{
    try{
        // console.log(email)
        const response =  await axios.post(SIGNUP, {
             email 
          });
        if(response.data.success) {
           toast.success(response.data.message)
            navigate("/otp")
        }
        else{
            new Error(response.data.message)
        }
    }catch(error){
        console.log(error)
        toast.error("Failed to send OTP")
    } 
}