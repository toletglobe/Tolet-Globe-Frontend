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

  // Password validation check function
  const handlePasswordChange = (e) => {
    // e.preventDefault()
    const value = e.target.value;
    setNewPassword(value);
    // Update password criteria
    setPasswordCriteria({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
    });
  };
  // console.log(BASE_URL)

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(currentPassword, confirmPassword, NewPassword);
    if (NewPassword === confirmPassword) {
      try {

        const res = await fetch(`${BASE_URL}auth/change-password`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword: NewPassword,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success(data.message || "Password changed successfully");
        } else {
          toast.error(
            data.message || "An error occurred while changing the password"
          );
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while changing the password");
      }
    } else {
      toast.error("New Password and Confirm Password do not match");
    }
  }

  return (
    <div className="min-h-screen flex bg-black">
      <div className="w-full max-w-2xl bg-black p-8 rounded-md shadow-lg">
        <div className="flex">
          <h2 className="text-3xl text-white font-semibold mb-6">
            Account Security
          </h2>
        </div>
        <p className="text-sm text-teal-400 mb-4">
          Use at least 8 characters. Don't use a password from another site or
          something too obvious like your pet's name.
        </p>
        <form onSubmit={handleSubmit}>
          {/* Current Password */}
          <div className="mb-6">
            <label className="block text-white mb-2">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter Current Password"
              className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:border-teal-400"
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-white mb-2">New Password</label>
            <input
              type="password"
              value={NewPassword}
              onChange={handlePasswordChange}
              placeholder="Enter New Password"
              className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:border-teal-400"
            />
            {/* Password Requirements */}
            <ul className="mt-3 space-y-1">
              <li
                className={`text-sm ${
                  passwordCriteria.length ? "text-green-500" : "text-red-500"
                }`}
              >
                {passwordCriteria.length ? "✔" : "✘"} At least 8 characters long
              </li>
              <li
                className={`text-sm ${
                  passwordCriteria.uppercase ? "text-green-500" : "text-red-500"
                }`}
              >
                {passwordCriteria.uppercase ? "✔" : "✘"} Contains at least one
                uppercase letter
              </li>
              <li
                className={`text-sm ${
                  passwordCriteria.lowercase ? "text-green-500" : "text-red-500"
                }`}
              >
                {passwordCriteria.lowercase ? "✔" : "✘"} Contains at least one
                lowercase letter
              </li>
              <li
                className={`text-sm ${
                  passwordCriteria.number ? "text-green-500" : "text-red-500"
                }`}
              >
                {passwordCriteria.number ? "✔" : "✘"} Contains at least one
                number
              </li>
            </ul>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-white mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
              className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:border-teal-400"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300"
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
