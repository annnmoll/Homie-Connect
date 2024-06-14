import React from 'react'
import Logo from './Logo'
import Button from './Button'

function Footer() {
  return (
    <div className='w-full relative bg-[var(--footer-bg)] mt-3 flex justify-center items-center py-28'>
    {/* <div className='absolute z-1  -top-10 w-full h-28 bg-[var(--footer-bg)]  -rotate-2'></div> */}
    <div className='w-full flex justify-center max-sm:flex-wrap  items-start gap-14 max-w-md '>
        <div className='flex flex-col gap-2'>
            <Logo />
            <span>
                Unit no. 479/13/2,<br /> Tej Colony, <br /> Rohtak - 124001 
            </span>
            <span>
                anmolahuja250@gmail.com
            </span>
            <Button  text="Contact Us" className=" w-auto "></Button>
        </div>
        <div className='flex flex-col gap-2'>
            <Logo />
            <span className='text-wrap'>
                Unit no. 479/13/2, Tej Colony, Rohtak - 124001 
            </span>
            <span>
                anmolahuja250@gmail.com
            </span>
        </div>
        <div className='flex flex-col gap-2'>
            <Logo />
            <span>
                Unit no. 479/13/2, Tej Colony , Rohtak - 124001 
            </span>
            <span>
                anmolahuja250@gmail.com
            </span>
        </div>
        <div className='flex flex-col gap-2'>
            <Logo />
            <span>
                Unit no. 479/13/2, Tej Colony , Rohtak - 124001 
            </span>
            <span>
                anmolahuja250@gmail.com
            </span>
        </div>
        <div className='flex flex-col gap-2'>
            <Logo />
            <span>
                Unit no. 479/13/2, Tej Colony , Rohtak - 124001 
            </span>
            <span>
                anmolahuja250@gmail.com
            </span>
        </div>
    </div>

    </div>
  )
}

export default Footer
