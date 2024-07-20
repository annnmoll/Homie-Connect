import React from 'react'
import { useNavigate } from 'react-router-dom'
function Logo() {
  const navigate = useNavigate()
  return (
    <div className='flex text-xl cursor-pointer' onClick={()=>{navigate("/")}}>
    <h1 className='logo'>Homie</h1><span className='text-green-700 font-bold'>Connect</span>
    <span className='text-lg font-bold'>®</span> 
    
  </div>
  )
}

export default Logo
