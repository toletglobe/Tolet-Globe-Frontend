import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";  //Default to localStorage
import authSlice from "./authSlice";


// Configure redux-presist
const persistConfig = {
  key: "auth",  //Key for storage
  storage,  //Use localStorage
}

const persistedReducer = persistReducer(persistConfig, authSlice);

// export const store = configureStore
export const store = configureStore({
  reducer: {
    auth: persistedReducer,  //Use the persistedReducer for auth
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}) // Ignore serialization warnings from redux-persist

});

// Create the persistor
export const persistor = persistStore(store);
