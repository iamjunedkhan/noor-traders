import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin_name: null,
    admin_email: null,
    is_logged_in: false

}
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        login: (state, action) => {
            // login admin 
            state.is_logged_in = true;
            state.admin_email = action.payload.admin_email
            state.admin_name = action.payload.admin_name
        },

        logout: (state) => {
            // logout admin 
            state.is_logged_in = false;
            state.admin_email = null;
            state.admin_name = null;

        }

    }
})

export default adminSlice.reducer
export const { login, logout } = adminSlice.actions 