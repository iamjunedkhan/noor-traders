import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import CartItem from './CartItem'
import OrderForm from './OrderForm';


const Cart = () => {
  const cart = useSelector(state => state.cart);
  console.log('cart is ');
  console.log(cart);
  const [showOrderDetailsForm, setShowOrderDetailsForm] = useState(false);

  const toggleShowOrderDetailsForm = () => {
    setShowOrderDetailsForm(!showOrderDetailsForm)
  }
  if (showOrderDetailsForm) {
    return <OrderForm toggleShowOrderDetailsForm={toggleShowOrderDetailsForm} />
  } else {
    return (
      <section class="text-gray-600 body-font min-h-80">
        <div class="container px-5 py-24 mx-auto flex-col items-center">
          <div class="text-center mb-8">
            <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">Your Cart Items Here</h1>
          </div>
          <div class="flex flex-col items-center lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            {cart.products.length === 0 && <h1 className='text-xl'>Currently Cart is empty. Go To shop and add items.</h1>}
            {cart.products.map((prod, index) => {
              console.log(prod);
              return <CartItem key={prod.product_name} id={prod.id} product_name={prod.product_name} quantity={prod.quantity} index={index + 1} />
            })}
          </div>
          {cart.products.length > 0 && <button class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => toggleShowOrderDetailsForm()}>Order Now</button>}

        </div>
      </section>
    )
  }

}

export default Cart