import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";

import Popup from "reactjs-popup";

import { API } from "../../../config/axios";

export default function MyProperties({ favouriteList = [] }) {
  const [myProperties, setMyProperties] = useState([]);
  const [localFavouriteList, setLocalFavouriteList] = useState(favouriteList);

  const [showOption, setShowOption] = useState(null);
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  const toggleOption = (id) => {
    setShowOption((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        if (!authState?.userData?.id) {
          return;
        }

        const response = await API.get(
          `property/user/${authState.userData.id}`
        );
        const properties = response.data;
        // return response.data;
        setMyProperties(properties);
        // toast.success("Removed from favorites!");
        setLocalFavouriteList(favouriteList.filter((id) => id !== properties));
      } catch (error) {
        console.log("Error fetching properties:", error);
      }
    };
    fetchMyProperties();
  }, [authState]);

  useEffect(() => {
    const fetchFavouriteProperties = async () => {
      try {
        if (!authState?.userData?.id) {
          return;
        }

        const token = localStorage.getItem("token");

        const response = await API.post(
          "user/getFavourites",
          {
            userId: authState.userData.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const favouriteList = response.data.favouritesList.favourites;

        console.log(favouriteList);

        setLocalFavouriteList(favouriteList);
      } catch (error) {
        console.log("Error fetching favourite properties:", error);
      }
    };
    fetchFavouriteProperties();
  }, []);

  const addToFavourites = async (propertyId) => {
    try {
      if (!authState?.userData?.id) {
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }

      console.log(authState.userData.id);

      const token = localStorage.getItem("token");

      const response = await API.post(
        `user/addToFavourites`,
        {
          userId: authState.userData.id,
          propertyId: propertyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setLocalFavouriteList((prevList) => {
          const updatedList = [...prevList, propertyId];

          setTimeout(() => toast.success("Added to favorites!"), 100); // Delay toast
          return updatedList;
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to favorites");
    }
  };

  const removeFromFavourites = async (propertyId) => {
    try {
      if (!authState?.userData?.id) {
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }

      const token = localStorage.getItem("token");

      const response = await API.post(
        "user/removeFromFavourites",
        {
          userId: authState.userData.id,
          propertyId: propertyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setLocalFavouriteList((prevList) =>
          prevList.filter((id) => id !== propertyId)
        );
        setTimeout(() => toast.success("Removed from favorites!"), 100);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove from favorites");
    }
  };

  // share icons functionality
  const shareProperty = async (slug) => {
    const propertyUrl = `${window.location.origin}/property/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          url: propertyUrl,
        });
      } catch (error) {
        console.error("Error sahring ", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(propertyUrl);
        toast.success("Proprty link is coppied to your clipboard", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } catch (error) {
        console.error("Failed to copy ", error);
        toast.error("Failed to copy link", { theme: "dark" });
      }
    }
  };
  // Add Edit button and handleEdit function
  const handleEdit = (property) => {
    navigate(`/landlord-dashboard/edit-properties/${property._id}`);
  };

  // Handle Delete function
  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      const response = await API.delete(`property/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // With axios, response.data contains the parsed JSON
      if (response.status !== 200) {
        throw new Error(response.data?.message || "Failed to delete property");
      }

      toast.success("Property deleted successfully!");
      setMyProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // handle toggle availabilityStatus
  const handleToggleAvailability = async (propertyId, currentStatus) => {
    try {
      const response = await API.patch(
        `property/update-property-availability-status/${propertyId}`,
        {
          userId: authState?.userData?.id,
          availabilityStatus:
            currentStatus === "Available" ? "Rented Out" : "Available",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // With axios, response.data contains the parsed JSON
      if (response.status !== 200) {
        throw new Error(response.data?.message || "Failed to update status");
      }

      toast.success("Property availability status updated successfully!");
      setMyProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === propertyId
            ? {
                ...property,
                availabilityStatus:
                  currentStatus === "Available" ? "Rented Out" : "Available",
              }
            : property
        )
      );
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const cards = myProperties.map((property) => (
    <div
      key={property._id}
      className=" bg-black p-4 rounded-md hover:cursor-pointer relative"
    >
      <div className="relative">
        <img
          src={property.images[0]}
          alt="Property"
          className="relative h-[200px] w-full object-cover rounded-md mb-4"
          onClick={() => navigate(`/property/${property.slug}`)}
        />
        <div
          onClick={() =>
            handleToggleAvailability(property._id, property.availabilityStatus)
          }
          className="absolute top-4 left-4 text-white/75 lg:text-white text-xs lg:text-base uppercase px-1 lg:px-3 py-1 rounded-md"
          style={{
            backgroundColor:
              property.availabilityStatus === "Available"
                ? "#236b62"
                : "#c71221",
            textTransform: "capitalize",
          }}
        >
          {property.availabilityStatus}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {property?.firstName} {property?.lastName}
        </h3>
        <div className="icon-box flex items-center justify-center">
          {/* Add to Favorite */}
          <Popup
            trigger={
              <button
                style={{ width: "25px", height: "25px", left: "8px" }}
                onClick={(e) => {
                  e.preventDefault();
                  localFavouriteList.includes(property._id)
                    ? removeFromFavourites(property._id)
                    : addToFavourites(property._id);
                }}
                className="group relative flex items-center justify-center"
              >
                {localFavouriteList.includes(property._id) ? (
                  <FaHeart className="text-red-500 transition-all duration-300 group-hover:scale-110" />
                ) : (
                  <CiHeart className="text-red-500 transition-all duration-300 group-hover:text-red-800 group-hover:scale-110 bg-[#3E3E3E4D] h-[20px] w-[20px] p-[3px]" />
                )}
              </button>
            }
            position="top center"
            on="hover"
            arrow={false}
            contentStyle={{ textAlign: "center" }}
          >
            <div className="bg-gray-800 text-white text-center sm:text-center px-2 py-1 rounded text-sm">
              {localFavouriteList.includes(property._id)
                ? "Remove from Favorite"
                : "Add to Favorite"}
            </div>
          </Popup>

          {/* SHARE PROPERTY ICON WITH FUNCTIONALITY */}
          {/* <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "10px" }}
            onClick={(event) => {
              event.preventDefault();
              shareProperty(property.slug);
            }}
          >
            <CiShare2
              className="bg-[#3E3E3E4D] h-[20px] w-[20px] p-[3px] mt-1"
              style={{ color: "#40B5A8" }}
            />
          </a> */}
          <Popup
            arrow={false}
            trigger={
              <button
                className="group relative flex items-center justify-center"
                style={{ width: "25px", height: "25px", left: "8px" }}
              >
                <CiShare2
                  className="bg-[#3E3E3E4D] h-[20px] w-[20px] p-[3px]"
                  style={{ color: "#40B5A8" }}
                />
              </button>
            }
            position={"bottom right"}
          >
            {(close) => (
              <div className="bg-slate-50 text-black rounded-full flex flex-col shadow-xl py-2 px-2 scale-90">
                <div className="flex items-center gap-12 border border-black rounded-3xl px-2">
                  <div className="px-2 py-2 text-sm truncate w-32">
                    {`www.toletglobe.in/property/${property.slug}`}
                  </div>
                  <div>
                    <button
                      className="px-2 py-2 bg-[#40B5A8] text-white rounded-full"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `www.toletglobe.in/property/${property.slug}`
                        );
                        close();
                      }}
                    >
                      <FaRegCopy />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Popup>

          {/* new code */}
          {/* <div> */}
          {/* More Options (Three Dots) */}
          <button
            onClick={() => toggleOption(property._id)}
            className="relative rounded-md  "
            style={{ width: "25px", height: "25px", left: "10px" }}
          >
            <MdMoreVert className="bg-[#3E3E3E4D] h-[20px] w-[20px] p-[3px] " />
          </button>
          {/* Dropdown Menu */}
          {showOption === property._id && (
            <div className="absolute right-0 mt-[6.2rem] w-20 bg-white shadow-md rounded-md text-black overflow-hidden">
              <button
                onClick={() => handleEdit(property)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 w-full text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(property._id)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 w-full text-sm"
              >
                Delete
              </button>
            </div>
          )}
          {/* </div> */}
        </div>
      </div>
      <p className="text-gray-400">
        {property.locality}, {property.city}, India
      </p>
      <p className="text-gray-400 mt-1">Rs. {property.rent}</p>
    </div>
  ));

  return (
    <>
      <div className="mt-7 md:mt-5">
        <h1 className="w-full max-sm:text-center sm:ml-5 text-3xl font-bold text-white">
          My Properties
        </h1>
        {myProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pr-2">
            {cards}
          </div>
        ) : (
          <div className="mt-10 min-h-screen">
            <h6 className="text-gray-400 text-center text-xl sm:text-3xl font-bold py-4">
              You have no properties yet!
            </h6>
          </div>
        )}
      </div>
    </>
  );
}
