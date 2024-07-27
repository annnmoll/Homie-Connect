import { apis } from "./apis"
import axios from "axios" 
import {setLoading, setToken, setUser} from "../redux/slices/userSlice" 
import {toast} from "react-toastify" 
import 'react-toastify/dist/ReactToastify.css';
import { setEmail, setPreferences } from "../redux/slices/authSlice";
    
const {REGISTER_USER , SIGNUP, LOGIN, VALIDATE_OTP , UPDATE_PROFILE , FORGOT_PASSWORD , RESET_PASSWORD} = apis

export function sendotp(email, navigate,) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
                dispatch(setEmail(email))
            const response =  await axios.post(SIGNUP, {
                             email 
                          });
                        if(response.data.success) {
                           toast.success(response.data.message)
                            navigate("/otp")
                        }
                        else{
                            toast.error(response.data.message)
                            // new Error(response.data.message)
                        }
                    }catch(error){
                        console.log(error)
                        toast.error(error.response.data.message)
                    } 
        dispatch(setLoading(false));
    };
}


export function validateOtp(email, otp, navigate,) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            
            const response =await  axios.post(VALIDATE_OTP , {email , submittedOtp : otp})
            console.log(response) ; 
            if(response.data.success){
              navigate("/details") ;
              toast.success(response.data.message)
            }
            else{
                toast.error(response.data.message)
            }
          }
            catch(error){
              console.log(error)
              toast.error(error?.response?.data?.message)
            }
        dispatch(setLoading(false));
    };
}


export function registerUser(details, data, email, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            dispatch(setPreferences(data)) ; 
            const {password , gender , name , role , city , age  } = details
        const response = await axios.post(REGISTER_USER , {
          email , password  , name , role , age , gender , preferences : data , city 
        })

        console.log(response.data)
        if(response.data.success){  toast.success("Created successfully");
      dispatch(setUser(response.data.user))
      dispatch(setToken(response.data.token))
   
      // const expire= new Date(new Date().getTime() + (7*24*60*60*1000));
      // document.cookie= `token=${response.data.token}; expires=${expire};`;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    navigate("/")
    }
        
      }catch(error){
        toast.error(error.response.data.message)  ; 
        console.log(error)
      }
        dispatch(setLoading(false));
    };
}

export function login(email, password, navigate,) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            
            const response = await axios.post(LOGIN, {
                email,
                password,
              });
              if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.user));
                dispatch(setToken(response.data.token));
        
                // const expire = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
                // document.cookie = `token=${response.data.token}; expires=${expire};`;
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.token);
                
                navigate("/");
                
              }
        } catch (error) {
            console.log("Logout error", error.message);
            toast.error(error.response.data.message || "Failed to Login");
        }
        dispatch(setLoading(false));
    };
}

export function updateProfile(token, formObj, navigate){
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
        
        const response = await axios.put(UPDATE_PROFILE, formObj,    {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });

          console.log(response)
          if (response.data.success) {
            toast.success(response.data.message);
            dispatch(setUser(response.data.user));
            localStorage.setItem("user" , JSON.stringify(response.data.user))
            navigate("/");
          }
          //   dispatch(setToken(response.data.token));
    
          //   // const expire = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
          //   // document.cookie = `token=${response.data.token}; expires=${expire};`;
          //   localStorage.setItem("user", JSON.stringify(response.data.user));
          //   localStorage.setItem("token", response.data.token);
          //   navigate("/");
          }
    catch (error) {
        console.log("Logout error", error);
        toast.error(error.response.data.message || "Failed to update profile");
    }
    dispatch(setLoading(false));
}
}


export function forgotPassword(data  , navigate){
  return async (dispatch) => {
    dispatch(setLoading(true));
    try{
      const {email} = data ;
     //  console.log(email)
      const response  = await axios.post(FORGOT_PASSWORD , {email })

     //  console.log(response)
      if(response.data.success){
       toast.success(response.data.message)
       navigate("/")
     }
      
   }catch(error){
     console.log(error);
     toast.error(error.response.data.message);
   }
   dispatch(setLoading(false));

}
}





export function resetPassword(data  , token ,  navigate){
  return async (dispatch) => {
    dispatch(setLoading(true));
    try{
      const {password, confirmPassword} = data ;
      if(password !==confirmPassword){
       toast.warn("Confirm your password again")
      }
     //  console.log(password, confirmPassword)
      const response  = await axios.post(`${RESET_PASSWORD}/${token}` , {password })

     //  console.log(response)
      if(response.data.success){
       toast.success(response.data.message)
       navigate("/")
     }
      
   }catch(error){
     console.log(error);
     toast.error(error.response.data.message);
   }
   dispatch(setLoading(false));

}
}

