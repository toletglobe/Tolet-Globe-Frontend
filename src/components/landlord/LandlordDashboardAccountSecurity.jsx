import React, { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constant/constant";

const LandlordDashboardAccountSecurity = () => {
  const [NewPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    setPasswordCriteria({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (NewPassword === confirmPassword) {
      try {
        const res = await fetch(`${BASE_URL}auth/ChangePassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            currentPassword,
            NewPassword,
          }),
        });
        const data = await res.json();
        if (res.status === 200) {
          toast.success(data.message);
        } else {
          toast.error(data.message || "An error occurred");
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    } else {
      toast.error("Password and confirmPassword not matching");
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col p-4"> {/* Main container with padding */}
      {/* First div for heading and instructions */}
      <div className="mb-4"> {/* Minimal bottom margin for spacing */}
        <h2 className="text-3xl text-white font-semibold text-left">
          Account Security
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-teal-400 p-2 text-left">
          Use at least 8 characters. Don't use a password from another site or something too obvious like your pet's name.
        </p>
      </div>

      {/* Second div for the form */}
      <div className="w-full max-w-md mb-4"> {/* Keep the form aligned to the left with a bottom margin */}
        <form onSubmit={handleSubmit} className="mb-0">
          <div className="mb-4">
            <label className="block text-white mb-2">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter Current Password"
              className="w-full p-2 pl-4 border-2 border-white bg-black text-white rounded-md focus:outline-none focus:border-teal-400"
            />
            <p className="text-blue-400 text-sm mt-4 mb-4">
              Re-enter your new password
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">New Password</label>
            <input
              type="password"
              value={NewPassword}
              onChange={handlePasswordChange}
              placeholder="Enter New Password"
              className="w-full p-2 pl-4 border-2 border-white bg-black text-white rounded-md focus:outline-none focus:border-teal-400"
            />
            <ul className="mt-4 space-y-1">
              {!passwordCriteria.length && NewPassword && (
                <li className="text-sm pl-2 flex items-center text-[#ff3300]" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
                  <span className="mr-2 text-[#ff3300]">✗</span>
                  At least 8 characters long
                </li>
              )}
              {!passwordCriteria.uppercase && NewPassword && (
                <li className="text-sm pl-2 flex items-center text-[#ff3300]" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
                  <span className="mr-2 text-[#ff3300]">✗</span>
                  Contains at least one uppercase letter
                </li>
              )}
              {!passwordCriteria.lowercase && NewPassword && (
                <li className="text-sm pl-2 flex items-center text-[#ff3300]" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
                  <span className="mr-2 text-[#ff3300]">✗</span>
                  Contains at least one lowercase letter
                </li>
              )}
              {!passwordCriteria.number && NewPassword && (
                <li className="text-sm pl-2 flex items-center text-[#ff3300]" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
                  <span className="mr-2 text-[#ff3300]">✗</span>
                  Contains at least one number
                </li>
              )}
            </ul>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
              className="w-full p-2 pl-4 border-2 border-white bg-black text-white rounded-md focus:outline-none focus:border-teal-400"
            />
          </div>
        </form>
      </div>

      {/* Third div for the button */}
      <div className="flex justify-end"> {/* Aligns the button to the right */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-teal-500 text-white px-5 py-2 rounded-md hover:bg-teal-600 transition duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default LandlordDashboardAccountSecurity;
