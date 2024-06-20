import React, { useEffect } from 'react'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import CTAButton from './CTAButton'
import { toast } from 'react-toastify'
import { setToken, setUser } from '../../redux/slices/userSlice'

function Header() {
    const {user} = useSelector(state => state.user)
    useEffect(()=>{} ,[user])
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;
    const logoutHandler =async()=>{
      console.log("logging out")
      document.cookie =`token=; max-age=0;`
      localStorage.removeItem("user");
      toast.success("Logged Out");
      dispatch(setToken(null));
      dispatch(setUser(null));
      navigate('/login')

    }

  return (
    <div  className='w-full h-[70px] bg-[var(--footer-bg)] flex items-center text-sm '>
        <div className=' w-full px-5 md:px-10 flex items-center justify-between  mx-auto '>
      <div onClick={()=> navigate("/")} className='cursor-pointer'>
        <Logo />
      </div>
      {user ?  <div className='text-sm gap-x-4 flex text-nowrap'>
        <Button text="+" />
        <Button text="Logout" className="bg-red-500 text-sm"  onClick={logoutHandler} />
      </div> : <><CTAButton  className="max-md:hidden"  text="Register / Login" to="/login" />
      <CTAButton  className="md:hidden"  text="Login" to="/login" /></>}
      
      </div>
    </div>
  )
}

export default Header
