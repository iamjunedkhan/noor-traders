import React from 'react'
import { FiYoutube, FiMail,FiTwitter } from "react-icons/fi";
// import { AiFillTwitterCircle } from "react-icons/ai";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { PiFacebookLogoBold } from "react-icons/pi";
const Footer = () => {
  return (
    <div className='bg-dark text-white  space-y-4 flex-col  sm:flex-row  px-12 sm:px-40  flex justify-between py-12'>
    {/* first col*/}
    <div className=' flex flex-col sm:flex-row  items-center sm:items-start  sm:justify-start '>
      {/* <div className='w-16'>
        <img src={logo.src} alt="" />
      </div> */}
      <div className='flex items-center sm:items-start flex-col  '>
        <h1 className='text-xl md:text-3xl signika mt-2 pt-2'>Noor Traders.</h1>
        <div className='my-2  w-64 text-center sm:text-left text-sm md:text-xl'>
          Best Quality Product in <br/> Best Price you need in your daily Life.
        </div>
        <div className='flex space-x-4 text-2xl my-2' >
          <FiYoutube />
          {/* <AiFillTwitterCircle /> */}
          <FiTwitter />
          <BsInstagram />
          {/* <CiFacebook /> */}
          <PiFacebookLogoBold />
        </div>
      </div>
    </div>
    {/* second col */}
    <div className='signika flex flex-col items-center sm:items-end space-y-1 text-center'>
      <h1 className='text-xl md:text-2xl'>Keep In Touch</h1>
      <div className='flex items-center text-sm md:text-xl space-x-2'>
        <MdOutlinePermPhoneMsg /> <p>+91 91234 XXXXX</p>
      </div>
      <div className='flex items-center text-sm md:text-xl space-x-2'>
        <FiMail /><p>lnoortraders@gmail.com</p>
      </div>
      <div className='flex items-start text-sm md:text-xl '>
        <ImLocation2 className='mt-1' /> <p>dummy Streed 123, Temp city  </p>
      </div>
      <div className='flex items-center text-sm md:text-xl space-x-2' >
        <p>454449</p>

      </div>
    </div>
  </div>
  )
}

export default Footer