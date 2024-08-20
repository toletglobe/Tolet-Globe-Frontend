import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { API } from "../../config/axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      const res = await API.post("/api/v1/auth/login", {
        email,
        password,
      });

      console.log(res.data);

      if (res.data) {
        localStorage.setItem("token", res.data);
        toast.success("Login success");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="form-container h-[90vh]">
      <form onSubmit={handleSubmit}>
        <div className="login_form_container">
          <div className="login_form">
            <h2>Login</h2>
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
