import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import Form from "./NewForm/components/Details";
import AdditionalInfo from "./NewForm/components/AdditionalInfo";
import Coupon from "./NewForm/components/Coupon";
import ImageUpload from "./NewForm/components/ImageUpload";

import { API } from "../../../config/axios";
import { max } from "date-fns";

export default function LandlordDashboardAddProperties() {
  // For changing and showing page number
  // const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [couponUsage, setCouponUsage] = useState(false);
      const [isMarkerMoved, setIsMarkerMoved] = useState(false);


  const navigate = useNavigate();

  // For storing formData
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    ownersContactNumber: "",
    ownersAlternateContactNumber: "",
    pincode: "",
    city: "",
    locality: "",
    area: "",
    address: "",
    spaceType: "",
    propertyType: "",
    // petsAllowed: "",
    preference: "",
    bachelors: "",
    type: "",
    bhk: "",
    floor: "",
    nearestLandmark: "",
    typeOfWashroom: "",
    // coolingFacility: "",
    // carParking: "",
    coupon: "", // Changed from false to empty string
    rent: "",
    security: "",
    images: [],
    removedImages: [], // Initialize for consistency with ImageUpload component
    videos: [],
    squareFeetArea: "",
    // locationLink: "",
    appliances: [],
    amenities: [],
    maxRent: "",
    minRent: "",
    // addressVerification: "",
    availabilityStatus: "Available",
    aboutTheProperty: "",
    latitude: null,
    longitude: null,
    subscriptionPlan: null,
    couponStatus: false, // Kept couponStatus
    ownerLocation: "",
  });

  const userInfo = useSelector((state) => state.auth.userData);
  console.log("userInf0o", userInfo);

  // Submitting form Data
  const submitForm = async (formData) => {
    setLoading(true);
    if (!isMarkerMoved) {
      toast.error("Please move the map marker to the correct location before submitting.");
      setLoading(false);
      return;
    }

    const updatedFormData = {
      ...formData,
      userId: userInfo.id,
      pincode: Number(formData.pincode),
    };

    // Handle empty fields - but skip appliances and amenities from this logic
    for (const [key, value] of Object.entries(updatedFormData)) {
      if (
        key === "userId" ||
        key === "lastName" ||
        key === "images" ||
        key === "removedImages" ||
        key === "appliances" ||
        key === "amenities"
        // Skips making coupon mandatory
        // key === "coupon" || // Add this line
        // key === "couponStatus" // Add this line
      ) {
        continue;
      }

      if (value === "") {
        updatedFormData[key] = "NA";
      }
    }

    // Validation: Check if required fields are filled
    const requiredFields = [
      "firstName",
      "ownersContactNumber",
      "address",
      "city",
      "locality",
      "area",
      "spaceType",
      "propertyType",
      "nearestLandmark",
      "typeOfWashroom",
    ];

    for (const field of requiredFields) {
      if (!updatedFormData[field] || updatedFormData[field] === "NA") {
        toast.error(`Please fill in the ${field} field`);
        setLoading(false);
        return;
      }
    }

    const dataToSend = new FormData();

    Object.entries(updatedFormData).forEach(([key, value]) => {
      // Skip removedImages field for new property creation
      if (key === "removedImages") {
        return;
      }

      if (Array.isArray(value)) {
        if (key === "images") {
          value.forEach((image) => dataToSend.append("images", image));
        } else if (key === "appliances" || key === "amenities") {
          // Send arrays as JSON strings or individual items
          value.forEach((item) => dataToSend.append(key, item));
        } else {
          value.forEach((item) => dataToSend.append(key, item));
        }
      } else {
        dataToSend.append(key, value);
      }
    });

    const token = localStorage.getItem("token");
    console.log("Token: ", token);

    if (!token) {
      console.error("No token found in localStorage");
      toast.error("Authentication required. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      console.log("coupon status", formData);
      console.log("dataToSend", dataToSend);

      const { data } = await API.post("property/add-property", dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      console.log(data);
      toast.success("Property added successfully");
      setFormData({
        userId: "",
        firstName: "",
        lastName: "",
        ownersContactNumber: "",
        ownersAlternateContactNumber: "",
        pincode: "",
        city: "",
        locality: "",
        area: "",
        address: "",
        spaceType: "",
        propertyType: "",
        preference: "",
        bachelors: "",
        type: "",
        bhk: "",
        floor: "",
        nearestLandmark: "",
        typeOfWashroom: "",
        coupon: "",
        rent: "",
        security: "",
        images: [],
        removedImages: [],
        videos: [],
        squareFeetArea: "",
        appliances: [],
        amenities: [],
        maxRent: "",
        minRent: "",
        availabilityStatus: "Available",
        aboutTheProperty: "",
        latitude: null,
        longitude: null,
        subscriptionPlan: null,
        couponStatus: false,
        ownerLocation: "",
      });
      navigate(`/property/${data.property.slug}`);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error submitting form";
      toast.error(errorMessage);
      console.error("Error submitting form:", errorMessage);
      console.error("Full error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} /> {/* Spinner component */}
      </div>
    );
  }

  return (
    <>
      {/* Form */}

      <div className="w-full px-3">
        {/* Form-Container */}
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            submitForm(formData);
            return;
          }}
        >
          <div>
            {/* Form-Body */}
            <Form formData={formData} setFormData={setFormData} 
                          setIsMarkerMoved={setIsMarkerMoved}

            
            
            />

            <AdditionalInfo formData={formData} setFormData={setFormData} />
            <Coupon
              formData={formData}
              setFormData={setFormData}
              
              couponUsage={couponUsage}
            />
            <ImageUpload formData={formData} setFormData={setFormData} />

            {/* Form-footer */}
            <div className="my-10 pr-5 h-fit flex gap-x-3 justify-end md:pr-0">
              <button
                type="button"
                onClick={() => navigate("/landlord-dashboard/my-properties")}
                className="border-[0.5px] rounded-md bg-white font-bold px-7 py-[10px] text-black"
              >
                Cancel
              </button>
              <input
                type="submit"
                value="Submit"
                className="rounded-md bg-[#04AA6D] font-bold px-7 py-[10px] text-gray-200"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
