import React from 'react'
import Logo from './Logo'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import CTAButton from './CTAButton'
import Avatar from "../../assets/avatar.png"

function Header() {
    const {user} = useSelector(state => state.user)
    
    const navigate = useNavigate() ;

    

   

  return (
    <div  className='w-full h-[70px] bg-[var(--footer-bg)] flex items-center text-sm sticky top-0'>
        <div className=' w-full px-5 md:px-10 flex items-center justify-between  mx-auto '>
      <div onClick={()=> navigate("/")} className='cursor-pointer'>
        <Logo />
      </div>
      {user ?  <div className='text-sm gap-x-4 flex text-nowrap   gap-3 items-center'>
        <CTAButton text="Add" to="/listing" className="flex items-center justify-center w-fit" />
        <div className='w-full h-full cursor-pointer ' onClick={()=> navigate("/my-profile")} >
        <img src={user?.profilePicture || Avatar} className=' w-[50px] h-[50px] rounded-md object-cover' />
        </div>
         
      </div> : <><CTAButton  className="max-md:hidden"  text="Register / Login" to="/login" />
      <CTAButton  className="md:hidden"  text="Login" to="/login" /></>}
      
      </div>

      {/* {<Outlet />} */}
    </div>
  )
}

export default Header
