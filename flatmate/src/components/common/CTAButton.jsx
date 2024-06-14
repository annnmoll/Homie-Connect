import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton({text , to , className }) {
  return (
    <Link to={to} className={`  text-center px-5 py-2 bg-green-600 text-white rounded-[50px] font-[600]  ${className}` }>
      {text}
    </Link>
  )
}

export default CTAButton
