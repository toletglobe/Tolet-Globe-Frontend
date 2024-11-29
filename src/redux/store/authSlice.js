import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  userData: {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: '', // Default empty profile picture
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.token = action.payload.token; // Save token if needed
      state.userData = {
        ...action.payload.userData, // Directly spread userData to avoid repetitive assignments
        profilePicture: action.payload.userData.profilePicture || '', // Ensure profilePicture fallback
      };
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
      state.userData = {
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        profilePicture: '', // Reset profilePicture
      };
    },
    updateProfilePicture: (state, action) => {
      if (state.userData) {
        state.userData.profilePicture = action.payload || ''; // Update profile picture or reset to empty
      }
    },
  },
});

export const { login, logout, updateProfilePicture } = authSlice.actions;

export default authSlice.reducer;
