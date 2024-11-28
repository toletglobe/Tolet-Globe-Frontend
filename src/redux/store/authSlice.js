import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  userData: null,
  profilePicture: '',

};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      profilePicture: '',
    }
  },
  reducers: {
    login: (state, action) => {
      // console.log('action.payload:', action.payload);
      state.status = true;
      state.userData = {
        id: action.payload.userData.id,
        lastName: action.payload.userData.lastName,
        firstName: action.payload.userData.firstName,
        email: action.payload.userData.email,
        role: action.payload.userData.role,
        profilePicture: action.payload.userData.profilePicture, // Add profilePicture field
      };
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
      state.userData = null;
    },
    updateProfilePicture(state, action) {
      // Update the profile picture in the state
      state.userData.profilePicture = action.payload;
    },

  },
});

export const { login, logout, updateProfilePicture } = authSlice.actions;

export default authSlice.reducer;
