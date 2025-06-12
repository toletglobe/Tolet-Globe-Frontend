import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import Form from "./NewForm/components/Details";
import AdditionalInfo from "./NewForm/components/AdditionalInfo";
// import Coupon from "./NewForm/components/Coupon";
import ImageUpload from "./NewForm/components/ImageUpload";

import { API } from "../../../config/axios";
import { useSelector } from "react-redux";

export default function LandlordDashboardEditProperties() {
  // const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const navigate = useNavigate();
  const { id } = useParams(); // Access the property ID from the route
  const authState = useSelector((state) => state.auth);
  const userInfo = authState?.userData || {};

  useEffect(() => {
    // Fetch property details on component mount
    const fetchPropertyDetails = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/property/${id}`);
        setFormData(data); // Pre-fill the form with fetched property data
      } catch (error) {
        console.error("Error fetching property details:", error);
        toast.error("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const updatedFormData = {
        ...formData,
        userId: userInfo.id,
        pincode: Number(formData.pincode),
        appliances: formData.appliances.map((item) =>
          typeof item === "object" && item !== null ? item.value : item
        ),
        amenities: formData.amenities.map((item) =>
          typeof item === "object" && item !== null ? item.value : item
        ),
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

      console.log("-> updated from data : ", updatedFormData);
      console.log("-> pincode : ", updatedFormData.pincode);
      console.log("-> Data to send : ", Object.fromEntries(dataToSend));

      // Send updated data to backend

      const { data } = await API.patch(
        `/property/update-property/${id}`,
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("res : ", data);

      toast.success("Property updated successfully!");
      navigate(`/property/${data.property.slug}`); // Navigate back to the property details page
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Failed to update property.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="ml-5 mt-5 mb-8 pr-5 flex flex-col gap-2 md:pr-0">
        <h1 className="text-center text-[#FFFFFF] text-[33px] leading-10 font-bold md:text-left">
          Edit Property
        </h1>
        {/* <div className="mt-8 flex gap-4">
           Progress Bar
          {[...Array(page + 1)].map((_, i) => (
            <div key={i} className="bg-yellow-500 rounded-lg w-[24%] h-2"></div>
          ))}
          {[...Array(4 - (page + 1))].map((_, i) => (
            <div key={i} className="bg-white rounded-lg w-[24%] h-2"></div>
          ))}
        </div>
        <div className="text-[#4F7396] text-xs leading-5">{page + 1}/4</div> */}
      </div>

      {/* Form */}
      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit(formData);
          return;
        }}
      >
        {/* Form Body */}
        <div>
          <Form formData={formData} setFormData={setFormData} />
          <AdditionalInfo formData={formData} setFormData={setFormData} />
          {/* <Coupon /> */}
          <ImageUpload formData={formData} setFormData={setFormData} />
        </div>

        {/* Form Footer */}
        <div className="my-10 pr-5 h-fit flex gap-x-3 justify-end md:pr-0">
          <button
            type="submit"
            className="border-[0.5px] rounded-md bg-white font-bold px-7 py-[10px] text-black"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#04AA6D] font-bold px-7 py-[10px] text-gray-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
