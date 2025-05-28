import { useState } from "react";
import toast from "react-hot-toast";

// import { FaSchool } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import "./ForgotPassword.css";

import { API } from "../../config/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  //form funtion
  const handleSubmit = async (e) => {
    e.preventDefault(); //to prevent refreshing of the page while submitting the register form
    try {
      const res = await API.post("auth/forgot-password", {
        email,
        // answer,
      });

      if (res.status === 200) {
        console.log(res.data.link);
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000); //
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="reset_form_container relative mx-auto  my-40 w-[400px] h-[470px] max-w-[400px] max-h-[650px] bg-black rounded-[50px_5px] flex items-center justify-center overflow-hidden">
          <div className="absolute bg-black rounded-[50px_5px] inset-1 p-[50px_40px] z-10 text-white">
            <h3 className="text-2xl font-semibold text-center">
              FORGOT PASSWORD
            </h3>
            <div className="mt-10 relative flex items-center justify-start">
              <AiOutlineMail className="ml-3 text-white " />
              <input
                type="email"
                className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
                placeholder="Email"
                autoComplete="off"
                id="exampleInputEmail1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* <div className="mt-10 relative flex items-center justify-start">
              <FaSchool className="ml-3 text-white" />
              <input
                type="text"
                className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
                placeholder="Your first School"
                autoComplete="off"
                id="exampleInputEmail1"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div> */}
            <div className="relative w-[300px] h-[40px] mt-[70px] transition-all duration-1000">
              <button
                type="submit"
                className="absolute w-full h-full text-xl tracking-wider border border-[#C8A217] rounded-full bg-black flex items-center justify-center text-white hover:bg-[#C8A217]"
              >
                SEND RESET LINK
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
