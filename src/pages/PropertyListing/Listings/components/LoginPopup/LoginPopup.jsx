import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../../../redux/store/authSlice";
import { FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import "./LoginPopup.css";
import { API } from "../../../../../config/axios";

const LoginPopup = ({ onClose, setUserInfo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const data = res.data;

      if (res.status === 200 && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("User ", data.user.role);
        localStorage.setItem("userType", data.user.userType);
        localStorage.setItem("userId", data.user.id);

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
        onClose(); // Close the popup after successful login
      } else {
        toast.error(data?.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-black p-6 rounded-lg shadow-lg">
      <button 
        onClick={onClose} 
        className=" text-white text-right"
        style={{
          position:"relative",
          display:"block",
          margin:"-2% 5% 2% 95%"
        }}
      >X
      </button>
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
    </div>
  );
};

export default LoginPopup;
