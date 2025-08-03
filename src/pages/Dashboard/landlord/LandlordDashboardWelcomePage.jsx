import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

import Popup from "reactjs-popup";
import { FaRegCopy } from "react-icons/fa6";

// added toast notification for share property
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API } from "../../../config/axios";
import defaultHouse from "../../../assets/propertyListing/defaultHouse.png";

const LandlordDashboardWelcomePage = ({ favouriteList = [] }) => {
  const [myProperties, setMyProperties] = useState([]);
  const authState = useSelector((state) => state.auth);
  const [showOption, setShowOption] = useState(null);

  const [localFavouriteList, setLocalFavouriteList] = useState(favouriteList);

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
        toast.success("Removed from favorites!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove from favorites");
    }
  };

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
        setMyProperties(properties); // Store the fetched data in backendData
      } catch (error) {
        console.log("this is the error", error);
      }
    };

    fetchMyProperties();
  }, [authState?.userData?.id]);

  const phoneRef = useRef(null);
  const navigate = useNavigate();
  const phone = 8707727347;
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (phoneRef.current && !event.target.closest(".contact-support-box")) {
        setShowNumber(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // States to track liked status for each property
  const [likedProperties, setLikedProperties] = useState([false, false, false]);

  const removeFromWelcomeDashboard = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
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

      setMyProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  // Add Edit button and handleEdit function
  const handleEdit = (property) => {
    navigate(`/landlord-dashboard/edit-properties/${property._id}`);
  };
  const toggleOption = (id) => {
    setShowOption((prev) => (prev === id ? null : id));
  };
  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      const response = await API.delete(`property/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Property deleted successfully!");
      setMyProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        `Error: ${
          error.response?.data?.message ||
          error.message ||
          "Failed to delete property"
        }`
      );
    }
  };

  // IMPLEMETING SHARE ICON FUNCTIONALITY WITH SLUGS
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

  const handleImageError = (e) => {
    e.target.src = defaultHouse;
  };

  const cards = myProperties.map((property) => (
    <div key={property._id} className=" bg-black p-4 rounded-md sm:px-1 py-4">
      <img
        src={property.images[0]}
        alt="Property"
        className=" relative  h-[200px] w-full object-cover rounded-md  mb-4 hover:cursor-pointer"
        onClick={() => navigate(`/property/${property.slug}`)}
        onError={handleImageError}
      />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {property?.firstName} {property?.lastName}
        </h3>

        {/* Icons Section */}
        <div className="icon-box flex items-center justify-center">
          {/* <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "10px" }}
          >
            <CiHeart className="bg-[#3E3E3E4D] relative text-red-600 mt-1 h-[20px] w-[20px] p-[3px]" />
          </a> */}
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
                className="group relative flex items-center justify-center mt-1"
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

          <Popup
            arrow={false}
            trigger={
              <button
                className="group relative flex items-center justify-center"
                style={{ width: "25px", height: "25px", left: "10px" }}
              >
                <CiShare2
                  className="bg-[#3E3E3E4D] h-[20px] w-[20px] p-[3px] mt-1"
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
          {/* <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "12px" }}
            onClick={(event) => {
              event.preventDefault();
              shareProperty(property.slug);
            }}
          >
            <CiShare2
              className="card_icon bg-[#3E3E3E4D] mt-1 h-[20px] w-[20px] p-[3px]"
              style={{ color: "#40B5A8" }}
            />
          </a> */}

          <div className="relative ml-[10px] ">
            {/* More Options (Three Dots) */}
            <button
              onClick={() => toggleOption(property._id)}
              className="p-1 rounded-md mt-1"
              style={{ width: "25px", height: "25px" }}
            >
              <MdMoreVert className="bg-[#3E3E3E4D] h-[20px] w-[20px] p-[3px]" />
            </button>
            {/* Dropdown Menu */}
            {showOption === property._id && (
              <div className="absolute right-0 mt-2 w-20 bg-white shadow-md rounded-md text-black overflow-hidden">
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
          </div>
        </div>
      </div>
      <p className="text-gray-400">
        {property.locality}, {property.city}, India
      </p>
      <p className="text-gray-400 mt-1">Rs. {property.rent}</p>
    </div>
  ));

  return (
    <div className="bg-black text-white">
      {/* Header (Welcome Message) */}
      <div className="mb-8 mx-3 sm:text-center max-sm:mt-4 xl:mt-4 xl:mb-6">
        <h1 className="max-sm:text-center text-3xl font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-left max-sm:pt-4">
          {authState.userData
            ? authState.userData.firstName?.charAt(0).toUpperCase() +
              authState.userData.firstName?.slice(1).toLowerCase()
            : "User"}
          ! Welcome to your Dashboard.
        </h1>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-col gap-y-8 xl:gap-y-7 m-3">
        <h2 className="text-xl font-bold sm:text-lg text-center md:text-xl lg:text-2xl xl:text-left xl:text-lg">
          Quick Actions
        </h2>
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between items-center border-[1.13px] border-[#C8A117] p-[22.5px] rounded-xl lg:w-[100%] lg:p-2 xl:p-4">
          <div className="w-full text-center sm:text-center md:text-left justify-center items-center">
            <h2 className="text-lg font-bold text-center lg:text-left xl:text-left px-2">
              Add a new property
            </h2>
            <p className="text-gray-400 py-2 sm:text-sm text-center md:text-base lg:text-lg xl:text-sm xl:text-left px-2 xl:py-1">
              Easily add a property to your account
            </p>
          </div>
          <Link
            to="add-properties"
            className="bg-gray-800 text-white py-2 px-6 rounded cursor-pointer block text-center w-full sm:w-full md:w-full lg:w-1/2 mt-3 sm:mt-3 md:mt-3 lg:mt-0"
          >
            Add Property
          </Link>
        </div>

        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between items-center border-[1.13px] border-[#C8A117] p-[22.5px] rounded-xl lg:w-[100%] lg:p-2 xl:p-4">
          <div className="w-full text-center sm:text-center md:text-left">
            <h2 className="text-lg font-bold text-center lg:text-left xl:text-left px-2">
              Get help with an issue
            </h2>
            <p className="text-lg leading-7 text-gray-400 py-2 sm:text-sm text-center md:text-base lg:text-lg px-2 xl:text-sm xl:text-left xl:py-1">
              Need help with something? We're here to help
            </p>
          </div>
          <Link
            to="/contact"
            className="bg-gray-800 text-white py-2 px-6 rounded cursor-pointer block text-center w-full sm:w-full md:w-full lg:w-1/2 mt-3 sm:mt-3 md:mt-3 lg:mt-0"
          >
            🎧 Contact Support
          </Link>
        </div>
      </div>
      {/* Recent Properties */}
      <div className="mt-8 mx-3 ">
        <h2 className="text-2xl text-left font-semibold mb-4 sm:text-center xl:text-lg xl:text-left">
          Recent Properties
        </h2>
        {myProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.slice(0, 3)}

              {/* import MyProperty */}
              {/* <MyProperty /> */}
            </div>
            <div className="flex justify-center md:justify-end items-center mt-6 mb-16">
              <Link
                to="my-properties"
                className="bg-gray-800 text-white py-2 px-4 rounded"
              >
                View all ({myProperties.length})
              </Link>
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center text-2xl text-bold py-4 sm:text-lg md:text-xl xl:text-xl">
            You have no properties yet !
          </p>
        )}
      </div>
    </div>
  );
};

export default LandlordDashboardWelcomePage;
