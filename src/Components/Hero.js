import React from 'react'
import {BsArrowRight} from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
const Hero = () => {
    return (
        <div className='relative  h-91'>
            <div className="  bg-hero-pattern bg-center bg-cover h-91 brightness-35 -z-30 " >
            </div>
            <div className='absolute top-20 md:top-28  left-3 md:left-20'>
                <h1 className='text-3xl font-bold md:text-8xl text-white '>Noor Traders.</h1>
                <span className='text-white text-lg md:text-2xl'>Best Quality Product in
                    Best Price you need in your daily Life.</span>
            <div className='mt-4  '>
                <NavLink to="/company" className='flex items-center gap-1 w-fit hover:font-bold transition-all duration-150 text-sm md:text-xl text-black bg-white px-5 py-2 rounded-lg'>Explore Menu <BsArrowRight className='relative top-[2px]' /></NavLink>
            </div>
            </div>
        </div>
    )
}

export default Hero