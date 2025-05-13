import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/store/authSlice";

import { FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

import "./Login.css";

import { API } from "../../config/axios";

const Login = ({ setUserInfo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFocus = (e) => {
    e.target.previousElementSibling.classList.add("glowIcon");
  };

  const handleBlur = (e) => {
    e.target.previousElementSibling.classList.remove("glowIcon");
  };

  const inputs = document.querySelectorAll(".input_text");
  inputs.forEach((input) => {
    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the POST request using fetch
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      // Parse the response as JSON
      const data = await res.json();
  
      // Check if the response is successful and contains a token
      if (res.ok && data.token) {
        // Store the necessary information in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("User", data.user.role);
        localStorage.setItem("userType", data.user.userType);
        localStorage.setItem("userId", data.user.id);
  
        // Dispatch the login action with the user data
        dispatch(
          login({
            token: data.token,
            userData: {
              id: data.user.id,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
              role: data.user.role,
              profilePicture: data.user.profilePicture,
            },
          })
        );
  
        toast.success("Login success");
        navigate("/landlord-dashboard");
      } else {
        // Show error message if the login is unsuccessful
        toast.error(data?.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };
  

  return (
    <div className="w-full min-h-screen flex justify-center items-center pb-20">
      <form onSubmit={handleSubmit}>
        <div className="login_form_container">
          <div className="login_form">
            <h2 className="text-2xl font-semibold">Login</h2>
            <div className="input_group">
              <AiOutlineMail className="ml-3 text-white " />
              <input
                type="email"
                placeholder="Email"
                className="input_text"
                autoComplete="off"
                id="exampleInputEmail1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input_group">
              <FaLock className="ml-3 text-white" />
              <input
                type="password"
                placeholder="Password"
                className="input_text"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="exampleInputPassword1"
                required
              />
            </div>
            <div className="button_group" id="login_button">
              <button type="submit" onSubmit={handleSubmit}>
                LOGIN
              </button>
            </div>
            <div className="fotter">
              <a onClick={() => navigate("/forgot-password")}>
                Forgot Password ?
              </a>
              <a onClick={() => navigate("/register")}>Register</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
