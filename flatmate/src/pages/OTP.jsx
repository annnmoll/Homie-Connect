import React, { useEffect, useState } from 'react'
import Logo from "../components/common/Logo"
import Lottie from 'react-lottie'
import animationData from "../lotties/Otp.json"
import Button from "../components/common/Button"
import { Link, useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import {useForm} from "react-hook-form"
import axios from 'axios'
import { useSelector } from 'react-redux'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};


function OTP() {
  const {email} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [otp , setOtp] = useState("")
  const {register , handleSubmit , formState} = useForm()

  
  useEffect(()=>{
    if(!email ){
      toast.error("Session Timeout");
      navigate("/signup")
    }
} , [])

  const submitHandler = async(data)=>{
    try{
    const response =await  axios.post("http://localhost:4000/validate" , {email , submittedOtp : otp})
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
      toast.error(error.response.data.message)
    }

    
  }
  console.log(email) ; 
  return (
    <div className='w-full h-screen grid  px-5  md:grid-cols-2  '>
      <div className=' py-10  px-5 h-full   md:px-10   flex flex-col justify-start mt-2 md:mb-20  gap-5'>
          <Logo />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='text-2xl font-bold'>
              OTP Sent Successfully !!
            </div>
            <span className='mt-5'>Please enter the 5-digit otp that we've sent to your email</span>

            <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={5}
      containerStyle={ { margin : "20px 0px " } }
      inputStyle={{  border : "1px solid black "  , margin: "0px 10px "  , height : "70px" , width :"50px"  , borderRadius : "5px" }}
      // renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
            <Button type="submit" text="Submit" className="w-full mt-5"></Button>
          </form>
          <div className='text-sm text-gray-600'><Link to="/signup" className='font-bold underline cursor-pointer'>Back to Signup</Link></div>

        </div>

        <div className=' h-auto md:px-10 py-10'>
        <Lottie 
	    options={defaultOptions}
        height={"80%" }
        width={"100%"}
      />
        </div>
      
      </div>
    
  )
}

export default OTP
