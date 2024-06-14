import React from 'react'
import Logo from "../components/common/Logo"
import Lottie from 'react-lottie'
import animationData from "../lotties/Animation - 1718078946847.json"
import Input from '../components/common/Input'
import Button from "../components/common/Button"
import { Link } from 'react-router-dom'
function Login() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    

      <div className='w-full h-screen grid  px-5  md:grid-cols-2  '>
      <div className=' py-10  px-5 h-full   md:px-10   flex flex-col justify-start mt-2 md:mb-20  gap-5'>
          <Logo />
          <form>
            <div className='text-2xl font-bold'>
              Login
            </div>
            <span className='mt-5'>Please enter your credentials to sign-in to your account </span>

            <Input placeholder="example@email.com" className ="mt-4"/>
            <Input placeholder="********" className =""/>
            <Button type="submit" text="Login" className="w-full mt-5"></Button>
          </form>
          <div className='text-sm text-gray-600'>New User? <Link to="/signup" className='font-bold underline cursor-pointer'>Sign Up</Link></div>

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

export default Login
