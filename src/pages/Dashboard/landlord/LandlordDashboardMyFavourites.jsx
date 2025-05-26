import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";
// added toast notification for share property
import { toast } from "react-toastify";

import { useStateValue } from "../../../StateProvider";
import { IoAdd, IoRemove } from "react-icons/io5";

import Popup from "reactjs-popup";
import { FaHeart, FaRegCopy } from "react-icons/fa6";

import defaultHouse from "../../../assets/propertyListing/defaultHouse.png"

import "react-toastify/dist/ReactToastify.css";

import { API } from "../../../config/axios";

export default function MyProperties() {
  const [favouriteProperties, setFavouriteProperties] = useState([]);
  const [showOption, setShowOption] = useState(null);
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [{ compareProperty }, dispatch] = useStateValue();

  const addToCompare = (property) => {
    if (compareProperty.length < 4 && !isInCompareList(property)) {
      dispatch({
        type: "ADD_TO_COMPARE",
        item: property,
      });
    }
  };

  const removeFromCompare = (property) => {
    dispatch({
      type: "REMOVE_FROM_COMPARE",
      item: property,
    });
  };

  const isInCompareList = (property) => {
    return compareProperty.some((item) => item._id === property._id);
  };



  // TO SHOW THE NUMBER OF PROPERTIES THAT WILL BE DISPLAYED IN STARTING
  const [showCount, setShowCount] = useState(3);

  const toggleOption = (id) => {
    setShowOption((prev) => (prev === id ? null : id));
  };

  const removeFromFavorites = async (propertyId) => {
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

      setFavouriteProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
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

        const favouriteProperties = response.data.favourites;

        console.log(response.data);

        setFavouriteProperties(favouriteProperties);
      } catch (error) {
        console.log("Error fetching favourite properties:", error);
      }
    };
    fetchFavouriteProperties();
  }, []);

  // IMPLEMETING SHARE ICON FUNCTIONALITY WITH SLUGS
  const shareProperty = async (slug) => {
    const propertyUrl = `${window.location.origin}/property/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          url: propertyUrl,
        });
      } catch (error) {
        console.error("Error sharing ", error);
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
  // const handleEdit = (property) => {
  //   navigate(`/landlord-dashboard/edit-properties/${property._id}`);
  // };

  // DELETE BUTTON
  const handleDelete = (propertyId) => {
    removeFromFavorites(propertyId);
  };

  const handleImageError = (e) => {
      e.target.src = defaultHouse; // Replace with your fallback image path
    };
  

  return (
    <>
      <div className="mt-7 md:mt-5">
        {/* SORT BY SECTION */}
        <h1 className="w-full text-3xl font-bold max-sm:text-center sm:ml-5 text-white">
          Favourites
        </h1>
        {favouriteProperties.length > 0 ? (
          <>
            {/* THIS CODE WILL ALSO GENERATE FAVARIOUT CARDS AND ALSO SHOW ONLY 3 CARDS IN THE STARTING NO MATTER HOW MAY PROPRTIES ARE ADDED AS FAVRIOUTES */}
            {/* SLICE METHOD ALONG WITH THE MAP METHOD IS USED IN THE CHAINING  AND THE REST OF THE CODE IS SAME*/}
            {/* VIEW ALL BUTTON ADDED,  ICONS MADE AS PER FIGMA*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 min-h-screen">
              {favouriteProperties.slice(0, showCount).map((property) => (
                <div
                  key={property._id}
                  className="bg-black p-4 rounded-md hover:cursor-pointer relative"
                >
                  <img
                    src={property.images[0]}
                    alt="Property"
                    className="h-[200px] w-full object-cover rounded-md mb-4"
                    onClick={() => navigate(`/property/${property.slug}`)}
                    onError={handleImageError}
                  />
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      {property?.firstName} {property?.lastName}
                    </h3>
                    <div className="icon-box flex flex-row items-center justify-center">
                      <a
                        href="#"
                        className="relative group"
                        style={{ width: "25px", height: "25px", left: "10px"  }}
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromFavorites(property._id);
                        }}
                      >
                        <FaHeart className="bg-[#3E3E3E4D] relative text-red-600 mt-1 h-[20px] w-[20px] p-[3px]" />
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm py-1 px-2 rounded -left-7 -top-9 whitespace-nowrap">
                          Remove
                        </div>
                      </a>
                      {/* SHORTLIST FOR VISIT */}
                      <Popup
                        trigger={
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (isInCompareList(property)) {
                                removeFromCompare(property);
                              } else {
                                addToCompare(property);
                              }
                            }}
                            key={property._id}
                          >
                            {isInCompareList(property) ? (
                              <IoRemove
                                className="bg-[#3E3E3E4D] relative h-[20px] w-[20px] p-[3px] mt-1"
                                style={{ color: "#fff", fontSize: "12px", left:"9px" }}
                              />
                            ) : (
                              <IoAdd
                                className="bg-[#3E3E3E4D] relative h-[20px] w-[20px] p-[3px] mt-1"
                                style={{ color: "#fff", fontSize: "12px", left:"9px" }}
                              />
                            )}
                          </a>
                        }
                        position="top center"
                        on="hover"
                        arrow={false}
                      >
                        <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">
                          Shortlist for Visit
                        </div>
                      </Popup>

                      {/* SHARE PROPERTY ICON WITH FUNCTIONALITY */}
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
                          className="bg-[#3E3E3E4D] h-[20px] w-[20px] p-[3px] mt-1"
                          style={{ color: "#40B5A8" }}
                        />
                      </a> */}
                      <Popup
                        arrow={false}
                        trigger={
                          <button className="group relative flex items-center justify-center"
                            style={{ width: "25px", height: "25px", left: "10px" }}>
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

                      {/* More Options (Three Dots) */}
                      <div className="relative group " 
                        style={{ width: "25px", height: "25px", left: "7px" }}
                      >
                        {/* More Options (Three Dots) */}
                        <button
                          onClick={() => toggleOption(property._id)}
                          className="p-1 rounded-md"
                        >
                          <MdMoreVert className="bg-[#3E3E3E4D] h-[20px] w-[20px] p-[3px] " />
                        </button>
                        {/* Dropdown Menu */}
                        {showOption === property._id && (
                          <div className="absolute right-0 mt-2 w-20 bg-white shadow-md rounded-md text-black overflow-hidden">
                            {/* <button
                              onClick={() => handleEdit(property)}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 w-full text-sm"
                            >
                              Edit
                            </button> */}
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
              ))}
            </div>

            {/* VIEW ALL BUTTON */}
            {showCount < favouriteProperties.length && (
              <div className="text-center mb-12 mt-6">
                <button
                  onClick={() => setShowCount((prev) => prev + 3)} // THIS WILL LOAD 3 MORE CARDS
                  className="bg-[#212629] px-6 py-2 rounded-md text-lg font-medium text-gray-400 active:bg-[#5edbd3] transition active:text-gray-900"
                >
                  View all ({favouriteProperties.length - showCount})
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 min-h-screen">
            <h6 className="text-gray-400 text-center text-xl sm:text-3xl font-bold py-4">
              You have no favourites yet!
            </h6>
          </div>
        )}
      </div>
    </>
  );
}
