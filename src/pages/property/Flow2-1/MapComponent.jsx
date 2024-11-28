import React, { useState } from "react";

const MapComponent = ({ property }) => {
console.log(property.locationLink);
  // Function to get the map source URL based on the stored property location
  const getMapSrc = () => {
    return property.locationLink.startsWith("https://www.google.com/maps/embed?pb=")  ? property.locationLink :
     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.7374841447!2d80.88487084258148!3d26.848163621554857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be314f43454e5%3A0x111085c9b254d27c!2sBLOCK%20B!5e0!3m2!1sen!2sin!4v1724437712311!5m2!1sen!2sin"; // Default location
  };

  return (

        <div className="w-full ">
          <iframe
            src={getMapSrc()}
            width="100%"
            height="383"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Location Map"
          />
        </div>
  );
};

export default MapComponent;
