import React, { useState } from "react";
import {
  MdSchool,
  MdRestaurant,
  MdShoppingBag,
  MdLocalCafe,
  MdMoney,
  MdStore,
  MdFitnessCenter,
  MdDirectionsBus,
} from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const LocationComponent = ({ property, selectComp }) => {
  // State to track which category is selected
  const [selectedCategory, setSelectedCategory] = useState("location");

  // Function to handle button click
  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  // Function to get the map source URL based on the selected category
  const getMapSrc = () => {
    switch (selectedCategory) {
      case "school":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.60187910736!2d80.93580081149348!3d26.85664202697483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomtinagar%20map%20school!5e0!3m2!1sen!2sin!4v1724867053652!5m2!1sen!2sin"; // Replace with the actual URL for school locations
      case "restaurant":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20restaurants!5e0!3m2!1sen!2sin!4v1724867399676!5m2!1sen!2sin"; // Replace with the actual URL for restaurant locations
      case "groceries":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20GROCERIES!5e0!3m2!1sen!2sin!4v1724867603540!5m2!1sen!2sin"; // Replace with the actual URL for groceries locations
      case "cafe":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20cafe!5e0!3m2!1sen!2sin!4v1724867650408!5m2!1sen!2sin"; // Replace with the actual URL for cafe locations
      case "banks":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20bank!5e0!3m2!1sen!2sin!4v1724867696805!5m2!1sen!2sin"; // Replace with the actual URL for banks locations
      case "shops":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20shops!5e0!3m2!1sen!2sin!4v1724867727775!5m2!1sen!2sin"; // Replace with the actual URL for shops locations
      case "fitness":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20gym!5e0!3m2!1sen!2sin!4v1724867781416!5m2!1sen!2sin"; // Replace with the actual URL for fitness centers
      case "transport":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20transport!5e0!3m2!1sen!2sin!4v1724867811707!5m2!1sen!2sin"; // Replace with the actual URL for transport
      default:
        // console.log("MAP", property);
        // console.log(property?.locationLink);
        // return property?.locationLink;

        return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.7374841447!2d80.88487084258148!3d26.848163621554857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be314f43454e5%3A0x111085c9b254d27c!2sBLOCK%20B!5e0!3m2!1sen!2sin!4v1724437712311!5m2!1sen!2sin"; // Default location
    }
  };

  // console.log(property);

  return (
    <div className={`pb-4 ${selectComp > 5 ? "hidden" : ""}`}>
      <div className={`bg-white w-full rounded-md p-3`}>
        <p className="text-black block font-semibold text-xl">Location</p>

        <div className="w-full md:w-4/5">
          <div className="flex flex-col sm:flex-row justify-between">
            <p className="text-gray-400">
              {property?.address || "Address not available"}, {property?.city}
            </p>

            <p className="font-semibold text-teal-500 sm:mt-0 mt-2">
              Get Directions
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-4/5 mb-2 relative">
          <div className="w-full h-full absolute backdrop-blur-sm bg-black/40 flex justify-center items-center"><RiLock2Fill color="#ffffff" size={30} /></div>
            <div className="w-full">
              <iframe
                key={selectedCategory} // Add this key prop
                src={getMapSrc()}
                // src={property?.locationLink}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Location Map"
              />
            </div>
          </div>

          <div className="pl-0 md:pl-4 md:w-1/5">
            {[
              { icon: <MdSchool />, label: "School", category: "school" },
              {
                icon: <MdRestaurant />,
                label: "Restaurants",
                category: "restaurant",
              },
              {
                icon: <MdShoppingBag />,
                label: "Groceries",
                category: "groceries",
              },
              { icon: <MdLocalCafe />, label: "Cafe", category: "cafe" },
              { icon: <MdMoney />, label: "Banks", category: "banks" },
              { icon: <MdStore />, label: "Shops", category: "shops" },
              {
                icon: <MdFitnessCenter />,
                label: "Fitness",
                category: "fitness",
              },
              {
                icon: <MdDirectionsBus />,
                label: "Transport",
                category: "transport",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`border flex mb-2  p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto ${
                  selectedCategory === item.category ? "bg-green-400" : ""
                }`}
                onClick={() => handleButtonClick(item.category)}
              >
                <div className="flex w-1/2 justify-end">
                  <div className="h-6 w-6 mr-2 mt-2  text-black">
                    {item.icon}
                  </div>
                </div>
                <p className="inline pb-0 mb-0 text-lg">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;
