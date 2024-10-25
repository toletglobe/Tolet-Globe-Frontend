import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login", {
        email,
        password,
      });

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
    <div className="flex justify-center items-center min-h-screen bg-black px-4">
      <div className="relative w-full max-w-md h-[470px] bg-black rounded-[50px_5px] flex items-center justify-center overflow-hidden mt-16 mx-auto">
        <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(transparent,_transparent,_transparent,_#3cbdb1)] animate-rotate_border"></div>
        <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(transparent,_transparent,_transparent,_#c8a217)] animate-rotate_border" style={{ animationDelay: "-3s" }}></div>
        <div className="absolute inset-1 bg-black rounded-[50px_5px] p-[43px_40px] text-white z-10 min-h-[350px] border-4 border-transparent"></div>
        <form className="absolute bg-black rounded-[50px_5px] inset-5 p-6 sm:p-12 z-10 text-white" onSubmit={handleSubmit}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-center">Login</h2>
          <div className="mt-6 sm:mt-10 flex items-center justify-start relative">
            <AiOutlineMail className="ml-3 text-white" />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[30px] bg-transparent border-b border-white outline-none text-lg sm:text-xl pl-10 text-white placeholder:text-white placeholder:opacity-60"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-6 sm:mt-10 flex items-center justify-start relative">
            <FaLock className="ml-3 text-white" />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-[30px] bg-transparent border-b border-white outline-none text-lg sm:text-xl pl-10 text-white placeholder:text-white placeholder:opacity-60"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="relative w-full h-[40px] transition-all mt-8 sm:mt-16">
            <button className="absolute w-full h-full text-decoration-none z-10 cursor-pointer text-lg sm:text-2xl tracking-wider border border-[#c8a217] rounded-full bg-black flex justify-center items-center text-white hover:bg-[#c8a217]">
              LOGIN
            </button>
          </div>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between">
            <a onClick={() => navigate("/forgot-password")} className="text-[#3cbdb1] text-sm sm:text-lg mb-2 sm:mb-0">Forgot Password?</a>
            <a onClick={() => navigate("/register")} className="text-[#3cbdb1] text-sm sm:text-lg"> Register</a>
          </div>
        </form>
      </div>
      <style>
        {`
          @keyframes rotate-border {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .animate-rotate_border {
            animation: rotate-border 6s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Login;