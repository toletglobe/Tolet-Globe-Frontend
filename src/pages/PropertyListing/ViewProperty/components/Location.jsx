import React, { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { loadGoogleMaps } from "../../../../config/loadGoogleMaps";
import {
  MdSchool,
  MdRestaurant,
  MdShoppingBag,
  MdLocalCafe,
  MdAccountBalance,
  MdStore,
  MdFitnessCenter,
  MdDirectionsBus,
} from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Location = ({ property, selectComp }) => {
  const [selectedCategory, setSelectedCategory] = useState("location");
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [service, setService] = useState(null);

  useEffect(() => {
    loadGoogleMaps().then(() => {
      initializeMap();
    });
  }, [property]);

  const initializeMap = () => {
    if (!property?.latitude || !property?.longitude) return;

    const propertyLocation = {
      lat: parseFloat(property.latitude),
      lng: parseFloat(property.longitude),
    };

    const newMap = new google.maps.Map(mapRef.current, {
      center: propertyLocation,
      zoom: 12,
    });

    // Add marker for property location
    new google.maps.Marker({
      position: propertyLocation,
      map: newMap,
      title: "Property Location",
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      },
    });

    setMap(newMap);
    setService(new google.maps.places.PlacesService(newMap));
  };

  const clearMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const searchNearbyPlaces = async (type) => {
    if (!map || !service) return;

    clearMarkers();

    const propertyLocation = {
      lat: parseFloat(property.latitude),
      lng: parseFloat(property.longitude),
    };

    const placeTypeMap = {
      school: "school",
      restaurant: "restaurant",
      groceries: "grocery_or_supermarket",
      cafe: "cafe",
      banks: "bank",
      shops: "shopping_mall",
      fitness: "gym",
      transport: "transit_station",
    };

    const request = {
      location: propertyLocation,
      radius: 10000, // 10km
      type: placeTypeMap[type],
    };

    try {
      const results = await new Promise((resolve, reject) => {
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
          } else {
            reject(`Error: ${status}`);
          }
        });
      });

      const newMarkers = results.map((place) => createMarker(place));
      setMarkers(newMarkers);
    } catch (error) {
      console.error("Error during Nearby Search:", error);
    }
  };

  const createMarker = (place) => {
    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div>
          <h3>${place.name}</h3>
          <p>${place.vicinity}</p>
          <p>Rating: ${place.rating ? place.rating + "/5" : "N/A"}</p>
        </div>
      `,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });

    return marker;
  };

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
    if (category === "location") {
      clearMarkers();
      if (map) {
        map.setCenter({
          lat: parseFloat(property.latitude),
          lng: parseFloat(property.longitude),
        });
        map.setZoom(14);
      }
    }
  };

  useEffect(() => {
    if (selectedCategory && selectedCategory !== "location" && map && service) {
      searchNearbyPlaces(selectedCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, map, service]);

  const locationCategories = [
    { icon: <MdSchool size={24} />, label: "School", category: "school" },
    {
      icon: <MdRestaurant size={24} />,
      label: "Restaurants",
      category: "restaurant",
    },
    {
      icon: <MdShoppingBag size={24} />,
      label: "Groceries",
      category: "groceries",
    },
    { icon: <MdLocalCafe size={24} />, label: "Cafe", category: "cafe" },
    { icon: <MdAccountBalance size={24} />, label: "Banks", category: "banks" },
    { icon: <MdStore size={24} />, label: "Shops", category: "shops" },
    {
      icon: <MdFitnessCenter size={24} />,
      label: "Fitness",
      category: "fitness",
    },
    {
      icon: <MdDirectionsBus size={24} />,
      label: "Transport",
      category: "transport",
    },
  ];

  // Function to mask address and location except starting house number
  const maskAddressAndLocation = () => {
    if (!property) return "Address not available";

    const houseNumberMatch = property.address?.match(/^\s*\S+/);
    const houseNumber = houseNumberMatch ? houseNumberMatch[0] : "";

    // Mask the rest of the address and location fields
    const maskString = (str) => str?.replace(/./g, "--") || "";

    const areaMasked = maskString(property.area);
    const localityMasked = maskString(property.locality);
    const cityMasked = maskString(property.city);

    return `${houseNumber}---, ${areaMasked}, ${localityMasked}, ${cityMasked}`;
  };

  return (
    <div className="pb-4 bg-white rounded-2xl">
      {/* Header */}
      <div className="px-1 pt-4 pb-2">
        <div className="flex justify-between lg:w-[68%] xl:w-[69%] 2xl:w-[70%] items-center px-3 lg:px-0 lg:mx-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Location</h2>
            <p className="text-sm text-gray-600">
              <span className="">{maskAddressAndLocation()}</span>
            </p>
          </div>
          <p className="text-teal-600 text-sm lg:pt-6">Get Direction</p>
        </div>
      </div>

      <div className="lg:flex lg:space-x-4 justify-between lg:mx-10">
        <div className="w-full lg:w-[60%] xl:w-[69%]  h-64 lg:h-[550px]  absolute backdrop-blur-sm bg-black/40 flex justify-center items-center z-50">
          <RiLock2Fill color="#ffffff" size={30} />
        </div>
        {/* Map */}
        <div className="lg:w-[74%] w-full h-64 lg:h-[550px]">
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
        </div>

        {/* Categories */}
        <div className="px-3 py-3 lg:py-0 lg:pb-3 justify-between items-center gap-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-x-2 gap-y-1 text-xs lg:pl-8 items-center">
            {/* Other category buttons */}
            {locationCategories.map((item, index) => (
              <div
                className="border border-black rounded-lg p-2 lg:w-full lg:border-none"
                key={index}
              >
                <button
                  onClick={() => handleButtonClick(item.category)}
                  className={`flex lg:flex-row w-full lg:p-2 items-center rounded-lg space-y-1 lg:border-[1px] lg:border-black lg:px-14 lg:w-full gap-2 lg:gap-4 ${
                    selectedCategory === item.category ? "bg-gray-200" : ""
                  }`}
                >
                  <span className="text-gray-950 lg:text-2xl gap-5">
                    {item.icon}
                  </span>
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