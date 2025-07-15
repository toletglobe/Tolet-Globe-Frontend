import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux"; // Import useDispatch
import { updateProfilePicture } from "../../../redux/store/authSlice"; // Import the action

import { API } from "../../../config/axios";

const LandlordDashboardProfileForm = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [userInfo, setUserInfo] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
    properties:[],
  });

  const [isChanged, setIsChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // State for image upload
  const fileInputRef = useRef(null); // Create a ref for the file input

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
      //  console.log("data",response.data)

        // Use 'id' as the 'userId'
        setUserInfo({
          userId: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          profilePicture: response.data.profilePicture, // Set profile picture
          properties:response.data.properties,
        });
        console.log("User info set:", response.data); // logs raw API data
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

  // for image upload button
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the hidden input
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      handleImageChange(e); // Call parent function to handle image upload
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
              <p className="max-sm:text-center text-3xl sm:text-3xl font-bold mb-5">
                Profile
              </p>
              <p className="text-lg text-center md:text-left sm:text-xl font-bold mb-2">
                Profile Picture
              </p>
              <p className="text-[#4F7396] mb-4 sm:mb-6 text-center md:text-left text-[14px]">
                Add a photo to personalize your account
              </p>
            </div>
            <div>
              {/* old one */}
              {/* <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef} // Attach the ref to the input
                className="w-full h-12 p-2 bg-white text-black font-bold rounded-md sm:w-[476px]"
              /> */}

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />

              {/* Styled Button */}
              <div className="text-center md:text-left">
                <button
                  onClick={handleButtonClick}
                  className="px-4 py-2 bg-gray-200 text-black font-semibold rounded-md"
                >
                  Change Picture
                </button>
              </div>
            </div>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form className="flex flex-col gap-4 sm:gap-5 my-3 mt-10">
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
                  className="border-2 rounded-[5px] bg-transparent w-full sm:w-56 h-9 px-4 py-6"
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
                  className="border-2 rounded-[5px] bg-transparent w-full sm:w-56 h-9 px-4 py-6"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              <label
                htmlFor="email"
                className="font-medium text-base sm:text-lg"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                disabled={false}
                value={userInfo.email}
                onChange={handleInputChange}
                placeholder="Enter Your Email ID"
                className="border-2 rounded-[5px] bg-transparent w-full sm:w-[476px] h-9 px-4 py-6"
              />
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
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
                className="border-2 rounded-[5px] bg-transparent w-full sm:w-[476px] h-9 px-4 py-6"
              />
            </div>
            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={handleSaveChanges}
                disabled={!isChanged || isSubmitting}
                className="bg-teal-500 text-white px-4 py-1 font-bold rounded-md hover:bg-teal-600 transition duration-300  h-[42.56px]"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LandlordDashboardProfileForm;
