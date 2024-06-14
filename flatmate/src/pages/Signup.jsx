import React from 'react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Logo from '../components/common/Logo'
import SignupImage from "../assets/signup.png"
import { Link } from 'react-router-dom'
import Lottie from 'react-lottie'
import animationData from "../lotties/Singup.json"
import { useForm } from 'react-hook-form'
import { signup } from '../services/authService'

function Signup() {

    const {register , handleSubmit ,formState  } = useForm()
    const {errors} = formState
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

      const submitHandler = async(data) =>{
        const response = await signup(data?.email);
        
      }

  return (
    <div className='w-full h-screen grid  px-5  md:grid-cols-2  '>
    <div className='py-10  px-5 h-full   md:px-10   flex flex-col justify-start mt-2 md:mb-20  gap-5'>
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

      <div className=' h-auto md:px-10 py-10  '>
      <Lottie 
	    options={defaultOptions}
        height={"80%" }
        width={"90%"}
      />
      </div>
    
    </div>
  
  )
}

export default Signup
