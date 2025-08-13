import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaUser,
  FaLock,
  FaPhoneAlt,
  FaRegAddressCard,
  FaSchool,
} from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

import "./Register.css";
import { API } from "../../config/axios";
import GoogleOAuthBar from "./GoogleOAuth/GoogleOAuthBar";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordVerified, setPasswordVerified] = useState(true);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [verificationMethod, setVerificationMethod] = useState("email");
  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOtp] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  // const handleRoleChange = (e) => {
  //   setRole(e.target.value);
  //   if (e.target.value !== "user" && userType !== "owner") setUserType("owner");
  // };

  // const handleUserTypeChange = (e) => {
  //   setUserType(e.target.value);
  // };

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordVerified(true);
    if (password.length < 8) {
      setPasswordMessage(
        "Password Must be 8 character long, must contain a number and an uppercase letter"
      );
      setPasswordVerified(false);
      setTimeout(() => {
        setPasswordVerified(true);
      }, 5000);
      return;
    }
    if (!/\d/.test(password)) {
      setPasswordMessage(
        "Password must contain a number and an uppercase letter"
      );
      setPasswordVerified(false);
      setTimeout(() => {
        setPasswordVerified(true);
      }, 5000);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordMessage("Password must contain an uppercase letter");
      setPasswordVerified(false);
      setTimeout(() => {
        setPasswordVerified(true);
      }, 5000);
      return;
    }

    setSubmitting(true);
    const loadingToast = toast.loading(
      "Registering...! Please wait for the registration process to complete ."
    );
    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
      const res = await API.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        phone: formattedPhone,
        verificationMethod,
      });

      if (res.status === 200) {
        resetFields();
        setSubmitting(false);
        toast.dismiss(loadingToast);

        if (verificationMethod === "email") {
          toast.success(
            "Registration successful! Please check your email to verify your account."
          );
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          toast.success("OTP sent to your phone! Please enter it below.");
          setShowOTPField(true);
        }
      } else {
        setSubmitting(false);
        toast.dismiss(loadingToast);
        toast.error(
          res.data?.message || "Unexpected response. Please try again."
        );
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Registration failed. Please try again.");
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const loadingToast = toast.loading("Verifying OTP...");

    try {
      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      if (res.status === 200) {
        toast.dismiss(loadingToast);
        toast.success("Verification successful! You can now login.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.dismiss(loadingToast);
        toast.error(res.data?.message || "OTP verification failed.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("OTP verification failed. Please try again.");
      console.error("OTP verification error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`register_form_container relative flex items-center justify-center my-10 overflow-hidden ${
        ""
        // role === "user" ? "h-[785px]" : "h-[700px]"
      } w-[400px]  max-w-[400px] bg-black rounded-[50px_5px] mx-auto mt-16 mb-16 `}
    >
      <div className="absolute inset-1 bg-black rounded-[50px_5px] pt-11 px-10 text-white z-10 border-4 border-transparent">
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
          <div className="mt-10 mb-10 flex items-center">
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

          {passwordVerified ? (
            <></>
          ) : (
            <div className="ml-4">
              <p className="text-red-600 font-light text-sm">
                <span>* </span>
                {passwordMessage}
              </p>
            </div>
          )}
          {/* Password div */}
          <div className="flex items-center">
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
              type="tel"
              placeholder="Phone Number Starting with +91"
              className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
              autoComplete="off"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/[^+\d]/g, ""); // allow digits and +
                setPhone(value);
              }}
              required
            />
          </div>
          {/* <div className="mt-10 flex items-center">
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
          </div> */}
          {/* {role === "user" && (
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
          )} */}
          {/* <div className="mt-10 flex items-center">
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
          </div> */}
          {!showOTPField && (
            <div className="mt-6 flex items-center justify-center">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="verificationMethod"
                  value="email"
                  checked={verificationMethod === "email"}
                  onChange={() => setVerificationMethod("email")}
                />
                <span className="ml-2">Verify via Email</span>
              </label>
              {/* <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="verificationMethod"
                  value="sms"
                  checked={verificationMethod === "sms"}
                  onChange={() => setVerificationMethod("sms")}
                />
                <span className="ml-2">Verify via SMS</span>
              </label> */}
            </div>
          )}

          {showOTPField && (
            <div className="mt-6">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  maxLength="6"
                />
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleVerifyOTP}
                  className="w-[100%] max-w-[300px] h-[40px] text-xl tracking-wider border border-[#C8A217] rounded-full bg-black flex items-center justify-center text-white hover:bg-[#C8A217]"
                >
                  VERIFY OTP
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-10">
            {submitting ? (
              <div className="w-[100%] max-w-[300px] h-[40px] text-xl tracking-wider border border-[#C8A217] rounded-full bg-black flex items-center justify-center text-white">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>REGISTERING...</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-[100%] max-w-[300px] h-[40px] text-xl tracking-wider border border-[#C8A217] rounded-full bg-black flex items-center justify-center text-white hover:bg-[#C8A217]"
              >
                REGISTER
              </button>
            )}
          </div>
          {/* Divider with "or" text - made more visible */}
          <div className="relative flex items-center justify-center my-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          {/* Google OAuth Button - ensure it's properly styled */}
          <div className="flex justify-center mb-6 w-full">
            <GoogleOAuthBar
              className="w-full max-w-[300px]"
              buttonClassName="w-full h-[40px] flex items-center justify-center bg-white text-black rounded-full border border-white hover:bg-gray-100"
              iconClassName="mr-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
