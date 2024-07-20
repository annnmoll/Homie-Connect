import React from 'react'
import { useSelector } from 'react-redux'


function Button({text , className , type  , ...props }) {
  const {loading} = useSelector(state => state.user)
  return (
    
   <button {...props} type={type} disabled={loading} className={`  text-center px-5 py-2 bg-green-600 text-white rounded-[50px] font-[600]   ${className} ${loading ? "!bg-gray-400 cursor-not-allowed" : ""}`  }>
    {text}
   </button>
   
  )
}

export default Button
