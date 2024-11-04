import { FaLock, FaSchool } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import toast from "react-hot-toast";
import { useState } from "react";
import { API } from "../../config/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/forgot-password", {
        email,
        answer,
      });
      if (res.data) {
        console.log(res.data.link);
        toast.success(res.data && res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  const animationStyles = `
    @keyframes rotate_border {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <style>{animationStyles}</style>
      <form onSubmit={handleSubmit} className="w-full max-w-md px-5">
        <div className="relative w-full p-10 rounded-[50px_5px] flex flex-col justify-center overflow-hidden bg-black shadow-lg">
          <div 
            style={{
              position: 'absolute',
              width: '150%',
              height: '150%',
              top: '-25%',
              left: '-25%',
              background: 'conic-gradient(transparent, transparent, transparent, #3cbdb1)',
              animation: 'rotate_border 6s linear infinite',
            }}
          ></div>
          <div 
            style={{
              position: 'absolute',
              width: '150%',
              height: '150%',
              top: '-25%',
              left: '-25%',
              background: 'conic-gradient(transparent, transparent, transparent, #c8a217)',
              animation: 'rotate_border 6s linear infinite',
              animationDelay: '-3s',
            }}
          ></div>
          <div className="absolute inset-1 bg-black rounded-[50px_5px] p-[43px_40px] text-white z-10 min-h-[250px]"></div>
          <div className="z-10 text-white relative">
            <h3 className="text-2xl font-semibold text-center mb-10">
              FORGOT PASSWORD
            </h3>
            <div className="mt-10 relative flex items-center justify-start">
              <AiOutlineMail className="ml-3 text-white" />
              <input
                type="email"
                className="w-full h-8 bg-transparent border-b border-white text-white placeholder-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
                placeholder="Email"
                autoComplete="off"
                id="exampleInputEmail1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-10 relative flex items-center justify-start">
              <FaSchool className="ml-3 text-white" />
              <input
                type="text"
                className="w-full h-8 bg-transparent border-b border-white text-white placeholder-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
                placeholder="Your first School"
                autoComplete="off"
                id="exampleInputEmail1"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <div className="relative w-full max-w-[300px] h-10 mt-12 mx-auto transition duration-1000">
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