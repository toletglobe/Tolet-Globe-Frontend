import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  userData: {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
    properties: [],
  },
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
        id: action.payload.userData.id,
        firstName: action.payload.userData.firstName,
        lastName: action.payload.userData.lastName,
        email: action.payload.userData.email,
        role: action.payload.userData.role,
        profilePicture: action.payload.userData.profilePicture, // Add profilePicture field
        properties: action.payload.userData.properties || [], // Include properties safely
      };
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
      state.userData = {...initialState.userData};
    },
    updateProfilePicture(state, action) {
      // Update the profile picture in the state
      state.userData.profilePicture = action.payload;
    },

  },
});

export const { login, logout, updateProfilePicture } = authSlice.actions;

export default authSlice.reducer;
