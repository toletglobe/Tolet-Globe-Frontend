import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
     // console.log('action.payload:', action.payload);
      state.status = true;
      state.token = action.payload.token;
      state.userData = {
        username : action.payload.userData.username,
        email : action.payload.userData.email,
        role : action.payload.userData.role,
      }
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
      state.userData = null;
    },
  },
});


export const { login, logout } = authSlice.actions;

export default authSlice.reducer;