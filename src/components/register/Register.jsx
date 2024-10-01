import { useState } from "react";
import "./Register.css";
import {
  FaUser,
  FaLock,
  FaPhoneAlt,
  FaRegAddressCard,
  FaSchool,
} from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API } from "../../config/axios";

const Register = () => {
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [userType, setUserType] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    if (e.target.value !== "user") {
      setUserType("");
    }
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const resetFields = () => {
    setFirstName(""); 
    setLastName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setRole("");
    setUserType("");
    setAnswer("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent refreshing of the page while submitting the form
    try {
      const res = await API.post("auth/register", {
        firstName,
        lastName,
        email,
        password,
        phone,
        role,
        userType,
        answer,
      });
      console.log(res.data);
      if (res.data) {
        resetFields();
        toast.success(res.data);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="register_form_container relative flex items-center justify-center my-10 overflow-hidden w-[360px] h-[auto] max-w-[360px] bg-black rounded-[30px_5px] mx-auto">
      <div className="relative bg-black rounded-[30px_5px] p-[30px] text-white z-10 border-4 border-transparent">
        <h2 className="text-3xl font-semibold text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-6 flex items-center">
            <FaUser className="ml-2 text-white" />
            <input
              type="text"
              placeholder="First Name"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-base outline-none"
              autoComplete="off"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="mt-6 flex items-center">
            <FaUser className="ml-2 text-white" />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-base outline-none"
              autoComplete="off"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="mt-6 flex items-center">
            <AiOutlineMail className="ml-2 text-white" />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-base outline-none"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-6 flex items-center">
            <FaLock className="ml-2 text-white" />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-base outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mt-6 flex items-center">
            <FaPhoneAlt className="ml-2 text-white" />
            <input
              type="number"
              placeholder="Phone Number"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-base outline-none"
              autoComplete="off"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mt-6 flex items-center">
            <FaRegAddressCard className="ml-2 text-white" />
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="w-full h-8 bg-black border-b border-white text-[#3CBDB1] pl-2 text-base outline-none"
            >
              <option value="" disabled className="text-[#3CBDB1]">
                Select Role
              </option>
              <option value="admin" className="text-[#3CBDB1]">
                Admin
              </option>
              <option value="content creator" className="text-[#3CBDB1]">
                Content Creator
              </option>
              <option value="user" className="text-[#3CBDB1]">
                User
              </option>
            </select>
          </div>

          {role === "user" && (
            <div className="mt-6 flex items-center">
              <FaSchool className="ml-2 text-white" />
              <select
                id="userType"
                value={userType}
                onChange={handleUserTypeChange}
                className="w-full h-8 bg-black border-b border-white text-[#3CBDB1] pl-2 text-base outline-none"
              >
                <option value="" disabled className="text-[#3CBDB1]">
                  Select User Type
                </option>
                <option value="buyer" className="text-[#3CBDB1]">
                  Buyer
                </option>
                <option value="tenant" className="text-[#3CBDB1]">
                  Tenant
                </option>
                <option value="owner" className="text-[#3CBDB1]">
                  Owner
                </option>
              </select>
            </div>
          )}

          <div className="mt-6 flex items-center">
            <FaSchool className="ml-2 text-white" />
            <input
              type="text"
              placeholder="Your first School"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-base outline-none"
              autoComplete="off"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>

          <div className="relative w-[280px] h-[30px] mt-[50px] transition-all">
            <button
              type="submit"
              className="absolute w-full h-full text-lg tracking-wider border border-[#C8A217] rounded-full bg-black flex items-center justify-center text-white hover:bg-[#C8A217]"
            >
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
