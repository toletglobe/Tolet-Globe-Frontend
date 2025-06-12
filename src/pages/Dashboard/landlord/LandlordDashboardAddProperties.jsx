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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      console.log("Token: ", token);
      const isCouponUsed = await API.post(
        "user/check-coupon-usage",
        {
          userId: authState.userData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Coupon Usage Data: ", isCouponUsed.data.result);
      setCouponUsage(isCouponUsed.data.result);
    };
    fetchData();
  }, []);

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
    coupon: false,
    rent: "",
    security: "",
    images: [],
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
  });

  // const RenderFormBody = (page) => {
  //   if (page) {
  //     return (
  //       <div key={`Form-${page}`}>
  //         <Form formData={formData} setFormData={setFormData} />
  //       </div>
  //     );}
  // };

  const authState = useSelector((state) => state.auth);
  const userInfo = authState?.userData || {};

  // Submitting form Data
  const submitForm = async (formData) => {
    setLoading(true);
    const updatedFormData = {
      ...formData,
      userId: userInfo.id,
      pincode: Number(formData.pincode),
      appliances: formData.appliances.map((obj) => obj.value),
      amenities: formData.amenities.map((obj) => obj.value),
    };

    for (const [key, value] of Object.entries(updatedFormData)) {
      if (key === "userId" || key === "lastName" || key === "images") {
        continue;
      }

      if (value === "") {
        updatedFormData[key] = "NA";
      }
    }

    const dataToSend = new FormData();

    Object.entries(updatedFormData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "images") {
          value.forEach((image) => dataToSend.append("images", image));
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
      // Handle the case where there's no token (e.g., redirect to login)
      return;
    }

    try {
      const { data } = await API.post("property/add-property", dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Change 'token' to 'Authorization'
        },
      });

      setLoading(false);

      console.log(data);
      toast.success("Property added successfully");
      navigate(`/property/${data.property.slug}`);
    } catch (err) {
      console.error(
        "Error submitting form:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }

    // clearing form fields
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
      coupon: "",
      rent: "",
      security: "",
      images: [],
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
    });
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
            <Form formData={formData} setFormData={setFormData} />
            <AdditionalInfo formData={formData} setFormData={setFormData} />
            <Coupon
              formData={formData}
              setFormData={setFormData}
              couponUsage={couponUsage}
            />
            <ImageUpload formData={formData} setFormData={setFormData} />

            {/* Form-footer */}
            <div className="my-10 pr-5 h-fit flex gap-x-3 justify-end md:pr-0">
              <input
                type="submit"
                value="Cancel"
                className="border-[0.5px] rounded-md bg-white font-bold px-7 py-[10px] text-black"
              />
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
