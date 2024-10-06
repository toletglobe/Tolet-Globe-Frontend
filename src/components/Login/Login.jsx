import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { API } from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

const Login = () => {
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
      const res = await API.post("auth/login", {
        email,
        password,
      });

      //     console.log(res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        dispatch(
          login({
            token: res.data.token,
            userData: {
              firstName: res.data.user.firstName,
              email: res.data.user.email,
              role: res.data.user.role,
            },
          })
        );
        toast.success("Login success");
        navigate("/landlord-dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error.response.data);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="login_form_container mx-auto my-24 relative w-[400px] h-[470px] max-w-[400px] max-h-[470px] bg-black rounded-tl-[50px] rounded-br-[50px] rounded-tr-[5px] rounded-bl-[5px] flex items-center justify-center overflow-hidden xl:ml-[550px] before:before_login_form_container after:after_login_form_container">
          <div className="login_form absolute bg-black rounded-tl-[50px] rounded-br-[50px] rounded-tr-[5px] rounded-bl-[5px] inset-[5px] py-[50px] px-[40px] z-10 text-white">
            <h2 className="text-[40px] font-semibold text-center">Login</h2>
            <div className="input_group mt-[40px] relative flex items-center justify-start">
              <AiOutlineMail className="ml-3 text-white text-[20px]" />
              <input
                type="email"
                placeholder="Email"
                className="input_text w-[95%] h-[30px] bg-transparent border-0 outline-0 border-b border-solid border-white text-[20px] pl-[10px] text-white placeholder:text-[15px] placeholder:text-white placeholder:tracking-[1px]"
                autoComplete="off"
                id="exampleInputEmail1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input_group mt-[40px] relative flex items-center justify-start">
              <FaLock className="ml-3 text-white text-[20px]" />
              <input
                type="password"
                placeholder="Password"
                className="input_text w-[95%] h-[30px] bg-transparent border-0 outline-0 border-b border-solid border-white text-[20px] pl-[10px] text-white placeholder:text-[15px] placeholder:text-white placeholder:tracking-[1px]"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="exampleInputPassword1"
                required
              />
            </div>
            <div className="button_group relative w-[300px] h-[40px] duration-[1s] mt-[70px]" id="login_button">
              <button type="submit" onSubmit={handleSubmit} className="absolute w-full h-full no-underline z-10 cursor-pointer text-[22px] border border-solid border-[#c8a217] rounded-[50px] bg-black flex justify-center items-center text-white hover:bg-[#c8a217]">
                LOGIN
              </button>
            </div>
            <div className="fotter mt-[30px] flex justify-between">
              <a className="no-underline cursor-pointer text-[18px] text-[#3cbdb1]" onClick={() => navigate("/forgot-password")}>
                Forgot Password ?
              </a>
              <a className="no-underline cursor-pointer text-[18px] text-[#3cbdb1]" onClick={() => navigate("/register")}>Register</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
