import React from 'react'
import CTAButton from "../components/common/CTAButton"
import Lottie from "react-lottie"
import animationData from "../lotties/NotFound.json"
import Logo from '../components/common/Logo';
function NotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-start gap-y-10 py-10'>
        <Logo />
      <h1 className = "text-3xl font-[500] mt-5 "> Page Not Found</h1>
      
      {/* <div className='w-full hidden md:block '>
      <Lottie 
	    options={defaultOptions}
        // className="w-[70%]"
        width ="70%"
        height={400}
        
      />

      </div> */}
      <div className='w-full md:h-[50vh]   '>
      <Lottie 
	    options={defaultOptions}
        // className="w-[70%]"
        style={{objectFit:'contain'  , width:"auto" }}
        // height={300}
        
      />

      </div>
       
      <CTAButton  to="/" text="Back To Home" className="my-5" />
    </div>
  )
}

export default NotFound
