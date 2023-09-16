import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_name: null,
    user_email: null,
    user_phone: null,
    user_details_exist:false,
    user_shipping_address:null

}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initializeUserDetails: (state, action) => {
            // initialize user details 
           state.user_email= action.payload.user_email
           state.user_name= action.payload.user_name
           state.user_phone=action.payload.user_phone
           state.user_details_exist = action.payload.user_details_exist
           state.user_shipping_address=action.payload.user_shipping_address
        },
        updateUserDetails: (state) => {
            // updateUserDetils 
            state.is_logged_in = false;
            state.admin_email = null;
            state.admin_name = null;

        }

    }
})

export default userSlice.reducer
export const {initializeUserDetails,updateUserDetails } = userSlice.actions 