import { Query } from 'appwrite';
import { useFormik } from 'formik'
import React, { useContext, useRef, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppwriteConfig } from '../appwrite/appWriteConfig'
import Loader from '../Components/Loader';
import { AppContext } from '../context/appContext';
import { login } from '../features/admin/adminSlice';

const appwrite = new AppwriteConfig();
const AdminLogin = () => {
  const myRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useContext(AppContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn= useSelector(state=>state.admin.is_logged_in);
  


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      // alert(JSON.stringify(values))
      setIsLoading(true);
      appwrite.databases.listDocuments(process.env.REACT_APP_DBKEY,
        process.env.REACT_APP_COLLECTION_ID_ADMIN,
        [Query.equal('admin_email', values.username),
        Query.equal('admin_password', values.password)]
      ).then(res => {
        console.log('Res is:');
        console.log(res);
        if (res.total > 0) {
          localStorage.setItem(process.env.REACT_APP_LOGGEDIN_HASH,true);
          let adminName = res.documents[0].admin_name;
          let adminEmail=res.documents[0].admin_email;
          localStorage.setItem(process.env.REACT_APP_ADMIN_NAME_HASH,adminName);
          localStorage.setItem(process.env.REACT_APP_ADMIN_EMAIL_HASH,adminEmail);
          showToast(`Welcome ${adminName}. You are Logged In.`)
          setIsLoading(false);
          dispatch(login({
            admin_name: adminName,
            admin_email:adminEmail ,
            is_logged_in: true
          }));

          navigate(-1);

        } else {
          showToast(`Sorry Username or Password is Wrong.`, true)
          setIsLoading(false);
        }
        formik.values.username = '';
        formik.values.password = '';
      }).catch(err => {
        showToast(`Some error occured.`, true);
        console.log('error is:');
        console.log(err);
      })
    }
  });


  useEffect(() => {
    myRef.current.focus();
    
    if(isLoggedIn)
    navigate('/shop');
  },[]);
  

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='p-12 h-91 flex justify-center items-center'>
      <form className='p-12 bg-dark w-full md:w-1/3 m-12 mx-auto rounded-lg  ' onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Your email</label>
          <input type="email" id="username" ref={myRef} value={formik.values.username} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required  />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
          <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 w-fit mx-auto block">Login</button>
      </form>
    </div>
  )
}

export default AdminLogin