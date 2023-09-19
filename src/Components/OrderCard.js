import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import { AppContext } from '../context/appContext';

const appwrite = new AppwriteConfig();
const OrderCard = ({
    order_id,
    created_date,
    customer_name,
    customer_email,
    customer_phone,
    products_id,
    delivery_date,
    order_status,
    shipping_address
}) => {
    const [convertedDate, setConvertedDate] = useState('');
    const parentRef = useRef()
    const isLoggedIn = useSelector(state => state.admin.is_logged_in);
    const { showToast } = useContext(AppContext);
    useEffect(() => {
        let date = new Date(Date.parse(delivery_date));
        setConvertedDate(date.toDateString());
    }, [delivery_date])

    const capatilize = (s) => {
        return s.charAt(0).toUpperCase() + s.substr(1);
    }

    const handleDelete = () => {
        if (!window.confirm('Are you sure you want to delete this Order?'))
            return;
        console.log('insdie handldelte');
        console.log('the id is ', { order_id });
        appwrite.databases.deleteDocument(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_ORDERS, order_id)
            .then(res => {
                parentRef.current.remove();
                showToast('Order Deleted Successfully.');
                appwrite.databases.deleteDocument(process.env.REACT_APP_DBKEY,
                    process.env.REACT_APP_COLLECTION_ID_ORDERS_PRODUCTS,
                    products_id).then(res => {
                        console.log('orders-products List deleted successfully...');
                    }).catch(err=>{
                        console.log('some error occured in deleteing orders product list '+JSON.stringify(err));
                    })
            }).catch(err => {
                showToast('Some network error occured while delete the order. Please contact Developer.');
                console.log('some error in deleteing the order '+JSON.stringify(err));
            })
    }
    return (
        <div ref={parentRef} className=" p-6 w-full md:w-2/5 rounded-lg productCard_shadow flex flex-col items-start my-6  md:my-6 md:mx-12">
            <div className='flex justify-between w-full'>
                <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">Order ID:{order_id}</span>
                {/* <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">{created_date}</span> */}
            </div>
            <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{customer_name}</h2>
            <div className='flex md:flex-row  gap-2 justify-between  flex-col  w-full'>
                <div>
                    <p className="leading-relaxed ">Email:{customer_email}</p>
                    <p className="leading-relaxed ">Phone:{customer_phone}</p>
                    <span className="inline-block py-1 px-2 rounded bg-green-50 text-green-500 text-sm font-medium tracking-widest my-2">Delivery Date:{convertedDate}</span>
                </div>
                <div>
                    <p className="leading-relaxed ">Shipping Address:</p>
                    <p className="leading-relaxed font-bold">{shipping_address}</p>
                </div>
            </div>
            <div className="flex items-center justify-between flex-wrap pb-4 mt-3 border-b-2 border-gray-100  w-full">
                <span className="inline-block py-1 px-2 rounded bg-rose-50 text-rose-500 text-lg font-medium tracking-widest my-2">Status:{capatilize(order_status)}</span>
                <Link className="text-indigo-500 inline-flex text-xl items-center" to={`/admin/orders/${order_id}`}>View Order
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </Link>
            </div>
            <div>
                {isLoggedIn && <button onClick={()=>handleDelete()} type="button" class="text-white  bg-red-700  hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  w-full md:w-fit flex-1">Delete</button>}
            </div>


        </div>
    )
}

export default OrderCard