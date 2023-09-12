import React, { useEffect, useState } from 'react'
import { AppwriteConfig } from '../appwrite/appWriteConfig'
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

  if(isLoading){
    return <Loader />
  }

  return (<div>

    <h1 className='text-center text-3xl font-semibold mt-12'>Your Orders are here.</h1>
    <div className='flex flex-col md:flex-row flex-wrap p-4'>
      {orders?.map(order => {
        console.log(order);
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
      })}

    </div>
  </div>
  )
}

export default Orders