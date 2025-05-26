import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../../../../config/loadGoogleMaps";
import Select from "react-select";
import {IoClose} from "react-icons/io5";
import areas from "../../../../pages/PropertyListing/Listings/areas";

import Pricing from "./PricngCard";

const Form = ({ formData, setFormData }) => {
  const optionRenderFun = (value) => (
    <option key={value} value={value}>
      {value}
    </option>
  );

  const cityOptions = ["Lucknow", "Ayodhya", "Vellore", "Kota"];

  const spaceTypeOptions = ["Residential", "Commercial", "NA"];

  const residentialOptions = ["House", "Flat", "PG", "NA"];

  const commercialOptions = ["Office", "Shop", "Warehouse", "NA"];

  const allOptions = [
    "House",
    "Flat",
    "PG",
    "Office",
    "Shop",
    "Warehouse",
    "NA",
  ];

  const cityLocalityData = {
    Lucknow: {
      localities: [
        "Kamta",
        "Nishatganj",
        "Hazratganj",
        "Gomti Nagar",
        "Sushant Golf City",
        "Khargapur",
        "Chinhat",
        "Indira Nagar",
        "Aliganj",
        "Vinay Khand",
        "Patrakar Puran",
        "Awadh Vihar Colony",
        "Sunder Nagar",
        "Amity University",
        "Ismail Ganj",
        "Rajajipuram",
      ],
      pincodes: [
        "226028",
        "226001",
        "226001",
        "226010",
        "226030",
        "226010",
        "226028",
        "226016",
        "226024",
        "226010",
        "226010",
        "226015",
        "226005",
        "226010",
        "226010",
        "226010",
      ],
    },
    Ayodhya: {
      localities: ["Bakhtiarpur", "Bhadohi"],
      pincodes: ["224121", "224122"],
    },
    Vellore: {
      localities: [
        "Vellore Cantonment",
        "Gandhi Nagar",
        "Vellore East",
        "Vellore West",
      ],
      pincodes: ["632001", "632002", "632003", "632004"],
    },
    Kota: {
      localities: ["Kota Cantonment", "Kota East", "Kota West", "Kota Central"],
      pincodes: ["324001", "324002", "324003", "324004"],
    },
  };

  const cityCoordinates = {
    Lucknow: { lat: 26.8467, lng: 80.9462 },
    Ayodhya: { lat: 26.7922, lng: 82.1998 },
    Vellore: { lat: 12.9165, lng: 79.1325 },
    Kota: { lat: 25.2138, lng: 75.8648 },
  };

  const localityCoordinates = {
    Lucknow: {
      Kamta: { lat: 26.8868, lng: 81.0586 },
      Nishatganj: { lat: 26.87, lng: 80.95 },
      Hazratganj: { lat: 26.85, lng: 80.95 },
      "Gomti Nagar": { lat: 26.85, lng: 81.0 },
      "Sushant Golf City": { lat: 26.78, lng: 81.02 },
      Khargapur: { lat: 26.83, lng: 81.03 },
      Chinhat: { lat: 26.88, lng: 81.05 },
      "Indira Nagar": { lat: 26.87, lng: 81.0 },
      Aliganj: { lat: 26.88, lng: 80.94 },
      "Vinay Khand": { lat: 26.85, lng: 81.0 },
      "Patrakar Puram": { lat: 26.85, lng: 81.0 },
      "Awadh Vihar Colony": { lat: 26.78, lng: 81.02 },
      "Sunder Nagar": { lat: 26.87, lng: 80.95 },
      "Amity University": { lat: 26.78, lng: 81.02 },
      "Ismail Ganj": { lat: 26.85, lng: 80.95 },
      Rajajipuram: { lat: 26.85, lng: 80.9 },
    },
    Ayodhya: {
      Bakhtiarpur: { lat: 26.7922, lng: 82.1998 },
      Bhadohi: { lat: 26.785, lng: 82.21 },
    },
    Vellore: {
      "Vellore Cantonment": { lat: 12.9461, lng: 79.1789 },
      "Gandhi Nagar": { lat: 12.9547, lng: 79.1407 },
      "Vellore East": { lat: 12.9349, lng: 79.1469 },
      "Vellore West": { lat: 12.9349, lng: 79.1469 },
    },
    Kota: {
      "Kota Cantonment": { lat: 25.18, lng: 75.85 },
      "Kota East": { lat: 25.18, lng: 75.87 },
      "Kota West": { lat: 25.18, lng: 75.83 },
      "Kota Central": { lat: 25.18, lng: 75.85 },
    },
  };

  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [areaSearch, setAreaSearch] = useState("");
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);

  useEffect(() => {
    loadGoogleMaps()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setLoadError(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading && mapRef.current) {
      let position;

      if (formData.city && formData.locality) {
        position = localityCoordinates[formData.city][formData.locality];
      } else if (formData.city) {
        position = cityCoordinates[formData.city];
      } else {
        position = cityCoordinates["Lucknow"];
      }

      if (!map) {
        // Initialize map if it doesn't exist
        const newMap = new google.maps.Map(mapRef.current, {
          center: position,
          zoom: formData.locality ? 15 : 13,
          mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
        });

        const newMarker = new google.maps.marker.AdvancedMarkerElement({
          map: newMap,
          position: position,
          gmpDraggable: true,
        });

        newMarker.addListener("dragend", () => {
          const position = newMarker.position;
          setFormData((prev) => ({
            ...prev,
            latitude: position.lat,
            longitude: position.lng,
          }));
        });

        setMap(newMap);
        setMarker(newMarker);
      } else {
        // Always update map and marker when city/locality changes
        map.setCenter(position);
        map.setZoom(formData.locality ? 15 : 13);
        marker.position = position;

        // Update coordinates in formData
        setFormData((prev) => ({
          ...prev,
          latitude: position.lat,
          longitude: position.lng,
        }));
      }
    }
  }, [formData.city, formData.locality, isLoading]);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    const cityPosition = cityCoordinates[selectedCity];

    setFormData({
      ...formData,
      city: selectedCity,
      locality: "",
      pincode: "",
      latitude: cityPosition.lat, // Reset coordinates to city center
      longitude: cityPosition.lng,
    });

    // for Debugging
    console.log("Formdata:", formData);

    // Update map and marker position immediately
    if (map && marker) {
      map.setCenter(cityPosition);
      map.setZoom(13);
      marker.position = cityPosition;
    }
  };

  const handleLocalityChange = (e) => {
    const selectedLocality = e.target.value;
    const selectedCity = formData.city;
    const localityIndex =
      cityLocalityData[selectedCity].localities.indexOf(selectedLocality);
    const correspondingPincode =
      cityLocalityData[selectedCity].pincodes[localityIndex];

    setFormData({
      ...formData,
      locality: selectedLocality,
      pincode: correspondingPincode,
    });
  };

  // Add this function after other handler functions
  const determineSubscriptionPlan = (rentAmount) => {
    const rent = Number(rentAmount);
    if (rent <= 6000) return 299;
    if (rent <= 15000) return 499;
    if (rent <= 25000) return 699;
    if (rent <= 50000) return 999;
    return 1499;
  };

  // for Debugging
  console.log("Formdata:", formData);

  const renderMap = () => {
    if (isLoading) return <div>Loading map...</div>;
    if (loadError) return <div>Error loading map</div>;

    return (
      <div
        ref={mapRef}
        className="w-full h-[400px] rounded-md border-[1.5px] border-[#C8C8C8]"
      />
    );
  };

  const handleImageSubmit = (e) => {
    const existingImages = formData.images || [];
    const newFiles = Array.from(e.target.files);

    if (existingImages.length + newFiles.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...existingImages, ...newFiles],
    }));
    // for Debugging
    console.log("Formdata:", formData);
    e.target.value = "";
  };

  const handleVideoSubmit = (e) => {
    const existingVideos = formData.videos || [];
    const newFiles = Array.from(e.target.files);

    if (existingVideos.length + newFiles.length > 5) {
      alert("You can upload a maximum of 5 videos.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      videos: [...newFiles],
    }));
    e.target.value = "";
  };

  const removeImage = (index) => {
    const updatedImages = [...(formData.images || [])];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
    // for Debugging
    console.log("Formdata:", formData);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      minHeight: "46px",
      boxShadow: "none",
      border: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#000000",
      padding: "0 8px",
    }),
  };
  const appliancesOptions = [
    { value: "NA", label: "NA" },
    { value: "Refrigerator", label: "Refrigerator" },
    { value: "Washing Machine", label: "Washing Machine" },
    { value: "Air Conditioner", label: "Air Conditioner" },
    { value: "Geyser", label: "Geyser" },
    { value: "Microwave", label: "Microwave" },
    { value: "Water Purifier", label: "Water Purifier" },
    { value: "TV", label: "TV" },
    { value: "Inverter", label: "Inverter" },
  ];

  const handleOnChangeAppliances = (selectedOptions) => {
    setFormData((formData) => {
      return { ...formData, appliances: selectedOptions };
    });
    // for Debugging
    console.log("Formdata:", formData);
  };

  const amenitiesOptions = [
    { value: "NA", label: "NA" },
    { value: "Lift", label: "Lift" },
    { value: "Parking", label: "Parking" },
    { value: "Power Backup", label: "Power Backup" },
    { value: "Swimming Pool", label: "Swimming Pool" },
    { value: "Gardern", label: "Gardern" },
    { value: "Gym", label: "Gym" },
    { value: "Security Guard", label: "Security Guard" },
    { value: "Wi-Fi", label: "Wi-Fi" },
  ];

  const handleOnChangeAmenities = (selectedOptions) => {
    setFormData((formData) => {
      return { ...formData, amenities: selectedOptions };
    });
    // for Debugging
    console.log("Formdata:", formData);
  };

  return (
    <>
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
        {/* First Name */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            First Name<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter first name"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.firstName}
            onChange={(e) => {
              setFormData({ ...formData, firstName: e.target.value });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Last Name<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter last name"
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.lastName}
            onChange={(e) => {
              setFormData({ ...formData, lastName: e.target.value });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          />
        </div>

        {/* Owner Contact Number */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Phone Number<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter phone number"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.ownersContactNumber}
            onChange={(e) => {
              setFormData({
                ...formData,
                ownersContactNumber: e.target.value,
              });
              // for Debugging
              console.log("Formdata:", formData);
            }}
            pattern="[0-9]{10}"
          />
        </div>

        {/* Owner's Alternate Contact Number */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Alternate Phone Number
          </label>
          <input
            type="text"
            placeholder="Enter phone number"
            className="bg-black w-full h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-[14px] !placeholder:text-[8px] sm:placeholder:text-base"
            value={formData.ownersAlternateContactNumber}
            onChange={(e) => {
              setFormData({
                ...formData,
                ownersAlternateContactNumber: e.target.value,
              });
              // for Debugging
              console.log("Formdata:", formData);
            }}
            pattern="[0-9]{10}"
          />
        </div>
      </div>
      <div>
        {/* Address */}
        <div className=" mt-10 px-5 h-fit md:pr-0 max-sm:mt-6 max-sm:px-2">
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Address<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter full address"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.address}
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          />
        </div>
      </div>
      

      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
        {/* City */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            City<span className="text-red-600">*</span>
          </label>
          <select
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.city}
            onChange={handleCityChange}
          >
            <option value="" disabled>
              Select city
            </option>
            {cityOptions.map(optionRenderFun)}
          </select>
        </div>

        {/* Locality */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Locality<span className="text-red-600">*</span>
          </label>
          <select
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.locality}
            onChange={handleLocalityChange}
            disabled={!formData.city}
          >
            <option value="" disabled>
              Select locality<span className="text-red-600">*</span>
            </option>
            {formData.city &&
              cityLocalityData[formData.city].localities.map(optionRenderFun)}
          </select>
        </div>

        {/* Area */}
        <div className="relative">
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Area<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Type to search area"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={areaSearch}
            onChange={(e) => {
              const searchValue = e.target.value;
              setAreaSearch(searchValue);
              setShowAreaDropdown(true);

              // Filter areas based on search input
              const filtered = areas.filter((area) =>
                area.toLowerCase().includes(searchValue.toLowerCase())
              );
              setFilteredAreas(filtered);
            }}
            onFocus={() => {
              setShowAreaDropdown(true);
              if (areaSearch === "") {
                setFilteredAreas(areas);
              }
            }}
          />

          {/* Dropdown for areas */}
          {showAreaDropdown && filteredAreas.length > 0 && (
            <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-black border border-[#C8C8C8] rounded-md">
              {filteredAreas.map((area, index) => (
                <div
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-800 text-[#C8C8C8]"
                  onClick={() => {
                    setAreaSearch(area);
                    setFormData({ ...formData, area: area });
                    setShowAreaDropdown(false);
                    // for Debugging
                    console.log("Formdata:", formData);
                  }}
                >
                  {area}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pin */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Pin Code<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Pin Code"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.pincode}
            readOnly
          />
        </div>

        {/* Pin Location on Map */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Pin Location on Map
          </label>
          {renderMap()}
          {formData.latitude && formData.longitude && (
            <p className="mt-2 text-[#C8C8C8] text-sm">
              Selected coordinates: {formData.latitude.toFixed(6)},{" "}
              {formData.longitude.toFixed(6)}
            </p>
          )}
        </div>

        {/* Nearest Landmark */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Nearest Landmark<span className="text-red-600">*</span>
          </label>
          <input
            required
            type="text"
            placeholder="Enter Nearest Landmark"
            className="bg-black px-3 py-3 w-full h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
            value={formData.nearestLandmark}
            onChange={(e) => {
              setFormData({
                ...formData,
                nearestLandmark: e.target.value,
              });
            }}
          />
        </div>

        {/* Square Feet Area */}
        {/* <div className="w-full h-fit flex flex-col gap-3 items-start"> */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Square Feet Area<span className="text-red-600">*</span>
          </label>
          <input
            required
            type="text"
            placeholder="0"
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.squareFeetArea}
            onChange={(e) => {
              setFormData((formData) => {
                return { ...formData, squareFeetArea: e.target.value };
              });
            }}
          />
        </div>
        {/* </div> */}

        {/* Space Type */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Space<span className="text-red-600">*</span>
          </label>
          <select
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.spaceType}
            onChange={(e) => {
              setFormData({ ...formData, spaceType: e.target.value });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select space type
            </option>
            {spaceTypeOptions.map(optionRenderFun)}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Property<span className="text-red-600">*</span>
          </label>
          <select
            disabled={formData.spaceType == "" ? true : false}
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.propertyType}
            onChange={(e) => {
              setFormData({ ...formData, propertyType: e.target.value });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select property type
            </option>

            {formData.spaceType === "Commercial"
              ? commercialOptions.map(optionRenderFun)
              : formData.spaceType === "Residential"
              ? residentialOptions.map(optionRenderFun)
              : allOptions.map(optionRenderFun)}
          </select>
        </div>

        {/* Preference */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Preference<span className="text-red-600">*</span>
          </label>
          <select
            required
            className="bg-black px-3 py-3 w-full h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
            value={formData.preference}
            onChange={(e) => {
              setFormData({ ...formData, preference: e.target.value });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select preference
            </option>
            <option value="Bachelors">Bachelors</option>
            <option value="Family">Family</option>
            <option value="Any">Any</option>
            <option value="NA">NA</option>
          </select>
        </div>

        {/* Bachelors */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Gender<span className="text-red-600">*</span>
          </label>
          <select
            disabled={formData.preference === "Family" ? true : false}
            required
            className="bg-black px-3 py-3 w-full h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
            value={formData.bachelors}
            onChange={(e) => {
              setFormData({ ...formData, bachelors: e.target.value });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Any">Any</option>
            <option value="NA">NA</option>
          </select>
        </div>

        {/* Type */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Furnished Type<span className="text-red-600">*</span>
          </label>
          <select
            required
            className="bg-black px-3 py-3 w-full h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
            value={formData.type}
            onChange={(e) => {
              setFormData({ ...formData, type: e.target.value });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select furnished type
            </option>
            <option value="Not Furnished">Not Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
            <option value="NA">NA</option>
          </select>
        </div>

        {/* BHK */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            BHK<span className="text-red-600">*</span>
          </label>
          <select
            required
            className="bg-black px-3 py-3 w-full h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
            value={formData.bhk}
            onChange={(e) => {
              setFormData({ ...formData, bhk: e.target.value });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select BHK
            </option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
            <option value="5">5 BHK</option>
            <option value="NA">NA</option>
          </select>
        </div>

        {/* Floor */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Floors<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter floor number"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.floor}
            onChange={(e) => {
              setFormData({ ...formData, floor: e.target.value });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          />
        </div>

        {/* Type of Washroom */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Washroom<span className="text-red-600">*</span>
          </label>
          <select
            required
            className="bg-black px-3 py-3 w-full h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
            value={formData.typeOfWashroom}
            onChange={(e) => {
              setFormData({
                ...formData,
                typeOfWashroom: e.target.value,
              });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select Washroom
            </option>
            <option value="Western">Western</option>
            <option value="Indian">Indian</option>
            <option value="Both">Both</option>
            <option value="NA">NA</option>
          </select>
        </div>

        {/* Appliances */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Appliances<span className="text-red-600">*</span>
          </label>
          <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              placeholder={
                <div className="text-[#7D7D7D]  text-[18px] leading-[23px] font-normal">
                  Choose your Appliances
                </div>
              }
              required
              value={formData.appliances}
              options={appliancesOptions}
              onChange={handleOnChangeAppliances}
              isMulti={true}
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <lable className="text-[#FFFFFF] text-base font-medium">
            Amenities<span className="text-red-600">*</span>
          </lable>
          <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              className="text-black"
              placeholder={
                <div className="text-[#7D7D7D] text-[18px] leading-[23px] font-normal">
                  Choose your Amenities
                </div>
              }
              required
              value={formData.amenities}
              options={amenitiesOptions}
              onChange={handleOnChangeAmenities}
              isMulti={true}
            />
          </div>
        </div>
      </div>

      {/* About Property */}
      <div className=" mt-10 px-5 h-fit md:pr-0 max-sm:mt-6 max-sm:px-2">
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            About the property<span className="text-red-600">*</span>
          </label>
          <textarea
            className="bg-black min-[320px]:max-md:w-[100%] w-[100%] h-36 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.aboutTheProperty}
            onChange={(e) => {
              setFormData((formData) => {
                return { ...formData, aboutTheProperty: e.target.value };
              });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          ></textarea>
        </div>
      </div>

      {/* Rent & Security Fields */}
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
        <div className="flex-1">
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Security Amount (If Applicable)
          </label>
          <input
            required
            type="text"
            placeholder="Enter security amount"
            className="mt-2 bg-black w-full h-14 p-3 rounded-md border border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.security || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, security: e.target.value }))
            }
          />
        </div>
        <div className="flex-1 mt-10 md:mt-0">
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Rent Amount <span className="text-red-800">*</span>
          </label>
          <input
            required
            type="text"
            placeholder="Enter rent amount"
            className="mt-2 bg-black w-full h-14 p-3 rounded-md border border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.rent || ""}
            onChange={(e) => {
              const rentValue = e.target.value;
              const subscriptionAmount = determineSubscriptionPlan(rentValue);
              setFormData((prev) => ({
                ...prev,
                rent: rentValue,
                subscriptionPlan: subscriptionAmount,
              }));
            }}
          />
        </div>
      </div>
      {/* Subscription Cards */}
      <div>
        <Pricing formData={formData} />
      </div>

      {/* Image Upload Section */}
      <div className="mt-10 px-5 h-fit md:pr-0 max-sm:mt-6 max-sm:px-2">
        {/* Image Upload Section */}
        <div className="mt-16">
          <lable className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Property image<span className="text-red-600">*</span>
          </lable>
          <p className="text-sm mb-4">Note: Your first image will be cover image of your property</p>
          {(formData.images?.length || 0) === 0 && (
            <div className="border-2 border-dashed border-yellow-600 rounded-lg py-10 flex flex-col items-center">
              <label className="cursor-pointer rounded-md text-yellow-600 font-bold  px-4 py-6 h-[150px] flex items-center justify-center">
                + Add More
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageSubmit}
                
                />
              </label>
            </div>
          )}

          {(formData.images?.length || 0) === 1 && (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left - First image */}
              <div className="flex-1">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.images[0])}
                    alt="uploaded-0"
                    className="rounded-lg object-cover w-full h-59"
                  />
                  <button
                    onClick={() => removeImage(0)}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 transition"
                    aria-label="Remove image"
                  >
                    <IoClose size={16} color="white" />
                  </button>
                </div>
              </div>

              {/* Right - Add more UI */}
              <div className="flex-1 border-2 border-dashed rounded-lg border-yellow-600 py-10 flex flex-col justify-center items-center">
                {formData.images.length < 10 && (
                  <label className="cursor-pointer  rounded-md text-yellow-600  font-bold px-4 py-2">
                    Add More
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageSubmit}
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          {(formData.images?.length || 0) >= 2 && (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left - Always the first image */}
              <div className="flex-1">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.images[0])}
                    alt="uploaded-0"
                    className="rounded-lg object-cover w-full h-59"
                  />
                  <button
                    onClick={() => removeImage(0)}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 transition"
                    aria-label="Remove image"
                  >
                    <IoClose size={16} color="white" />
                  </button>
                </div>
              </div>

              {/* Right - Grid of rest images */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.slice(1).map((img, idx) => (
                  <div key={idx + 1} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`uploaded-${idx + 1}`}
                      className="rounded-lg object-cover w-full h-32"
                    />
                    <button
                      onClick={() => removeImage(idx + 1)}
                      className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 transition"
                      aria-label="Remove image"
                    >
                      <IoClose size={16} color="white" />
                    </button>
                  </div>
                ))}

                {/* Add photo button inside grid */}
                {formData.images.length < 10 && (
                  <label className="flex items-center justify-center border-2 border-dashed  border-yellow-600 rounded-lg cursor-pointer h-32 transition text-yellow-600 font-bold text-sm">
                    Add Photo
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageSubmit}
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          <p className="mt-4 text-sm text-gray-400">
            Uploaded {formData.images?.length || 0}/5 images
          </p>
        </div>
      </div>
    </>
  );
};

export default Form;
