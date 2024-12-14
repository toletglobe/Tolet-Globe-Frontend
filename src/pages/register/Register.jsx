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
  const [userType, setUserType] = useState("buyer");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleRoleChange = (e) => {
    setRole(e.target.value);
    if (e.target.value !== "user" && userType !== "owner") setUserType("owner");
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
    e.preventDefault();
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
      console.log(res);
      if (res.data) {
        resetFields();
        toast.success("Check email for verification link");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      toast.error("Registration failed");
      console.log(error.response.data);
    }
  };

  return (
    <div
      className={`register_form_container relative flex items-center justify-center my-10 overflow-hidden ${
        role === "user" ? "h-[785px]" : "h-[700px]"
      } w-[400px]  max-w-[400px] max-h-[785px] bg-black rounded-[50px_5px] mx-auto mt-16 mb-16 `}
    >
      <div className="absolute inset-1 bg-black rounded-[50px_5px] p-[43px_40px] text-white z-10 min-h-[650px] border-4 border-transparent">
        {" "}
        <h2 className="text-4xl font-semibold text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="mt-10 flex items-center">
            <FaUser className="ml-3 text-white" />
            <input
              type="text"
              placeholder="First Name"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
              autoComplete="off"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name Field */}
          <div className="mt-10 flex items-center">
            <FaUser className="ml-3 text-white" />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
              autoComplete="off"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mt-10 flex items-center">
            <AiOutlineMail className="ml-3 text-white" />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
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
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-10 flex items-center">
            <FaPhoneAlt className="ml-3 text-white" />
            <input
              type="number"
              placeholder="Phone Number"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
              autoComplete="off"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mt-10 flex items-center">
            <FaRegAddressCard className="ml-3 text-white" />
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="w-full h-8 text-sm bg-black border-b border-white text-[#3CBDB1] placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 outline-none"
            >
              <option value="" disabled className="text-[#3CBDB1] text-sm">
                Select Role
              </option>
              <option value="admin" className="text-[#3CBDB1] text-sm">
                Admin
              </option>
              <option
                value="content creator"
                className="text-[#3CBDB1] text-sm"
              >
                Content Creator
              </option>
              <option value="user" className="text-[#3CBDB1] text-sm">
                User
              </option>
            </select>
          </div>
          {role === "user" && (
            <div className="mt-10 flex items-center">
              <FaSchool className="ml-3 text-white" />
              <select
                id="userType"
                value={userType}
                onChange={handleUserTypeChange}
                className="w-full h-8 bg-black border-b border-white text-[#3CBDB1] placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-sm outline-none"
              >
                <option disabled className="text-[#3CBDB1]">
                  Select User Type
                </option>
                <option value="buyer" selected className="text-[#3CBDB1]">
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
          <div className="mt-10 flex items-center">
            <FaSchool className="ml-3 text-white" />
            <input
              type="text"
              placeholder="Your first School"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
              autoComplete="off"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <div className="relative w-[300px] h-[40px] mt-[40px] ml-2 transition-all">
            <button
              type="submit"
              className="absolute w-full h-full text-xl tracking-wider border border-[#C8A217] rounded-full bg-black flex items-center justify-center text-white hover:bg-[#C8A217]"
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
