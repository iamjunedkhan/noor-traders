import React, { useEffect, useState } from 'react'
import { AppwriteConfig } from '../appwrite/appWriteConfig'
import { EmptyComponent } from '../Components';
import Loader from '../Components/Loader';
import OrderCard from './OrderCard'

const appWriteObj = new AppwriteConfig();
const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    appWriteObj.databases.listDocuments(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_ORDERS)
      .then(res => {
        console.log('the orders is:res ');
        console.log(res.documents);
        setOrders(res.documents)
        setIsLoading(false);
      }).catch(err => {
        console.log('order page err:' + err);
        setIsLoading(false);
      })


  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (<div className='my-4'>

    <h1 className='text-center text-3xl font-semibold mt-12'>Your Orders are here.</h1>
    <h1 className='text-2xl font-bold mx-12 heading_2bar mt-8'>New Orders</h1>
    <div className='flex flex-col md:flex-row flex-wrap px-4'>
      {/* showing new orders */}
      {orders?.map(order => {
        console.log(order);
        if (order.order_status.toLowerCase() === 'new')
          return <OrderCard key={order.$id}
            order_id={order.$id}
            created_date={order.$createdAt}
            customer_name={order.customer_name}
            customer_email={order.customer_email}
            customer_phone={order.customer_phone}
            products_id={order.products_id}
            delivery_date={order.delivery_date}
            order_status={order.order_status}
            shipping_address={order.shipping_address}
          />
          return <EmptyComponent />
      })}

    </div>


    <h1 className='text-2xl font-bold mx-12 heading_2bar mt-8'>Pending Orders</h1>
    <div className='flex flex-col md:flex-row flex-wrap px-4'>
      {/* showing new orders */}
      {orders?.map(order => {
        console.log(order);
        if (order.order_status.toLowerCase() === 'pending')
          return <OrderCard key={order.$id}
            order_id={order.$id}
            created_date={order.$createdAt}
            customer_name={order.customer_name}
            customer_email={order.customer_email}
            customer_phone={order.customer_phone}
            products_id={order.products_id}
            delivery_date={order.delivery_date}
            order_status={order.order_status}
            shipping_address={order.shipping_address}
          />

          return <EmptyComponent />
      })}

    </div>

    <h1 className='text-2xl font-bold mx-12 heading_2bar mt-8'>Completed Orders</h1>
    <div className='flex flex-col md:flex-row flex-wrap px-4'>
      {/* showing new orders */}
      {orders?.map(order => {
        console.log(order);
        if (order.order_status.toLowerCase() === 'complete')
          return <OrderCard key={order.$id}
            order_id={order.$id}
            created_date={order.$createdAt}
            customer_name={order.customer_name}
            customer_email={order.customer_email}
            customer_phone={order.customer_phone}
            products_id={order.products_id}
            delivery_date={order.delivery_date}
            order_status={order.order_status}
            shipping_address={order.shipping_address}
          />

          return <EmptyComponent />
      })}

    </div>


    <h1 className='text-2xl font-bold mx-12 heading_2bar mt-8'>Cancled Orders</h1>
    <div className='flex flex-col md:flex-row flex-wrap px-4'>
      {/* showing new orders */}
      {orders?.map(order => {
        console.log(order);
        if (order.order_status.toLowerCase() === 'cancle')
          return <OrderCard key={order.$id}
            order_id={order.$id}
            created_date={order.$createdAt}
            customer_name={order.customer_name}
            customer_email={order.customer_email}
            customer_phone={order.customer_phone}
            products_id={order.products_id}
            delivery_date={order.delivery_date}
            order_status={order.order_status}
            shipping_address={order.shipping_address}
          />

          return <EmptyComponent />
      })}

    </div>
    
  </div>
  )
}

export default Orders