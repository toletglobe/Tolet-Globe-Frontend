import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/store/authSlice";

import { FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import GoogleOAuthBar from "../Register/GoogleOAuth/GoogleOAuthBar";
import "./Login.css";

import { API } from "../../config/axios";

const Login = ({ setUserInfo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from || "/landlord-dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoggingIn(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Parse the response as JSON
      const data = res.data;

      // Check if the response is successful and contains a token
      if (res.status === 200 && data.token) {
        // Store the necessary information in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("properties", data.user.properties);

        // Dispatch the login action with the user data
        dispatch(
          login({
            token: data.token,
            userData: {
              id: data.user.id,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
              profilePicture: data.user.profilePicture,
              properties: [],
            },
          })
        );

        toast.success("Login success");

        navigate(from, { replace: true });
      } else {
        // Show error message if the login is unsuccessful
        toast.error(data?.message || "Login failed");
        setLoggingIn(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
      setLoggingIn(false);
    }
  };

  return (
    <div
      className={`login_form_container relative flex items-center justify-center my-10 overflow-hidden w-[400px] max-w-[400px] max-h-[485px] bg-black rounded-[50px_5px] mx-auto mt-16 mb-16`}
    >
      <div className="absolute inset-1 bg-black rounded-[50px_5px] pt-11 px-10 text-white z-10 border-4 border-transparent">
        <h2 className="text-4xl font-semibold text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mt-10 flex items-center">
            <AiOutlineMail className="ml-3 text-white" />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mt-10 flex items-center">
            <FaLock className="ml-3 text-white" />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loggingIn}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="w-[100%] max-w-[300px] h-[40px] text-xl tracking-wider border border-[#C8A217] rounded-full bg-black flex items-center justify-center text-white hover:bg-[#C8A217]"
            >
              {loggingIn ? "LOGGING IN..." : "LOGIN"}
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex justify-between gap-10 mt-6 text-[#3cbdb1] cursor-pointer">
            <a onClick={() => navigate("/forgot-password")}>Forgot Password?</a>
            <a onClick={() => navigate("/register")}>Register</a>
          </div>
          {/* Divider with "or" text - made more visible */}
          <div className="relative flex items-center justify-center my-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          {/* Google OAuth Button - ensure it's properly styled */}
          <div className="flex justify-center mb-6 w-full">
            <GoogleOAuthBar
              className="w-full max-w-[300px]"
              buttonClassName="w-full h-[40px] flex items-center justify-center bg-white text-black rounded-full border border-white hover:bg-gray-100"
              iconClassName="mr-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
