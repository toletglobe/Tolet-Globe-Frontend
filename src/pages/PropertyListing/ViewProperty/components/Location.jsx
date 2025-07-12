import React, { useState, useEffect, useRef } from "react";
// import { FaArrowRight } from "react-icons/fa";
import { loadGoogleMaps } from "../../../../config/loadGoogleMaps";
import { MdOutlineSchool } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

// icons
import Restaurants from "./assets/Locations/Restaurants.svg";
import Cafe from "./assets/Locations/Cafe.svg";
import Groceries from "./assets/Locations/Groceries.svg";
import Banks from "./assets/Locations/Banks.svg";
import Shops from "./assets/Locations/Shops.svg";
import Fitness from "./assets/Locations/Fitness.svg";
import Transport from "./assets/Locations/Transport.svg";

const Location = ({ property, selectComp }) => {
  const [selectedCategory, setSelectedCategory] = useState("location");
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    loadGoogleMaps().then(() => {
      initializeMap();
    });
  }, [property]);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== "location" && map) {
      console.log("Searching for nearby places of type:", selectedCategory);
      searchNearbyPlaces(selectedCategory);
    }
  }, [selectedCategory, map]);

  const initializeMap = () => {
    if (!property?.latitude || !property?.longitude) return;

    const propertyLocation = {
      lat: parseFloat(property.latitude),
      lng: parseFloat(property.longitude),
    };

    const newMap = new google.maps.Map(mapRef.current, {
      center: propertyLocation,
      zoom: 18, // Increased zoom level for closer view
      minZoom: 15, // Minimum zoom level - prevents zooming out too far
      maxZoom: 15.5, // Maximum zoom level
      mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
      // Disable some controls for better user experience
      zoomControl: true, // Keep zoom control but restrict levels
      mapTypeControl: false, // Disable map type switching
      streetViewControl: false, // Disable street view
      fullscreenControl: false, // Disable fullscreen
      // Restrict map interaction
      gestureHandling: 'cooperative', // Requires ctrl+scroll to zoom
    });

    // Add zoom change listener to enforce minimum zoom
    newMap.addListener('zoom_changed', () => {
      if (newMap.getZoom() < 14) {
        newMap.setZoom(14);
      }
    });

    // Create a DOM element for the marker content
    const markerContent = document.createElement("div");
    markerContent.style.backgroundColor = "red";
    markerContent.style.width = "12px";
    markerContent.style.height = "12px";
    markerContent.style.borderRadius = "50%";
    markerContent.style.border = "2px solid white";
    markerContent.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";

    // Add marker for property location using AdvancedMarkerElement
    new google.maps.marker.AdvancedMarkerElement({
      position: propertyLocation,
      map: newMap,
      title: "Property Location",
      content: markerContent,
    });

    setMap(newMap);
  };

  const clearMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const searchNearbyPlaces = async (type) => {
    clearMarkers();

    const propertyLocation = {
      lat: parseFloat(property.latitude),
      lng: parseFloat(property.longitude),
    };

    const placeTypeMap = {
      school: "school",
      restaurant: "restaurant",
      groceries: "supermarket",
      cafe: "cafe",
      banks: "bank",
      shops: "shopping_mall",
      fitness: "gym",
      transport: "transit_station",
    };

    try {
      const center = new google.maps.LatLng(
        propertyLocation.lat,
        propertyLocation.lng
      );
      const request = {
        fields: [
          "displayName",
          "location",
          "businessStatus",
          "rating",
          "formattedAddress",
        ],
        locationRestriction: {
          center: center,
          radius: 5000, // Reduced radius to 5km for closer results
        },
        includedPrimaryTypes: [placeTypeMap[type]],
        maxResultCount: 10,
        rankPreference:
          google.maps.places.SearchNearbyRankPreference.POPULARITY,
        language: "en-US",
        region: "in",
      };
      // @ts-ignore
      const { places } = await google.maps.places.Place.searchNearby(request);
      console.log("Nearby places found:", places);

      const newMarkers = places.map((place) => createMarker(place));
      setMarkers(newMarkers);
    } catch (error) {
      console.error("Error during Nearby Search:", error);
    }
  };

  const createMarker = (place) => {
    // Create a DOM element for the marker content
    const markerContent = document.createElement("div");
    markerContent.style.backgroundColor = "blue";
    markerContent.style.width = "10px";
    markerContent.style.height = "10px";
    markerContent.style.borderRadius = "50%";
    markerContent.style.border = "1px solid white";
    markerContent.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3)";

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: place.location,
      title: place.displayName?.text || place.name,
      content: markerContent,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
      <div>
        <h3>${place.displayName || place.name}</h3>
        <p>${place.formattedAddress || ""}</p>
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
        map.setZoom(16); // Set to higher zoom level for location view
      }
    }
  };

  const locationCategories = [
    {
      icon: <MdOutlineSchool size={26} />,
      label: "School",
      category: "school",
    },
    {
      icon: (
        <img
          src={Restaurants}
          alt="Restaurants"
          className="sm:w-[35px] sm:h-[32px] w-[24px] h-[24px]"
        />
      ),
      label: "Restaurants",
      category: "restaurant",
    },
    {
      icon: (
        <img src={Groceries} alt="Groceries" className="w-[24px] h-[24px]" />
      ),
      label: "Groceries",
      category: "groceries",
    },
    {
      icon: <img src={Cafe} alt="Cafe" className="w-[24px] h-[24px]" />,
      label: "Cafe",
      category: "cafe",
    },
    {
      icon: <img src={Banks} alt="Banks" className="w-[24px] h-[24px]" />,
      label: "Banks",
      category: "banks",
    },
    {
      icon: <img src={Shops} alt="Shops" className="w-[24px] h-[24px]" />,
      label: "Shops",
      category: "shops",
    },
    {
      icon: <img src={Fitness} alt="Fitness" className="w-[24px] h-[24px]" />,
      label: "Fitness",
      category: "fitness",
    },
    {
      icon: (
        <img src={Transport} alt="Transport" className="w-[24px] h-[24px]" />
      ),
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
        {/* <div className="w-full lg:w-[60%] xl:w-[69%]  h-64 lg:h-[550px]  absolute backdrop-blur-sm bg-black/40 flex justify-center items-center z-50">
          <RiLock2Fill color="#ffffff" size={30} />
        </div> */}
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