import React from 'react'
import { Link } from 'react-router-dom'

function Button({text , className , type   }) {
  return (
    
   <button  type={type} className={`  text-center px-5 py-2 bg-green-600 text-white rounded-[50px] font-[600]  ${className}` }>
    {text}
   </button>
   
  )
}

export default Button
