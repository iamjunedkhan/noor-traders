import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import { PUBLIC_ADMIN_EMAIL_HASH, PUBLIC_ADMIN_NAME_HASH } from './contastans/constant';
import { AppContext } from './context/appContext';
import { login } from './features/admin/adminSlice'
import { initializeUserDetails } from './features/user/userSlice';
import {
  Cart, Category, ContactUs, FilteredProducts, Footer, Hero,
  Navbar, NotFound, OrderForm, Shop, AddProducts, DashBoard, AdminLogin,
  EditProduct, Orders, OrderPage,BulkDelete, Company, SearchProduct, FileReaderCSV 
} from './Components';
import { initializeCart } from './features/cart/cartSlice';




function App() {
  //a test comment for checking changes 
  const dispatch = useDispatch();
  const showToast = (msg, isError = false) => {
    if (!isError) {
      toast.success(msg, {
        position: "top-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      toast.error(msg, {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    // toast('this is message');
  }
  useEffect(() => {
    let isLoggedIn = localStorage.getItem(process.env.REACT_APP_LOGGEDIN_HASH);
    let userDetails = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_DETAILS_HASH));
    let noorTradersCart = JSON.parse(localStorage.getItem('NoorTradersCart'));
    console.log('the user details in app js is '+JSON.stringify(userDetails));
    console.log('the noortraders cart is :'+noorTradersCart);
    console.log({ isLoggedIn });
    if (isLoggedIn) {
      let adminName = localStorage.getItem(PUBLIC_ADMIN_NAME_HASH);
      let admin_email = localStorage.getItem(PUBLIC_ADMIN_EMAIL_HASH);
      console.log({ adminName });
      dispatch(login({ admin_name: adminName, admin_email: admin_email }))
    }
    if(userDetails !=null &&userDetails!==undefined && userDetails!=='' ){
          dispatch(initializeUserDetails({user_name:userDetails.user_name,
            user_email:userDetails.user_email,
            user_phone:userDetails.user_phone,
            user_details_exist:userDetails.user_details_exist,
            user_shipping_address:userDetails.user_shipping_address
          }))
    }
    if(noorTradersCart!=null && noorTradersCart !==undefined && noorTradersCart!==''){
      console.log('noortraders cart is ');
      console.log(...noorTradersCart);
      dispatch(initializeCart([...noorTradersCart]));
    }



  },)

  return (
    <AppContext.Provider value={{ showToast }} >
      <div className='relative'  >
        <Navbar showToast={showToast} />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/category' element={<Category />} />
          <Route path='/company' element={<Company />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/cart/order-now' element={<OrderForm />} />
          {/* <Route path='/add-product' element={<AddProducts />} /> */}
          <Route path='/category/:campany_name' element={<FilteredProducts queryParameter={'product_category'} />} />
          <Route path='/company/:campany_name' element={<FilteredProducts queryParameter={'product_company'} />} />
          <Route path='/admin/add-product' element={<AddProducts />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<DashBoard />} />
          <Route path='/admin/edit-product/:product_id' element={<EditProduct />} />
          <Route path='/admin/orders' element={<Orders />} />
          <Route path='/admin/orders/:order_id' element={<OrderPage />} />
          <Route path='/admin/file-reader' element={<FileReaderCSV />} />
          <Route path='/admin/search-product' element={<SearchProduct />} />
          <Route path='/admin/dev/bulk-delete' element={<BulkDelete />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </AppContext.Provider>

  );
}

export default App;
