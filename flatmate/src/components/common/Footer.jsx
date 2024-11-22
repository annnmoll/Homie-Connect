import React from 'react'
import Logo from './Logo'

import { NavLink } from 'react-router-dom'
import Button from './Button'
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <div className=' flex flex-col gap-3  text-gray-700 bg-[var(--footer-bg)] w-full   '>
    <div className='h-2 bg-gray-800'></div>
    <div className=' relative mt-3 flex flex-wrap gap-4 justify-between px-8 items-start py-8  '>
    
    <div className='flex flex-col gap-2'>
        <Logo />
        <p>
            Unit No. 479/13/2 <br /> Model Town, <br /> Rohtak -124001, <br /> Haryana, India
        </p>
        <a className='underline' href='mailto:annnmoll250@gmail.com' >annnmoll250@gmail.com</a>
        <Button className='bg-green-600 hover:bg-green-700 cursor-pointer p-2 text-white rounded-md' text="Contact Us">Contact Us</Button>
        <div className='flex gap-4 mt-2'>
            <FaInstagram className='text-3xl cursor-pointer' />
            <FaFacebook  className='text-3xl cursor-pointer' />
            <FaLinkedin  className='text-3xl cursor-pointer' />
        </div>
    </div>

    <div className='flex flex-col gap-2 '>
        <h2 className='font-bold text-xl'>About</h2>
        <NavLink to="/">Company</NavLink>
        <NavLink to="/">Company</NavLink>
        <NavLink to="/">Company</NavLink>
        <NavLink to="/">Company</NavLink>
        <NavLink to="/">Company</NavLink>
    </div>

    <div className='flex flex-col gap-2'>
        <h2 className='font-bold text-xl'>Flatmates</h2>
        <p>Flatmates in Delhi</p>
        <p>Flatmates in Noida</p>
        <p>Flatmates in Gurgaon</p>
        <p>Flatmates in Mumbai</p>
        <p>Flatmates in Bangalore</p>
        
    </div>

    <div className='flex flex-col gap-2'>
        <h2 className='font-bold text-xl'>Our Services</h2>
        <p>Rent Agreement</p>
        <p>Tenant Verification</p>
        <p>Find Tenants</p>
    </div>
    

    </div>
    
    </div>
  )
}

export default Footer
