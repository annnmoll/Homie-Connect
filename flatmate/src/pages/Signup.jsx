import React from 'react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Logo from '../components/common/Logo'
import { Link, useNavigate } from 'react-router-dom'
import Lottie from 'react-lottie'
import animationData from "../lotties/Singup.json"
import { useForm } from 'react-hook-form'
import { sendotp } from '../services/authService'
import {useDispatch} from "react-redux"
function Signup() {

    const {register , handleSubmit ,formState  } = useForm()
    const dispatch = useDispatch()
    const {errors} = formState
    const navigate = useNavigate() ;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

      const submitHandler = async(data) =>{
          dispatch(sendotp(data.email , navigate));
        
      }

  return (
    <div className='w-full  grid  px-5  md:grid-cols-2  '>
    <div className=' py-10  px-5    md:px-10   flex flex-col justify-start mt-2 md:mb-20  gap-5'>
        <Logo />
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className='text-2xl font-bold'>
            Enter Email Id
          </div>
          <span className='mt-5'>We will send a 5-digit verification code on this email </span>

          <Input name="email" errors={errors?.email} placeholder="example@email.com" className ="mt-4"  {...register("email" , {required : "Email is required"})} />
          
          <Button type="submit" text="Get OTP" className="w-full mt-5"></Button>
        </form>
        <div className='text-sm text-gray-600'>Already a user? <Link to="/login" className='font-bold underline cursor-pointer'>Login</Link></div>

      </div>

      <div className=' flex items-center  md:px-10 py-10  '>
      <Lottie 
	    options={defaultOptions}
      style={{ objectFit : "contain" , height:"auto", maxWidth:"500" }}

      />
      </div>
    
    </div>
  
  )
}

export default Signup
