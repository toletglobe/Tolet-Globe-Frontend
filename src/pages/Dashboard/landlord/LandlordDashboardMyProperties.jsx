// import propertyimage1 from "../../../assets/property/blog-1.png";
// import propertyimage2 from "../../../assets/property/blog-2.jpg";
// import propertyimage3 from "../../../assets/property/blog-3.jpg";
import Service from "../../../config/config";
import { BASE_URL } from "../../../constant/constant";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdDelete, MdMoreVert } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MyProperties() {
  
  const [myProperties, setMyProperties] = useState([]);
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
        const properties = await Service.fetchMyProperties(
          authState.userData.id
        );
        setMyProperties(properties); // Store the fetched data in backendData
      } catch (error) {
        console.log("this is the error", error);
      }
    };

    fetchMyProperties();
  }, [authState?.userData?.id]);


  
 // Handle Delete function
  const handleDelete = async (property) => {
    try {
      const response = await fetch(`${BASE_URL}property/${property}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${authState?.userData?.id}`,
        },        
      });

      if (response.ok) {
        alert("Property deleted successfully!");
        setMyProperties((prevProperties) =>
          prevProperties.filter(
            (currentProperty) => currentProperty._id !== property
          )
        );
      } else {
        alert("Failed to delete property!");
      }
    } catch (error) {
      console.error("Error deleting property :", error);
      alert("An error occurred");
    }
  };

  const cards = myProperties.map((property) => (
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

        {/* Icons Section */}
        <div className="icon-box flex mr-6 p-2">
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "10px" }}
          >
            <CiHeart className="card_icon text-red-500 bg-[#3E3E3E4D] relative" />
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
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "30px" }}
            onClick={() => toggleOption(property._id)}
          >
            <MdMoreVert
              className="card_icon bg-[#3E3E3E4D]"
              style={{ color: "#808080", fontSize: "16px" }} // Adjust size if needed
            />
          </a>

          {/* Show Options */}
          {showOption === property._id && (
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
            </div>
          )}
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
      <div className="mt-8 flex justify-start space-x-4 mb-6">
        {/* Filter Buttons */}
        <button className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600">
          Available
        </button>
        <button className="px-4 py-2 bg-white text-black font-semibold rounded-md border border-gray-400 hover:bg-gray-200">
          Rent Out
        </button>
      </div>

      <div className="mt-8">
        {myProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards}
          </div>
        ) : (
          <h6 className="text-gray-400 text-center text-3xl font-bold ">
            You have no properties yet!
          </h6>
        )}
      </div>
    </>
  );
}
