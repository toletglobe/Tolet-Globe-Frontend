import React, { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../constant/constant";

const LandlordDashboardAccountSecurity = () => {
  const [newPassword, setNewPassword] = useState("");
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

    const allCriteriaMet = Object.values(passwordCriteria).every(
      (criterion) => criterion
    );

    if (!allCriteriaMet) {
      toast.error("Please ensure all password requirements are met");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      const data = await res.json();
      if (res.status === 200 || res.status === 201) {
        toast.success(data.message || "Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message || "An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold text-left">
          Account Security
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-teal-400 p-2 text-left">
          Use at least 8 characters. Don't use a password from another site or
          something too obvious like your pet's name.
        </p>
      </div>
      
      <div className="w-full max-w-full sm:max-w-md mb-4">
        <form onSubmit={handleSubmit} className="mb-0">
          <div className="mb-4">
            <label className="block text-white mb-2">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter Current Password"
              className="w-full p-2 pl-4 border border-white bg-black text-white rounded-md focus:outline-none focus:border-teal-400"
            />
            <p className="text-blue-400 text-sm mt-4 mb-4">
              Re-enter your new password
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter New Password"
              className="w-full p-2 pl-4 border border-white bg-black text-white rounded-md focus:outline-none focus:border-teal-400"
            />
            <ul className="mt-4 space-y-1">
              {!passwordCriteria.length && newPassword && (
                <li className="text-sm pl-2 flex items-center text-[#ff3300]">
                  <span className="mr-2 text-[#ff3300]">✗</span>
                  At least 8 characters long
                </li>
              )}
              {!passwordCriteria.uppercase && newPassword && (
                <li className="text-sm pl-2 flex items-center text-[#ff3300]">
                  <span className="mr-2 text-[#ff3300]">✗</span>
                  Contains at least one uppercase letter
                </li>
              )}
              {!passwordCriteria.lowercase && newPassword && (
                <li className="text-sm pl-2 flex items-center text-[#ff3300]">
                  <span className="mr-2 text-[#ff3300]">✗</span>
                  Contains at least one lowercase letter
                </li>
              )}
              {!passwordCriteria.number && newPassword && (
                <li className="text-sm pl-2 flex items-center text-[#ff3300]">
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
              className="w-full p-2 pl-4 border border-white bg-black text-white rounded-md focus:outline-none focus:border-teal-400"
            />
          </div>

          <div className="flex justify-end mt-8 sm:mt-10">
            <button
              type="submit"
              className="bg-teal-500 text-white px-5 py-2 rounded-md hover:bg-teal-600 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandlordDashboardAccountSecurity;
