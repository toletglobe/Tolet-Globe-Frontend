import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import Frm1 from "./AllForms/Frm1";
import Frm2 from "./AllForms/Frm2";
import Frm3 from "./AllForms/Frm3";
import Frm4 from "./AllForms/Frm4";

import { API } from "../../../config/axios";

export default function LandlordDashboardEditProperties() {
  const [page, setPage] = useState(0);
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

  const navigate = useNavigate();
  const { id } = useParams(); // Access the property ID from the route

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

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      const updatedFormData = {
        ...formData,
        appliances: formData.appliances.map((obj) => obj.value),
        amenities: formData.amenities.map((obj) => obj.value),
      };

      const dataToSend = new FormData();
      Object.entries(updatedFormData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item, index) =>
            dataToSend.append(`${key}[${index}]`, item)
          );
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
        Object.fromEntries(dataToSend),
        {
          headers: {
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
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

  const RenderFormBody = (currentPage) => {
    const formComponents = [
      <Frm1 formData={formData} setFormData={setFormData} key="Frm1" />,
      <Frm2 formData={formData} setFormData={setFormData} key="Frm2" />,
      <Frm3 formData={formData} setFormData={setFormData} key="Frm3" />,
      <Frm4 formData={formData} setFormData={setFormData} key="Frm4" />,
    ];
    return formComponents[currentPage];
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
        <div className="mt-8 flex gap-4">
          {/* Progress Bar */}
          {[...Array(page + 1)].map((_, i) => (
            <div key={i} className="bg-yellow-500 rounded-lg w-[24%] h-2"></div>
          ))}
          {[...Array(4 - (page + 1))].map((_, i) => (
            <div key={i} className="bg-white rounded-lg w-[24%] h-2"></div>
          ))}
        </div>
        <div className="text-[#4F7396] text-xs leading-5">{page + 1}/4</div>
      </div>

      {/* Form */}
      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          if (page === 3) {
            handleFormSubmit();
          } else {
            setPage((prevPage) => prevPage + 1);
          }
        }}
      >
        {/* Form Body */}
        <div>{RenderFormBody(page)}</div>

        {/* Form Footer */}
        <div className="my-10 pr-5 h-fit flex gap-x-3 justify-end md:pr-0">
          <button
            type="button"
            className={`border-[0.5px] rounded-md font-bold px-7 py-[10px] ${
              page === 0
                ? "bg-[#E8EDF2] text-black"
                : "border-amber-500 text-white"
            }`}
            onClick={() => setPage((prevPage) => prevPage - 1)}
            disabled={page === 0}
          >
            Back
          </button>
          {page < 3 ? (
            <button
              type="submit"
              className="border-[0.5px] border-amber-500 rounded-md bg-yellow-500 font-bold px-7 py-[10px] text-black"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-md bg-[#04AA6D] font-bold px-7 py-[10px] text-gray-200"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
