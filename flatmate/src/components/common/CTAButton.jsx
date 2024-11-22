import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton({text , to , className }) {
  return (
    <Link to={to} className={` h-fit w-fit  py-3  px-6 text-center text-nowrap   bg-green-600 text-white rounded-[50px] font-[600]  ${className}` }>
      {text}
    </Link>
  )
}

export default CTAButton
