import React from 'react'

function Loader({className}) {
  return (
   
      <div className={`h-full flex space-x-2 justify-center py-2 items-center bg-inherit ${className}`}>
 	{/* <span className='sr-only'>Loading...</span> */}
  	<div className='h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-2 w-2 bg-gray-600 rounded-full animate-bounce'></div>
</div>
   
  )
}

export default Loader
