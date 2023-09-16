import { configureStore } from '@reduxjs/toolkit'
import carReducer from './../features/cart/cartSlice';
import adReducer from './../features/admin/adminSlice';
import userReducer from './../features/user/userSlice';
const store  =configureStore ({
    reducer:{
        cart:  carReducer,
        admin: adReducer,
        user:userReducer
    }
})
export default store;
 