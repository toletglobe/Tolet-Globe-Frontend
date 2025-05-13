import React, { useState } from "react";
import "./ResetPassword.css";
import { FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

import { API } from "../../config/axios";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        return toast.error("Invalid submission");
      }

      if (password !== confirmPassword) {
        return toast.error("Passwords doesn't match");
      }

      const res = await API.post("/auth/reset-password", {
        token,
        password,
      });
      console.log(res.data);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000); //
    } catch (err) {
      console.error("Err: ", err);
      toast.error(err.data.message);
    }
  };

  return (
    <div className="form-container h-[90vh]">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="reset_form_container relative mt-24  ml-[550px] w-[400px] h-[470px] max-w-[400px] max-h-[650px] bg-black rounded-[50px_5px] flex items-center justify-center overflow-hidden">
          <div className="absolute bg-black rounded-[50px_5px] inset-1 p-[50px_40px] z-10 text-white">
            <h3 className="text-2xl font-semibold text-center">
              RESET PASSWORD
            </h3>
            <div className="mt-10 relative flex items-center justify-start">
              <FaLock className="ml-3 text-white " />
              <input
                type="password"
                className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
                placeholder="New password"
                autoComplete="off"
                id="newpassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-10 relative flex items-center justify-start">
              <FaLock className="ml-3 text-white" />
              <input
                type="password"
                className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
                placeholder="Confirm new password"
                autoComplete="off"
                id="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="relative w-[300px] h-[40px] mt-[70px] transition-all duration-1000">
              <button
                type="submit"
                className="absolute w-full h-full text-xl tracking-wider border border-[#C8A217] rounded-full bg-black flex items-center justify-center text-white hover:bg-[#C8A217]"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
