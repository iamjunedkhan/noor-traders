import React from 'react'
import { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { GrFormClose } from "react-icons/gr";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout} from './../features/admin/adminSlice'
import { PUBLIC_ADMIN_EMAIL_HASH, PUBLIC_ADMIN_NAME_HASH, PUBLIC_LOGGEDIN_HASH } from '../contastans/constant';

const Navbar = ({ showToast }) => {

  const [showNavbar, setShowNavbar] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state=>state.admin.is_logged_in);
  const navigate =useNavigate();
  const handleLogout= ()=>{
    dispatch(logout());
    localStorage.removeItem(PUBLIC_LOGGEDIN_HASH)
    localStorage.removeItem(PUBLIC_ADMIN_NAME_HASH)
    localStorage.removeItem(PUBLIC_ADMIN_EMAIL_HASH)
  }
  const handleLogin= ()=>{
    navigate('/admin/login');

  }

  return (
    <>
      <div className=' bg-dark text-white p-4 md:px-20 flex justify-between items-center relative'>
        <div>
          <h1 className='text-xl' onClick={() => showToast('mest')} >Noor Traders</h1>
        </div>

        <div className='hidden md:block bg-dark text-xl text-white'>
          <span className={`px-3 mx-4 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink to="/" >Home</NavLink></span>
          <span className={`px-3 mx-4 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink to="/shop" >Shop</NavLink></span>
          <span className={`px-3 mx-4 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink to='/company' >Company</NavLink></span>
          <span className={`px-3 mx-4 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink to='/category' >Category</NavLink></span>
          {/* <span className={`px-3 mx-4 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink to='/contact-us' >Contact Us</NavLink></span> */}
          <span className={`px-3 mx-4 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink to='/cart' >Cart</NavLink></span>
          {isLoggedIn&&<span className={`px-3 mx-4 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink to='/admin/orders' >Orders</NavLink></span>}
          {isLoggedIn&&<button onClick={handleLogout} type="button" className="text-white  bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  w-full md:w-fit flex-1">Logout</button>}
          {!isLoggedIn&&<button onClick={handleLogin} type="button" className="text-white  bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  w-full md:w-fit flex-1">Login</button>}

        </div>
        <div className='text-3xl md:hidden block ' >
          {showNavbar ? <GrFormClose onClick={() => setShowNavbar(false)} className={`  transition-all duration-200 bg-white text-white `} /> : <GiHamburgerMenu onClick={() => setShowNavbar(true)} className={` transition-all duration-200 `} />}
        </div>
      </div>
      <div className={` bg-dark text-xl text-white flex flex-col justify-center overflow-hidden transition-all duration-300  ${showNavbar ? (isLoggedIn?'h-[310px]':'h-[230px]') : 'h-0'}`}>
        <span className={`px-3 mx-4 my-2 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink onClick={() => setShowNavbar(false)} to="/" >Home</NavLink></span>
        <span className={`px-3 mx-4 my-2 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink onClick={() => setShowNavbar(false)} to="/shop" >Shop</NavLink></span>
        <span className={`px-3 mx-4 my-2 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink onClick={() => setShowNavbar(false)} to="/company" >Company</NavLink></span>
        <span className={`px-3 mx-4 my-2 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink onClick={() => setShowNavbar(false)} to="/category" >Category</NavLink></span>
        {/* <span className={`px-3 mx-4 my-2 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink onClick={() => setShowNavbar(false)} to="/contact-us" >Contact Us</NavLink></span> */}
        <span className={`px-3 mx-4 my-2 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink onClick={() => setShowNavbar(false)} to="/cart" >Cart</NavLink></span>
        {isLoggedIn&&<span className={`px-3 mx-4 my-2 hover:scale-105  hover:font-semibold cursor-pointer transition-all duration-150 relative `}><NavLink onClick={() => setShowNavbar(false)} to="/admin/orders" >Orders</NavLink></span>}
        {isLoggedIn&&<button onClick={handleLogout} type="button" className="text-white  bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  w-fit ml-4">Logout</button>}
        {!isLoggedIn&&<button onClick={handleLogin} type="button" className="text-white  bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  w-fit ml-4">Login</button>}
      </div>
    </>
  )

}

export default Navbar