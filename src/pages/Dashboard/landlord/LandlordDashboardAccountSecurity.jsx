import React, { useState } from "react";
import toast from "react-hot-toast";

import { API } from "../../../config/axios";

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
      const res = await API.post(
        `auth/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
    <div className="min-h-screen bg-black flex font- flex-col py-4 px-2 sm:p-6 md:p-8 lg:p-10">
      <div className="mb-4">
        <h2 className="max-sm:text-center text-3xl text-white font-bold text-left pb-2">
          Account Security
        </h2>
      </div>

      <div className="sm:max-w-md mb-4 mx-2">
        <form onSubmit={handleSubmit} className="mb-0">
          <div className="mb-6">
            <label className="block text-white mb-2">
              Current Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className="w-full p-2 px-3 border border-white bg-black text-white rounded-md focus:outline-none focus:border-teal-400"
            />
            {/* <p className="text-blue-400 text-sm mt-4 mb-4">
              Re-enter your new password
            </p> */}
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2">
              New Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="w-full p-2 px-3 border border-white bg-black text-white rounded-md focus:outline-none focus:border-teal-400"
            />
            <ul className="mt-4 space-y-1">
              <li
                className={`text-sm pl-2 flex items-center ${
                  passwordCriteria.length ? "text-[#00cc00]" : "text-[#ff3300]"
                }`}
              >
                <span className="mr-2">
                  {passwordCriteria.length ? "✓" : "✗"}
                </span>
                At least 8 characters long
              </li>
              <li
                className={`text-sm pl-2 flex items-center ${
                  passwordCriteria.uppercase
                    ? "text-[#00cc00]"
                    : "text-[#ff3300]"
                }`}
              >
                <span className="mr-2">
                  {passwordCriteria.uppercase ? "✓" : "✗"}
                </span>
                Contains at least one uppercase letter
              </li>
              <li
                className={`text-sm pl-2 flex items-center ${
                  passwordCriteria.lowercase
                    ? "text-[#00cc00]"
                    : "text-[#ff3300]"
                }`}
              >
                <span className="mr-2">
                  {passwordCriteria.lowercase ? "✓" : "✗"}
                </span>
                Contains at least one lowercase letter
              </li>
              <li
                className={`text-sm pl-2 flex items-center ${
                  passwordCriteria.number ? "text-[#00cc00]" : "text-[#ff3300]"
                }`}
              >
                <span className="mr-2">
                  {passwordCriteria.number ? "✓" : "✗"}
                </span>
                Contains at least one number
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">
              Confirm New Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-2 px-3 border border-white bg-black text-white rounded-md focus:outline-none focus:border-teal-400"
            />
          </div>
        </form>
      </div>
      <div className="flex justify-end mt-8 sm:mt-10 gap-3">
        <button
          type="submit"
          className="border-[#3CBDB1] border-[1.5px] rounded-[5px] text-[18px] px-[17.02px] py-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-teal-500 text-white px-4 py-1 font-bold rounded-md hover:bg-teal-600 transition duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default LandlordDashboardAccountSecurity;
