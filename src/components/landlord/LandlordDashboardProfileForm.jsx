import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import toast

const LandlordDashboardProfileForm = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [isChanged, setIsChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/v1/user/info?token=${token}`
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));

    // Check if any field has changed
    setIsChanged(value !== userInfo[name]);
  };

  // Handle save changes (update user info)
  const handleSaveChanges = async () => {
    // Check if any input field is empty
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.phoneNumber
    ) {
      setErrorMessage("All fields are required.");
      toast.error("All fields are required."); // Show error toast
      return;
    }

    try {
      const token = localStorage.getItem("token");
      setIsSubmitting(true);

      const response = await axios.put(
        "http://localhost:8000/api/v1/user/update",
        {
          userId: userInfo.userId,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      toast.success("User updated successfully!"); // Show success toast
      setIsChanged(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Failed to update user information"); // Show error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      <main className="flex-grow bg-black p-8">
        <div>
          <div>
            <div>
              <p className="text-3xl font-bold mb-5">Profile</p>
              <p className="text-xl font-bold mb-2">Profile Picture</p>
              <p className="text-[#4F7396] mb-6">
                Add a photo to personalize your account
              </p>
            </div>
            <div>
              <button className="px-8 py-2 bg-white text-black font-bold rounded-md mb-8">
                Upload
              </button>
            </div>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form className="flex flex-col gap-5">
            <div className="flex items-center justify-start gap-8">
              <div className="flex flex-col gap-3">
                <label htmlFor="firstName" className="font-medium text-lg">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter Your First Name"
                  className="border-2 rounded-[5px] bg-transparent w-56 h-9 p-4"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="lastName" className="font-medium text-lg">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter Your Last Name"
                  className="border-2 rounded-[5px] bg-transparent w-56 h-9 p-4"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="font-medium text-lg">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                placeholder="Enter Your Email ID"
                className="border-2 rounded-[5px] bg-transparent w-[476px] h-9 p-4"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="phoneNumber" className="font-medium text-lg">
                Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter Your Phone Number"
                className="border-2 rounded-[5px] bg-transparent w-[476px] h-9 p-4"
              />
            </div>
          </form>
          <button
            className={`bg-[#3CBDB1CC] text-white font-bold rounded-md px-5 py-3 float-right mt-5 ${
              !isChanged || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isChanged || isSubmitting}
            onClick={handleSaveChanges}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </main>
    </div>
    );
};

export default LandlordDashboardProfileForm;
