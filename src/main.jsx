import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StateProvider } from "./StateProvider";
import { initialState } from "./reducer";
import { reducer } from "./reducer";
import { GoogleOAuthProvider } from "@react-oauth/google";

// 👉 Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID =  import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
