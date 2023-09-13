import {  useFormik } from 'formik'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import { ID } from 'appwrite'
import { AppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
const appWriteObj = new AppwriteConfig();
const OrderForm = ({ toggleShowOrderDetailsForm }) => {
    const { showToast } = useContext(AppContext);
    const products = useSelector(state => state.cart.products)
    const navigate = useNavigate();
        const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            shippingAddress: '',
            deliveryDate: ''
        },
        onSubmit: (values) => {
            alert(JSON.stringify(products));
            appWriteObj.databases.createDocument(
                process.env.REACT_APP_DBKEY,
                process.env.REACT_APP_COLLECTION_ID_ORDERS_PRODUCTS,
                ID.unique(),
                {
                    products_list: JSON.stringify(products)
                })
                .then(res => {
                    console.log('orders product | res :');
                    console.log(res);
                    appWriteObj.databases.createDocument(
                        process.env.REACT_APP_DBKEY,
                        process.env.REACT_APP_COLLECTION_ID_ORDERS,
                        ID.unique(),
                        {
                            products_id: res.$id,
                            delivery_date: values.deliveryDate,
                            shipping_address: values.shippingAddress,
                            customer_name: values.name,
                            customer_email: values.email,
                            customer_phone: values.phone
                        }).then(res => {
                            console.log('orders | res ' + JSON.stringify(res));
                            showToast('Order Created Successfully.');
                            formik.values.name = '';
                            formik.values.email = '';
                            formik.values.phone = '';
                            formik.values.shippingAddress = '';
                            formik.values.deliveryDate = '';
                            // window.location.reload();
                            navigate(-1);

                        }).catch(err => {
                            console.log('orders | err ' + JSON.stringify(err));
                            showToast('Order not create due to some network error. please try again later.',true);
                        })
                }).catch(err => {
                    console.log('orders producs | err :' + err);
                })
        },

    });
    return (
        <div>
            <h1 className=' text-xl md:text-3xl mt-8 text-center font-bold'>Fill the Details to place the order</h1>
            <form className='w-90 md:w-1/2 mx-auto border-2 border-black rounded-lg p-9 m-5' onSubmit={formik.handleSubmit} >

                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                    <input type="text" value={formik.values.name} onChange={formik.handleChange} id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John deo" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input type="email" value={formik.values.email} onChange={formik.handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="johndeo@gmail.com" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                    <input type="text" value={formik.values.phone} onChange={formik.handleChange} id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="9992213234" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="shippingAddress" className="block mb-2 text-sm font-medium text-gray-900 ">Shiping Address</label>
                    <input type="text" value={formik.values.shippingAddress} onChange={formik.handleChange} id="shippingAddress" name='shippingAddress' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Addresss" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="deliveryDate" className="block mb-2 text-sm font-medium text-gray-900 ">Delivery Date</label>
                    <input type="date" value={formik.values.deliveryDate} onChange={formik.handleChange} id="deliveryDate" name='deliveryDate' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Delivery Date" required />
                </div>
                <div className='flex justify-between '>
                    <button type="button" onClick={() => toggleShowOrderDetailsForm()} className="text-white bg-dark hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Back</button>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Place Order</button>
                </div>

            </form>
        </div>
    )
}

export default OrderForm