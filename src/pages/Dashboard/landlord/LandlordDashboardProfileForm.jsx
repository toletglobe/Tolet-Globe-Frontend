import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "../../../config/axios";
import { useDispatch } from "react-redux"; // Import useDispatch
import { updateProfilePicture } from "../../../redux/store/authSlice"; // Import the action

const LandlordDashboardProfileForm = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [userInfo, setUserInfo] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
    newPassword: "",
    role: "",
    confirmPassword: "",
  });

  const [checkboxes, setCheckboxes] = useState({
    terms: false,
    privacy: false,
    notifications: false,
  });

  const allChecked = checkboxes.terms && checkboxes.privacy && checkboxes.notifications;

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));
  };

  const [isChanged, setIsChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // State for image upload
  const fileInputRef = useRef(null); // Create a ref for the file input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
 

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await API.get(`user/info?token=${token}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Use 'id' as the 'userId'
        setUserInfo({
          userId: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          profilePicture: response.data.profilePicture, // Set profile picture
        });
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

      // Prepare request for updating user info
      const updateResponse = await API.put(
        "user/update",
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

      console.log(updateResponse.data);
      toast.success("User updated successfully!"); // Show success toast

      // Upload the profile picture if selected
      if (selectedImage) {
        const formData = new FormData();
        formData.append("profilePicture", selectedImage); // Ensure 'profilePicture' is what backend expects

        const uploadResponse = await API.post(
          "user/uploadProfilePicture",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          }
        );

        toast.success("Profile picture uploaded successfully!"); // Show success toast

        // Update the userInfo with the uploaded image URL if available
        if (uploadResponse.data && uploadResponse.data.imageUrl) {
          const newProfilePictureUrl = uploadResponse.data.imageUrl;

          // Dispatch the action to update the profile picture in the Redux store
          dispatch(updateProfilePicture(newProfilePictureUrl));

          setUserInfo((prevInfo) => ({
            ...prevInfo,
            profilePicture: newProfilePictureUrl, // Adjust based on your API response
          }));
        }

        // Reset the selected image
        setSelectedImage(null);
        // Clear the file input field
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the input
        }
      }

      setIsChanged(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating user info:", error);

      // Enhanced error logging
      if (error.response) {
        console.log("Error Response:", error.response.data);
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        console.log("Error:", error.message);
        toast.error("Failed to update user information");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // Ensure it's an image file
      setSelectedImage(file);
      setIsChanged(true); // Set isChanged to true when an image is selected
    } else {
      toast.error("Please upload a valid image file");
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      <main className="flex-grow bg-black p-4 sm:p-8">
        <div>
          <div>
            <div>
              <p className="max-sm:text-center text-3xl sm:text-3xl font-bold mb-3 sm:mb-5">
                Profile
              </p>
              <p className="text-lg sm:text-xl font-bold mb-2">
                Profile Picture
              </p>
              <p className="text-[#4F7396] mb-4 sm:mb-6">
                Add a photo to personalize your account
              </p>
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef} // Attach the ref to the input
                className="w-full h-12 p-2 bg-white text-black font-bold rounded-md sm:w-[476px]"
              />
            </div>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form className="flex flex-col gap-4 sm:gap-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:gap-8 gap-4">
              <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
                <label
                  htmlFor="firstName"
                  className="font-medium text-base sm:text-lg"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter Your First Name"
                  className="border-2 rounded-[5px] bg-transparent w-full sm:w-56 h-9 p-4"
                />
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
                <label
                  htmlFor="lastName"
                  className="font-medium text-base sm:text-lg"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter Your Last Name"
                  className="border-2 rounded-[5px] bg-transparent w-full sm:w-56 h-9 p-4"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:gap-8 gap-4">
              <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
                <label
                  htmlFor="email"
                  className="font-medium text-base sm:text-lg"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  disabled={true}
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email ID"
                  className="border-2 rounded-[5px] bg-transparent w-full sm:w-56 h-9 p-4"
                />
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
                <label
                  htmlFor="phoneNumber"
                  className="font-medium text-base sm:text-lg"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Your Phone Number"
                  className="border-2 rounded-[5px] bg-transparent w-full sm:w-56 h-9 p-4"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:gap-8 gap-4">
              <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
                <label
                  htmlFor="role"
                  className=" font-medium text-base sm:text-lg"
                >
                  Role
                </label>
                <select
                  name="role"
                  value={userInfo.role}
                  onChange={handleInputChange}
                  className="border-2 text-white-900 rounded-[5px] bg-gray-800 w-full sm:w-56 h-9 "
                >
                  <option value="" disabled className="text-gray-400">
                    Select one
                  </option>
                  <option value="landlord" className="text-gray-400 ">
                    Admin
                  </option>
                  <option value="landlord" className="text-gray-400 ">
                    Content Creater
                  </option>
                  <option value="tenant" className="text-gray-400">
                    User
                  </option>
                </select>

                <input
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter Your First Name"
                  className="border-2 rounded-[5px] bg-transparent w-full sm:w-56 h-9 p-4"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:gap-8 gap-4">
              <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
                <label
                  htmlFor="currentPassword"
                  className="font-medium text-base sm:text-lg"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  disabled={true}
                  value={userInfo.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="border-2 rounded-[5px] bg-transparent w-full sm:w-56 h-9 p-4"
                />
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
                <label
                  htmlFor="newPassword"
                  className="font-medium text-base sm:text-lg"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={userInfo.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter Your New Password"
                  className="border-2 rounded-[5px] bg-transparent w-full sm:w-56 h-9 p-4"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:gap-8 gap-4">
              <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
                <label
                  htmlFor="confirmPassword"
                  className="font-medium text-base sm:text-lg"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  //  disabled={true}
                  value={userInfo.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Current Password"
                  className="border-2 rounded-[5px] bg-transparent w-full sm:w-56 h-9 p-4"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {/* <p className="font-bold text-lg">Agreements</p> */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="terms"
                  checked={checkboxes.terms}
                  onChange={handleCheckboxChange}
                />
                Receive product updates, event, and offers
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={checkboxes.privacy}
                  onChange={handleCheckboxChange}
                />
                Receive marketing communications
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={checkboxes.notifications}
                  onChange={handleCheckboxChange}
                />
                Receive training and certification communications
              </label>
            </div>
            <button
  type="button"
  onClick={handleSaveChanges}
  disabled={!allChecked || !isChanged || isSubmitting}
  className={`rounded-[5px] text-white font-bold p-2 w-32 ${
    !allChecked || !isChanged || isSubmitting
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#00B74D] hover:bg-green-600"
  }`}
>
  {isSubmitting ? "Saving..." : "Save Changes"}
</button>

          </form>
        </div>
      </main>
    </div>
  );
};

export default LandlordDashboardProfileForm;
