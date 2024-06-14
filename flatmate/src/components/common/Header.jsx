import React from 'react'
import Logo from './Logo'
import { useSelector } from 'react-redux'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import CTAButton from './CTAButton'

function Header() {
    const {user} = useSelector(state => state.user)
    const navigate = useNavigate() ;

  return (
    <div  className='w-full h-[70px] bg-[var(--footer-bg)] flex items-center '>
        <div className=' w-full px-5 md:px-10 flex items-center justify-between  mx-auto '>
      <div onClick={()=> navigate("/")} className='cursor-pointer'>
        <Logo />
      </div>

      <CTAButton  className="max-md:hidden"  text="Register / Login" to="/login" />
      <CTAButton  className="md:hidden"  text="Login" to="/login" />
      </div>
    </div>
  )
}

export default Header
