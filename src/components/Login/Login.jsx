import React, { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const inputs = document.querySelectorAll(".input_text");
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, []);

  const handleFocus = (e) => {
    e.target.previousElementSibling.classList.add("glowIcon");
  };

  const handleBlur = (e) => {
    e.target.previousElementSibling.classList.remove("glowIcon");
  };

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
    <div className="reset_form_container relative flex items-center justify-center my-10 overflow-hidden w-[400px] h-[470px] max-w-[400px] max-h-[470px] bg-black rounded-[50px_5px] mx-auto mt-16 mb-16">
      <div className="absolute inset-0 w-[190%] h-[190%] bg-[conic-gradient(transparent,transparent,transparent,#C8A217)] animate-rotate-border"></div>
      <div className="absolute inset-0 w-[190%] h-[190%] bg-[conic-gradient(transparent,transparent,transparent,#3CBDB1)] animate-rotate-border animate-delay-[-3s]"></div>
      <div className="relative bg-black rounded-[50px_5px] p-[50px_40px] text-white z-10 min-h-[450px]">
        <h2 className="text-4xl font-semibold text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-10 flex items-center">
            <AiOutlineMail className="ml-3 text-white" />
            <input
              type="email"
              placeholder="Email"
              className="input_text w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-10 flex items-center">
            <FaLock className="ml-3 text-white" />
            <input
              type="password"
              placeholder="Password"
              className="input_text w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="relative w-[300px] h-[40px] mt-[70px] transition-all">
            <button
              type="submit"
              className="absolute w-full h-full text-xl tracking-wider border border-[#C8A217] rounded-full bg-black flex items-center justify-center text-white hover:bg-[#C8A217]"
            >
              LOGIN
            </button>
          </div>
          <div className="flex justify-between mt-[30px] fotter">
            <a
              onClick={() => navigate("/forgot-password")}
              className="no-underline cursor-pointer text-lg text-[#3cbdb1]"
            >
              Forgot Password?
            </a>
            <a
              onClick={() => navigate("/register")}
              className="no-underline cursor-pointer text-lg text-[#3cbdb1]"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
