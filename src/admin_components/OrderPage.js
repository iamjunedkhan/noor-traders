import {  Query } from 'appwrite';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import { Loader } from '../Components';
import { AppContext } from '../context/appContext';

const appWriteObj = new AppwriteConfig();
const OrderPage = () => {
    const {showToast} =  useContext(AppContext)
    const params = useParams();
    const order_id = params.order_id;

    const [isLoading, setIsLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null)
    const [productList, setProductList] = useState(null)
    const [status, setStatus] = useState();
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        setIsLoading(false);
        appWriteObj.databases.listDocuments(
            process.env.REACT_APP_DBKEY,
            process.env.REACT_APP_COLLECTION_ID_ORDERS,
            [Query.equal('$id', order_id)])
            .then(res => {
                console.log('res is:');
                console.log(res);
                setOrderDetails(res.documents[0]);
                setStatus(res.documents[0].status);
                // now fetching product list 
                appWriteObj.databases.listDocuments(
                    process.env.REACT_APP_DBKEY,
                    process.env.REACT_APP_COLLECTION_ID_ORDERS_PRODUCTS,
                    [Query.equal('$id', res.documents[0].products_id)])
                    .then(res => {
                        console.log('the product list is ');
                        let parsedData = JSON.parse(res.documents[0].products_list);
                        setProductList(parsedData);
                        setIsLoading(false);
                    }).catch(err => {
                        console.log(err);
                    })
            }).catch(err => {
                console.log('err is:' + err);
            })
    }, [order_id])

    const handleChangeStatus = () => {

        console.log(status);
        if (status == null)
            return;
        appWriteObj.databases.updateDocument(
            process.env.REACT_APP_DBKEY,
            process.env.REACT_APP_COLLECTION_ID_ORDERS,
            orderDetails.$id,
            { order_status: status })
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
                showToast('status not updated.',true);
            })
        setIsEditMode(false);
    }

    const convertDate = (tempDate, time = false) => {
        let tdate = new Date(Date.parse(tempDate));
        if (!time)
            return tdate.toDateString();

        return tdate.toDateString() + ' ' + tdate.toLocaleTimeString()
    }
    if (isLoading || orderDetails == null || productList == null) {
        return <Loader />
    }

    return (
        <div className='p-3'>
            <div className='w-full md:w-1/2 mx-auto m-12 '>
                {/* header for details */}
                <div className='bg-gray-200 p-4 rounded-t-2xl'>
                    <h1 className='text-3xl md:text-4xl text-center font-bold my-4'>Order #{orderDetails?.$id}</h1>
                    <div className='md:grid grid-cols-2'>
                        <div className='font-semibold my-4'>
                            <p className='font-extrabold text-xl'>Order Information</p>
                            <p>Order Date: <span className="font-extrabold">{convertDate(orderDetails.$createdAt, true)}</span></p>
                            <p>Delivery Date: <span className="font-extrabold">{convertDate(orderDetails.delivery_date)}</span></p>
                            <p>Order Status:
                                {!isEditMode && <span onDoubleClick={() => setIsEditMode(true)} className="font-extrabold">{(status !== null && status !== '' && status !== undefined) ? status : (orderDetails?.order_status)}</span>}
                                {isEditMode && <div className='inline'><select id="status" onChange={(e) => setStatus(e.target.value)} class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected >Change status</option>
                                    <option value="New">New</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Complete">Complete</option>
                                    <option value="Cancle">Cancle</option>
                                </select>
                                    <button type="button" onClick={handleChangeStatus} class="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-2 py-1 ml-1 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ok</button></div>}
                            </p>
                            <p>Shipping Address: <span className="font-extrabold">{orderDetails.shipping_address}</span></p>
                        </div>
                        <div className='font-semibold my-4   md:text-right'>
                            <p className='font-extrabold text-xl'>Customer Information</p>
                            <p>Name: <span className="font-extrabold">{orderDetails.customer_name}</span></p>
                            <p>Email: <span className="font-extrabold">{orderDetails.customer_email}</span></p>
                            <p>Phone: <span className="font-extrabold">{orderDetails.customer_phone}</span></p>
                        </div>
                    </div>
                </div>
                {/* body order items details */}
                <div className='border-2 p-4'>
                    <p className='text-3xl font-semibold'>Orderd Items:</p>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-6 boxShadow_light">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList?.map(prod => {
                                    console.log(prod);
                                    return <tr key={prod.$id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {prod.product_name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {prod.quantity}
                                        </td>
                                        <td className="px-6 py-4">
                                            {prod.product_category}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center mr-4">
                                                <input id="inline-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="inline-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Packed</label>
                                            </div>
                                        </td>
                                    </tr>
                                })}

                                {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td class="px-6 py-4">
                                        Silver
                                    </td>
                                    <td class="px-6 py-4">
                                        Laptop
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center mr-4">
                                            <input id="inline-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="inline-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Packed</label>
                                        </div>
                                    </td>
                                </tr> */}


                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OrderPage