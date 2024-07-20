import React, { useEffect, useState } from 'react'
import Logo from "../components/common/Logo"
import Lottie from 'react-lottie'
import animationData from "../lotties/Otp.json"
import Button from "../components/common/Button"
import { Link, useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateOtp } from '../services/authService'


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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp , setOtp] = useState("")
  const { handleSubmit } = useForm()

  
  useEffect(()=>{
    if(!email ){
      toast.error("Session Timeout");
      navigate("/signup")
    }
} , [email , navigate])

  const submitHandler = async(data)=>{

    dispatch(validateOtp(email, otp, navigate));
   
  }
  
  return (
    <div className='w-full h-screen grid  px-5  md:grid-cols-2  '>
      <div className=' py-10  px-5 h-fit   md:px-10   flex flex-col justify-start mt-2 md:mb-20  gap-5'>
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
      inputStyle={{  border : "1px solid black "  ,width:"100%" , margin: "0px 10px "  , height : "60px" , minWidth :"30px" , maxWidth:"50px"  , borderRadius : "5px" }}
      // renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
            <Button type="submit" text="Submit" className="w-full mt-5"></Button>
          </form>
          <div className='text-sm text-gray-600'><Link to="/signup" className='font-bold underline cursor-pointer'>Back to Signup</Link></div>

        </div>

        <div className='  md:px-10 md:py-10 '>
        <Lottie 
	    options={defaultOptions}
      style={{ objectFit : "contain" , height:"auto", maxWidth:"500" }}

      />
        </div>
      
      </div>
    
  )
}

export default OTP
