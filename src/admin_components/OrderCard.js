import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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

        useEffect(() => {
           let date=  new Date(Date.parse(delivery_date));
            setConvertedDate(date.toDateString());
        }, [])
        
        const capatilize= (s)=>{
            return s.charAt(0).toUpperCase()+s.substr(1);
        }
        return (
        <div className=" p-6 w-full md:w-2/5 rounded-lg productCard_shadow flex flex-col items-start my-6  md:my-6 md:mx-12">
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

        </div>
    )
}

export default OrderCard