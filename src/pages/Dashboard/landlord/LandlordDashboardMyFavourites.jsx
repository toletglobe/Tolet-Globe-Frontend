import Service from "../../../config/config";
import { BASE_URL } from "../../../constant/constant";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// added toast notification for share property 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyProperties() {
  const [favouriteProperties, setFavouriteProperties] = useState([]);
  const [showOption, setShowOption] = useState(null);
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  // TO SHOW THE NUMBER OF PROPERTIES THAT WILL BE DISPLAYED IN STARTING
  const [showCount, setShowCount] = useState(3);

  const toggleOption = (id) => {
    setShowOption((prev) => (prev === id ? null : id));
  };

  const removeFromFavorites = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}user/removeFromFavourites`,
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

        const response = await axios.post(
          `${BASE_URL}user/getFavourites`,
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
        console.error("Error sahring ", error);
      }
    }
    else {
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
        toast.error("Failed to copy link", { theme: "dark" })
      }
    }
  }

  // Add Edit button and handleEdit function
  const handleEdit = (property) => {
    navigate(`/landlord-dashboard/edit-properties/${property._id}`);
  };

  // DELETE BUTTON 
  const handleDelete = (propertyId) => {
    removeFromFavorites(propertyId);
  };
  // const cards = favouriteProperties.map((property) => (
  //   <div
  //     key={property._id}
  //     className=" bg-black p-4 rounded-md hover:cursor-pointer relative"
  //   >
  //     <img
  //       src={property.images[0]}
  //       alt="Property"
  //       className=" relative  h-[200px] w-full object-cover rounded-md  mb-4"
  //       onClick={() => navigate(`/property/${property.slug}`)}
  //     />
  //     <div className="flex justify-between items-center">
  //       <h3 className="text-lg font-semibold">
  //         {property?.firstName} {property?.lastName}
  //       </h3>
  //       <div className="icon-box flex mr-6 p-4">
  //         <a
  //           href="#"
  //           className="relative group"
  //           style={{ width: "25px", height: "25px", left: "10px" }}
  //           onClick={(e) => {
  //             e.preventDefault();
  //             removeFromFavorites(property._id);
  //           }}
  //         >
  //           {/* <FaHeart className="card_icon text-red-500 bg-[#3E3E3E4D] relative" /> */}
  //           <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm py-1 px-2 rounded -left-7 -top-9 whitespace-nowrap">
  //             Remove
  //           </div>
  //         </a>
  //         <a
  //           href="#"
  //           className="relative"
  //           style={{ width: "25px", height: "25px", left: "10px" }}
  //         >
  //           <CiShare2
  //             className="card_icon bg-[#3E3E3E4D] mt-1"
  //             style={{ color: "#40B5A8" }}
  //           />
  //         </a>
  //         {/* More Icon */}
  //         {/* <a
  //           href="#"
  //           className="relative"
  //           style={{ width: "25px", height: "25px", left: "30px" }}
  //           onClick={() => toggleOption(property._id)}
  //         >  
  //           <MdMoreVert
  //             className="card_icon bg-[#3E3E3E4D]"
  //             style={{ color: "#808080", fontSize: "16px" }} // Adjust size if needed
  //           />
  //         </a> */}

  //         {/* Show Options */}
  //         {/* {showOption === property._id && (
  //           <div
  //             className={
  //               "absolute bg-gray-700 border border-gray-300  hover:bg-gray-900 rounded-md shadow-md p-2 -mx-10"
  //             }
  //           >
  //             <button
  //               className="text-[17px] font-medium text-white hover:text-red-500 flex justify-center items-center mx-2 gap-2"
  //               onClick={() => handleDelete(property._id)}
  //             >
  //               <MdDelete
  //                 size={20}
  //                 style={{ color: "#808080", fontSize: "16px" }}
  //               />
  //               Delete
  //             </button>

  //             <button
  //               className="text-[17px] font-medium text-white hover:text-blue-500 flex justify-center items-center mx-2 gap-2"
  //               onClick={() => handleEdit(property)}
  //             >
  //               <MdEdit size={20} style={{ color: "#808080" }} /> Edit
  //             </button>
  //           </div>
  //         )} */}
  //       </div>
  //     </div>
  //     <p className="text-gray-400">
  //       {property.locality}, {property.city}, India
  //     </p>
  //     <p className="text-gray-400 mt-1">Rs. {property.rent}</p>
  //   </div>
  // ));

  return (
    <>
      {/* <div className="mt-8">
        {favouriteProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards}
          </div>
        ) : (
          <div>
            <h6 className="text-white text-center text-3xl font-bold ">Your Favourites!</h6>
            <h6 className="text-gray-400 text-center text-xl sm:text-3xl font-bold py-4">
              You have no favourites yet!
            </h6>
          </div>
        )}
      </div> */}
      <div className="mt-8 md:mt-4">
        {/* SORT BY SECTION */}
        <h1 className="text-2xl md:text-3xl font-bold text-white ml-4">Sort by</h1>
        <div className="my-4 md:my-6 flex gap-3 items-center justify-start ml-4">
          <div className="bg-gray-300 py-2 px-3 md:px-5 md:py-2  rounded-xl ">
            <h2 className="text-black md:text-[18px]">Most recent</h2>
          </div>
          <div className="bg-gray-300 py-2 px-3 md:px-5 md:py-2 rounded-xl">
            <span className="text-black md:text-[18px]">A-Z</span>
          </div>
          <div className="bg-gray-300 py-2 px-3 md:px-5 md:py-2 rounded-xl">
            <span className="text-black md:text-[18px]">Z-A</span>
          </div>
        </div>
        {favouriteProperties.length > 0 ? (
          <>
            {/* THIS CODE WILL ALSO GENERATE FAVARIOUT CARDS AND ALSO SHOW ONLY 3 CARDS IN THE STARTING NO MATTER HOW MAY PROPRTIES ARE ADDED AS FAVRIOUTES */}
            {/* SLICE METHOD ALONG WITH THE MAP METHOD IS USED IN THE CHAINING  AND THE REST OF THE CODE IS SAME*/}
            {/* VIEW ALL BUTTON ADDED,  ICONS MADE AS PER FIGMA*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  />
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      {property?.firstName} {property?.lastName}
                    </h3>
                    <div className="icon-box flex items-center justify-center">
                      <a
                        href="#"
                        className="relative group"
                        style={{ width: "25px", height: "25px", left: "10px" }}
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromFavorites(property._id);
                        }}
                      >
                        {/* <FaHeart className="card_icon text-red-500 bg-[#3E3E3E4D] relative" /> */}
                        <CiHeart className="bg-[#3E3E3E4D] relative text-red-600 mt-1 h-[20px] w-[20px] p-[3px]" />
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm py-1 px-2 rounded -left-7 -top-9 whitespace-nowrap">
                          Remove
                        </div>
                      </a>

                      {/* SHARE PROPERTY ICON WITH FUNCTIONALITY */}
                      <a
                        href="#"
                        className="relative"
                        style={{ width: "25px", height: "25px", left: "12px" }}
                        onClick={(event) => {
                          event.preventDefault();
                          shareProperty(property.slug)
                        }}
                      >
                        <CiShare2
                          className="card_icon bg-[#3E3E3E4D] mt-1 h-[20px] w-[20px] p-[3px]"
                          style={{ color: "#40B5A8" }}
                        />
                      </a>
                      {/* <a href="#" className="relative left-[14px]">
                        <MdMoreVert className="bg-[#3E3E3E4D] h-[20px] w-[20px] p-[3px] mt-1" />
                      </a> */}
                      <div className="relative ml-[10px] ">
                        {/* More Options (Three Dots) */}
                        <button
                          onClick={() => toggleOption(property._id)}
                          className="p-1 rounded-md"
                        >
                          <MdMoreVert className="bg-[#3E3E3E4D] h-[20px] w-[20px] p-[3px] mt-1" />
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
                  <p className="text-gray-400">{property.locality}, {property.city}, India</p>
                  <p className="text-gray-400 mt-1">Rs. {property.rent}</p>
                </div>
              ))}
            </div>

            {/* VIEW ALL BUTTON */}
            {
              showCount < favouriteProperties.length && (
                <div className="text-center mb-12 mt-6">
                  <button
                    onClick={() => setShowCount((prev) => prev + 3)} // THIS WILL LOAD 3 MORE CARDS
                    className="bg-[#212629] px-6 py-2 rounded-md text-lg font-medium text-gray-400 active:bg-[#5edbd3] transition active:text-gray-900"
                  >
                    View all ({favouriteProperties.length - showCount})
                  </button>
                </div>
              )
            }
          </>
        ) : (
          <div>
            <h6 className="text-white text-center text-3xl font-bold">Your Favourites!</h6>
            <h6 className="text-gray-400 text-center text-xl sm:text-3xl font-bold py-4">
              You have no favourites yet!
            </h6>
          </div>
        )}
      </div>
    </>
  );
}