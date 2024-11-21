import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import "./Style.css"

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

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        dispatch(
          login({
            token: res.data.token,
            userData: {
              id: res.data.user.id,
              firstName: res.data.user.firstName,
              lastName: res.data.user.lastName,
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
    <div className="flex justify-center items-center bg-black h-screen">
      <form onSubmit={handleSubmit} className="login_form_container relative w-[400px] max-w-md h-[470px] bg-black rounded-[50px_5px] flex items-center justify-center overflow-hidden group">
        <div className="absolute w-[170%] h-[170%]  "></div>
        <div className="absolute w-[170%] h-[170%]   "></div>
        <div className="absolute bg-black p-10 rounded-[50px_5px] z-10 text-white inset-1">
          <h2 className="text-1xl font-normal text-center">Login</h2>
          <div className="mt-10 ">
            <div className="relative flex items-center">
            <AiOutlineMail className="ml-3 text-white" />
            <input
              type="email"
              placeholder="Email"
              className="w-[95%] h-10 bg-transparent border-b-[1px] border-white outline-none text-white text-sm pl-3 placeholder:text-grey-400 transition duration-200"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />  
            </div>
            <div className="relative flex items-center mt-10">
            <FaLock className="ml-3 text-white " />
            <input
              type="password"
              placeholder="Password"
              className="w-[95%] h-8 bg-transparent border-b-[1px] border-white outline-none text-white text-sm pl-3 placeholder:text-grey-400  transition duration-200"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>
          </div>

          <div className="mt-14 w-full">
            <button
              type="submit"
              className="w-full h-10 text-white bg-black border border-[#C8A217] rounded-full text-2xl flex justify-center items-center hover:bg-[#C8A217] transition-all"
            >
              LOGIN
            </button>
          </div>

          <div className="mt-8 flex justify-between">
            <a
              onClick={() => navigate("/forgot-password")}
              className="text-[#3CBDC1] text-lg cursor-pointer"
            >
              Forgot Password ?
            </a>
            <a
              onClick={() => navigate("/register")}
              className="text-[#3CBDC1] text-lg cursor-pointer"
            >
              Register
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
