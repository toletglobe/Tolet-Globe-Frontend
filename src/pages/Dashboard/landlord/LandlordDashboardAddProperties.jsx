import { useState } from "react";
import { API } from "../../../config/axios";

import Frm1 from "./AllForms/Frm1";
import Frm2 from "./AllForms/Frm2";
import Frm3 from "./AllForms/Frm3";
import Frm4 from "./AllForms/Frm4";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { faLaptopHouse } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

export default function LandlordDashboardAddProperties() {
  // For changing and showing page number
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // For yellow progress bar
  function yellowBorder(page) {
    let p = page + 1;
    let yellowDivs = [];

    while (p--) {
      yellowDivs.push(
        <div
          key={`yellow-${p}`}
          className="bg-yellow-500 rounded-lg w-[24%] h-2 "
        ></div>
      );
    }

    return yellowDivs;
  }

  // For white progress bar
  function whiteBorder(page) {
    let p = 4 - (page + 1);

    let whiteDivs = [];

    while (p--) {
      whiteDivs.push(
        <div
          key={`white-${p}`}
          className="bg-white rounded-lg w-[24%] h-2 "
        ></div>
      );
    }
    return whiteDivs;
  }

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
    petsAllowed: "",
    preference: "",
    bachelors: "",
    type: "",
    bhk: "",
    floor: "",
    nearestLandmark: "",
    typeOfWashroom: "",
    coolingFacility: "",
    carParking: "",
    rent: "",
    security: "",
    images: [],
    videos: [],
    squareFeetArea: "",
    locationLink: "",
    appliances: [],
    amenities: [],
    addressVerification: "",
    availabilityStatus: "",
    aboutTheProperty: "",
  });

  const RenderFormBody = (page) => {
    if (page == 0) {
      return (
        <div key={`Frm1-${page}`}>
          <Frm1 formData={formData} setFormData={setFormData} />
        </div>
      );
    } else if (page == 1) {
      return (
        <div key={`Frm2-${page}`}>
          <Frm2 formData={formData} setFormData={setFormData} />
        </div>
      );
    } else if (page == 2) {
      return (
        <div key={`Frm3-${page}`}>
          <Frm3 formData={formData} setFormData={setFormData} />
        </div>
      );
    } else {
      return (
        <div key={`Frm4-${page}`}>
          <Frm4 formData={formData} setFormData={setFormData} />
        </div>
      );
    }
  };

  const authState = useSelector((state) => state.auth);
  const userInfo = authState?.userData || {};

  // Submitting form Data
  const submitForm = async (formData) => {
    setLoading(true);
    const updatedFormData = {
      ...formData,
      userId: userInfo.id,
      pincode: Number(formData.pincode),
      // petsAllowed: Boolean(formData.petsAllowed),  NA
      // bhk: Number(formData.bhk),  NA
      // rent: Number(formData.rent),  NA
      // security: Number(formData.security),  NA
      // squareFeetArea: Number(formData.squareFeetArea), NA
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
      petsAllowed: "",
      preference: "",
      bachelors: "",
      type: "",
      bhk: "",
      floor: "",
      nearestLandmark: "",
      typeOfWashroom: "",
      coolingFacility: "",
      carParking: "",
      rent: "",
      security: "",
      images: [],
      videos: [],
      squareFeetArea: "",
      locationLink: "",
      appliances: [],
      amenities: [],
      addressVerification: "",
      availabilityStatus: "",
      aboutTheProperty: "",
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

      <div>
        {/* ProgressBar */}

        <div className="ml-5 mt-5 mb-8 pr-5 flex flex-col gap-2 md:pr-0">
          <h1 className="text-center text-[#FFFFFF] text-[33px] leading-10 font-bold md:text-left">
            Add New Property
          </h1>
          <div className="mt-8 flex gap-4">
            {yellowBorder(page)}
            {whiteBorder(page)}
          </div>
          <div className="text-[#4F7396] text-xs leading-5">{page + 1}/4</div>
        </div>

        {/* Form-Container */}
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            if (page == 2) {
              if (formData.images.length < 5) {
                alert("Please submit at least 5 images");
                return;
              }
            } else if (page == 3) {
              submitForm(formData);
              return;
            }
            setPage((page) => page + 1);
          }}
        >
          <div>
            {/* Form-Body */}
            <div>{RenderFormBody(page)}</div>

            {/* Form-footer */}
            <div className="my-10 pr-5 h-fit flex gap-x-3 justify-end md:pr-0">
              <input
                type="button"
                value="Back"
                className={`border-[0.5px] rounded-md font-bold px-7 py-[10px] ${
                  page == 3
                    ? "bg-[#E8EDF2] text-black"
                    : "border-amber-500  text-white"
                }  `}
                onClick={() => {
                  setPage((page) => page - 1);
                }}
                disabled={page == 0}
                hidden={page == 0}
              />
              <input
                type="submit"
                value="Next"
                className="border-[0.5px] border-amber-500 rounded-md bg-yellow-500 font-bold px-7 py-[10px] text-black"
                disabled={page == 3}
                hidden={page == 3}
              />
              <input
                type="submit"
                value="Submit"
                className="rounded-md bg-[#04AA6D] font-bold px-7 py-[10px] text-gray-200"
                hidden={page != 3}
                disabled={page != 3}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
