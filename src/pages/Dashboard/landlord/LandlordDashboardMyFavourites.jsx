import Service from "../../../config/config";
import { BASE_URL } from "../../../constant/constant";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function MyProperties() {
  const [favouriteProperties, setFavouriteProperties] = useState([]);
  const [showOption, setShowOption] = useState(null);
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

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

  const cards = favouriteProperties.map((property) => (
    <div
      key={property._id}
      className=" bg-black p-4 rounded-md hover:cursor-pointer relative"
    >
      <img
        src={property.images[0]}
        alt="Property"
        className=" relative  h-[200px] w-full object-cover rounded-md  mb-4"
        onClick={() => navigate(`/property/${property.slug}`)}
      />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {property?.firstName} {property?.lastName}
        </h3>
        <div className="icon-box flex mr-6 p-2">
          <a
            href="#"
            className="relative group"
            style={{ width: "25px", height: "25px", left: "10px" }}
            onClick={(e) => {
              e.preventDefault();
              removeFromFavorites(property._id);
            }}
          >
            <FaHeart className="card_icon text-red-500 bg-[#3E3E3E4D] relative" />
            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm py-1 px-2 rounded -left-7 -top-9 whitespace-nowrap">
              Remove
            </div>
          </a>
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "20px" }}
          >
            <CiShare2
              className="card_icon bg-[#3E3E3E4D]"
              style={{ color: "#40B5A8" }}
            />
          </a>
          {/* More Icon */}
          {/* <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "30px" }}
            onClick={() => toggleOption(property._id)}
          >
            <MdMoreVert
              className="card_icon bg-[#3E3E3E4D]"
              style={{ color: "#808080", fontSize: "16px" }} // Adjust size if needed
            />
          </a> */}

          {/* Show Options */}
          {/* {showOption === property._id && (
            <div
              className={
                "absolute bg-gray-700 border border-gray-300  hover:bg-gray-900 rounded-md shadow-md p-2 -mx-10"
              }
            >
              <button
                className="text-[17px] font-medium text-white hover:text-red-500 flex justify-center items-center mx-2 gap-2"
                onClick={() => handleDelete(property._id)}
              >
                <MdDelete
                  size={20}
                  style={{ color: "#808080", fontSize: "16px" }}
                />
                Delete
              </button>

              <button
                className="text-[17px] font-medium text-white hover:text-blue-500 flex justify-center items-center mx-2 gap-2"
                onClick={() => handleEdit(property)}
              >
                <MdEdit size={20} style={{ color: "#808080" }} /> Edit
              </button>
            </div>
          )} */}
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
      <div className="mt-8">
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
      </div>
    </>
  );
}
