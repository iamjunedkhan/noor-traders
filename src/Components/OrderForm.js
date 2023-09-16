import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import { ID } from 'appwrite'
import { AppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
const appWriteObj = new AppwriteConfig();
const OrderForm = ({ toggleShowOrderDetailsForm }) => {

    const products = useSelector(state => state.cart.products)
    const navigate = useNavigate();
    const { showToast } = useContext(AppContext);
    const userDetails = useSelector(state => state.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');

    const handleChange = (e) => {
        console.log(e.target.name);
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'phone':
                setPhone(e.target.value);
                break;
            case 'shippingAddress':
                setShippingAddress(e.target.value);
                break;
            case 'deliveryDate':
                setDeliveryDate(e.target.value);
                break;
            default:
                break;
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('form submit');

        if (!window.confirm('Press Okay to place Order'))
            return;

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
                        delivery_date: deliveryDate,
                        shipping_address: shippingAddress,
                        customer_name: name,
                        customer_email: email,
                        customer_phone: phone
                    }).then(res => {
                        console.log('orders | res ' + JSON.stringify(res));
                        showToast('Order Created Successfully.');
                        let userObj = {
                            user_email: email,
                            user_phone: phone,
                            user_name: name,
                            user_details_exist: true,
                            user_shipping_address: shippingAddress
                        }
                        try {
                            localStorage.setItem(process.env.REACT_APP_USER_DETAILS_HASH, JSON.stringify(userObj))
                        } catch (error) {
                            console.error(error);
                        }

                        setName('');
                        setEmail('');
                        setPhone('');
                        setShippingAddress('');
                        setDeliveryDate('');
                        // window.location.reload();
                        navigate(-1);

                    }).catch(err => {
                        console.log('orders | err ' + JSON.stringify(err));
                        showToast('Order not created due to some network error. please try again later.', true);
                    })
            }).catch(err => {
                console.log('orders producs | err :' + err);
            })

    }

    

    useEffect(() => {
        console.log('====================================');
        console.log(userDetails);
        console.log('====================================');

        if (userDetails.user_details_exist) {
            setName(userDetails.user_name);
            setPhone(userDetails.user_phone);
            setEmail(userDetails.user_email);
            setShippingAddress(userDetails.user_shipping_address)
        }
    }, [userDetails])

    return (
        <div>
            <h1 className=' text-xl md:text-3xl mt-8 text-center font-bold'>Fill the Details to place the order</h1>
            <form className='w-90 md:w-1/2 mx-auto border-2 border-black rounded-lg p-9 m-5' onSubmit={(e) => handleSubmit(e)} >

                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                    <input type="text" value={name} onChange={(e) => handleChange(e)} id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John deo" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input type="email" value={email} onChange={(e) => handleChange(e)} id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="johndeo@gmail.com" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                    <input type="text" value={phone} onChange={(e) => handleChange(e)} id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="9992213234" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="shippingAddress" className="block mb-2 text-sm font-medium text-gray-900 ">Shiping Address</label>
                    <input type="text" value={shippingAddress} onChange={(e) => handleChange(e)} id="shippingAddress" name='shippingAddress' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Addresss" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="deliveryDate" className="block mb-2 text-sm font-medium text-gray-900 ">Delivery Date</label>
                    <input type="date" value={deliveryDate} onChange={(e) => handleChange(e)} id="deliveryDate" name='deliveryDate' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Delivery Date" required />
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