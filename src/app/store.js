import { configureStore } from '@reduxjs/toolkit'
import carReducer from './../features/cart/cartSlice';
import adReducer from './../features/admin/adminSlice';
const store  =configureStore ({
    reducer:{
        cart:  carReducer,
        admin: adReducer
    }
})
export default store;
 