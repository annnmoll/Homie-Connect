import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader'


function Button({text , className , type  , ...props }) {
  const {loading} = useSelector(state => state.user)
  return (
    
   <button {...props} type={type} disabled={loading} className={`  text-center px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-[50px] font-[600] transition-all duration-[0.5s]   ${className} ${loading ? "!bg-gray-400 cursor-not-allowed " : ""}`  }>
    {!loading ? text : <Loader  />}
   </button>
   
  )
}

export default Button
