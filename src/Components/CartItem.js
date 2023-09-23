import React from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { HiMinusCircle } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { modifyQuantity, removeItem } from '../features/cart/cartSlice';



const CartItem = ({ index, product_name, quantity, id,desc,mrp }) => {
    const dispatch = useDispatch();
    return (
        <div class="p-2 md:w-1/2 w-full">
            <div className='bg-gray-200 p-3 rounded-lg'>

                <div class="bg-gray-200 rounded flex p-4 h-full items-center justify-between">
                    <div>
                        <span class="title-font font-medium mx-2">{index}.</span>
                        <span class="title-font font-medium">{product_name}({desc}) [{mrp}rs]</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <span class="title-font font-medium"><HiMinusCircle className='text-xl md:text-2xl text-indigo-600' onClick={() => dispatch(modifyQuantity({ id: id, pay: -1 }))} /></span>
                        <span class="title-font font-medium">{quantity}</span>
                        <span class="title-font font-medium"><IoIosAddCircle className='text-xl md:text-2xl text-indigo-600' onClick={() => dispatch(modifyQuantity({ id: id, pay: 1 }))} /></span>
                    </div>
                </div>
                <button class="inline-flex text-white bg-indigo-500 border-0 py-1 px-3 ml-8 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => dispatch(removeItem(id))}>Remove</button>
            </div>

        </div>)
}

export default CartItem