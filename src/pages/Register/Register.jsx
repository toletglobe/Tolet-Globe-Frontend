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
    const value = e.target.value;
    setRole(value);
    if (value !== "user") {
      setUserType("owner");
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
    setUserType("buyer"); //  fixed: default value
    setAnswer("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check empty names
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("First name and last name cannot be empty");
      return;
    }
  
    // Email domain check
    const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com"];
    const emailDomain = email.split("@")[1];
    if (!allowedDomains.includes(emailDomain)) {
      toast.error("Only Gmail, Hotmail, or Outlook emails are allowed");
      return;
    }
  
    // Password length
    if (password.length !== 6) {
      toast.error("Password must be exactly 6 characters");
      return;
    }
  
    // Phone number check
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Enter valid phone number (starts with 6,7,8,9 and 10 digits)");
      return;
    }
  
    if (!role) {
      toast.error("Please select a role");
      return;
    }
  
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
  
      if (res.data) {
        resetFields();
        toast.success("Check email for verification link");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      toast.error("Registration failed");
      console.log(error.response?.data);
    }
  };

  return (
    <div
      className={`register_form_container relative flex items-center justify-center my-10 overflow-hidden ${
        role === "user" ? "h-[785px]" : "h-[700px]"
      } w-[400px] max-w-[400px] max-h-[785px] bg-black rounded-[50px_5px] mx-auto mt-16 mb-16`}
    >
      <div className="absolute inset-1 bg-black rounded-[50px_5px] p-[43px_40px] text-white z-10 min-h-[650px] border-4 border-transparent">
        <h2 className="text-4xl font-semibold text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-10 flex items-center">
            <FaUser className="ml-3 text-white" />
            <input
              type="text"
              placeholder="First Name"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] pl-2 text-lg outline-none"
              autoComplete="off"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="mt-10 flex items-center">
            <FaUser className="ml-3 text-white" />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] pl-2 text-lg outline-none"
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
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] pl-2 text-lg outline-none"
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
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] pl-2 text-lg outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mt-10 flex items-center">
            <FaPhoneAlt className="ml-3 text-white" />
            <input
              type="text"
              pattern="[0-9]{10}"
              title="Enter 10-digit phone number"
              placeholder="Phone Number"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] pl-2 text-lg outline-none"
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
              className="w-full h-8 bg-black border-b border-white text-[#3CBDB1] pl-2 outline-none text-sm"
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="content creator">Content Creator</option>
              <option value="user">User</option>
            </select>
          </div>

          {role === "user" && (
            <div className="mt-10 flex items-center">
              <FaSchool className="ml-3 text-white" />
              <select
                id="userType"
                value={userType}
                onChange={handleUserTypeChange}
                className="w-full h-8 bg-black border-b border-white text-[#3CBDB1] pl-2 outline-none text-sm"
              >
                <option value="buyer">Buyer</option>
                <option value="tenant">Tenant</option>
                <option value="owner">Owner</option>
              </select>
            </div>
          )}

          <div className="mt-10 flex items-center">
            <FaSchool className="ml-3 text-white" />
            <input
              type="text"
              placeholder="Your first School"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] pl-2 text-lg outline-none"
              autoComplete="off"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="w-[100%] max-w-[300px] h-[40px] text-xl tracking-wider border border-[#C8A217] rounded-full bg-black flex items-center justify-center text-white hover:bg-[#C8A217]"
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
