import React, { useState } from "react";

const Location = ({ property, selectComp }) => {
  const [selectedCategory, setSelectedCategory] = useState("location");

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  const getMapSrc = () => {
    // Use the property's latitude and longitude for the default map
    if (selectedCategory === "location" && property?.latitude && property?.longitude) {
      return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28471.1423589176!2d${property.longitude}!3d${property.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1724867053652!5m2!1sen!2sin`;
    }

    // Nearby places search based on category
    const baseQuery = encodeURIComponent(`${property?.latitude},${property?.longitude}`);
    const placeTypes = {
      school: "school",
      restaurant: "restaurant",
      groceries: "grocery",
      cafe: "cafe",
      banks: "bank",
      shops: "shopping",
      fitness: "gym",
      transport: "bus_station"
    };

    if (placeTypes[selectedCategory]) {
      return `https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=${placeTypes[selectedCategory]}near${baseQuery}`;
    }

    // Default fallback
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28471.1423589176!2d${property?.longitude || 80.9462}!3d${property?.latitude || 26.8467}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1724867053652!5m2!1sen!2sin`;
  };

  const locationCategories = [
    { label: "School", category: "school" },
    { label: "Restaurants", category: "restaurant" },
    { label: "Groceries", category: "groceries" },
    { label: "Cafe", category: "cafe" },
    { label: "Banks", category: "banks" },
    { label: "Shops", category: "shops" },
    { label: "Fitness", category: "fitness" },
    { label: "Transport", category: "transport" },
  ];

  return (
    <div className="pb-4 bg-white rounded-2xl">
      {/* Header */}
      <div className="px-1 pt-4 pb-2">
        <div className="flex justify-between lg:w-[68%] xl:w-[69%] 2xl:w-[70%] items-center px-3 lg:px-0 lg:mx-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Location</h2>
            <p className="text-sm text-gray-600">
              {property?.address}, {property?.locality || property?.city}
            </p>
          </div>
          <p 
            className="text-teal-600 text-sm lg:pt-6 cursor-pointer" 
            onClick={() => window.open(getMapSrc(), '_blank')}
          >
            Get Direction
          </p>
        </div>
      </div>

      <div className="lg:flex lg:space-x-4 justify-between lg:mx-10">
        {/* Map */}
        <div className="lg:w-[74%] w-full h-64 lg:h-[550px]">
          <iframe
            src={getMapSrc()}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>

        {/* Categories */}
        <div className="px-3 py-3 lg:py-0 lg:pb-3 justify-between items-center gap-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-x-2 gap-y-1 text-xs lg:pl-8 items-center">
            {locationCategories.map((item, index) => (
              <div key={index} className="border border-black rounded-lg p-2 lg:w-full lg:border-none">
                <button
                  onClick={() => handleButtonClick(item.category)}
                  className="flex lg:flex-row w-full lg:p-2 items-center rounded-lg space-y-1 lg:border-[1px] lg:border-black lg:px-14 lg:w-full gap-2 lg:gap-4"
                >
                  <span className="lg:text-xl">{item.label}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;