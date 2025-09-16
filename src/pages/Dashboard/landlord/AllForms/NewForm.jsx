import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../../../../config/loadGoogleMaps";
import Select, { components } from "react-select";
import { IoClose } from "react-icons/io5";
import areas from "../../../../pages/PropertyListing/Listings/areas";

import Pricing from "./PricngCard";

const Form = ({ formData, setFormData }) => {
  const optionRenderFun = (value) => (
    <option key={value} value={value}>
      {value}
    </option>
  );

  const cityOptions = ["Lucknow", "Ayodhya", "Vellore", "Kota"];
  const spaceTypeOptions = ["Residential", "Commercial"];
  const residentialOptions = ["House", "Flat", "PG"];
  const commercialOptions = ["Office", "Shop", "Warehouse"];
  const allOptions = [
    "House",
    "Flat",
    "PG",
    "Office",
    "Shop",
    "Warehouse",
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
    if (isLoading || !mapRef.current) return;

    if (
      typeof window.google === "undefined" ||
      !window.google.maps ||
      !window.google.maps.Map ||
      !window.google.maps.marker ||
      !window.google.maps.marker.AdvancedMarkerElement
    ) {
      console.warn("Google Maps API not available or AdvancedMarkerElement unsupported");
      return;
    }

    let position;
    if (formData.city && formData.locality) {
      position = localityCoordinates?.[formData.city]?.[formData.locality];
    } else if (formData.city) {
      position = cityCoordinates?.[formData.city];
    } else {
      position = cityCoordinates["Lucknow"];
    }

    if (!position || !position.lat || !position.lng) {
      console.warn("Invalid position fallback:", position);
      return;
    }

    if (!map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: position,
        zoom: formData.locality ? 15 : 13,
        mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
      });

      setMap(newMap);

      try {
        const AdvancedMarker = window.google.maps.marker.AdvancedMarkerElement;
        const newMarker = new AdvancedMarker({
          map: newMap,
          position: position,
          gmpDraggable: true,
        });

        newMarker.addListener("dragend", () => {
          const pos = newMarker.position;
          if (pos?.lat && pos?.lng) {
            setFormData((prev) => ({
              ...prev,
              latitude: pos.lat,
              longitude: pos.lng,
            }));
          }
        });

        setMarker(newMarker);
      } catch (err) {
        console.warn("Marker failed to initialize:", err);
      }
    } else {
      map.setCenter(position);
      map.setZoom(formData.locality ? 15 : 13);
      if (marker?.setPosition) {
        marker.setPosition(position);
      }
    }

    setFormData((prev) => ({
      ...prev,
      latitude: position.lat,
      longitude: position.lng,
    }));
  }, [formData.city, formData.locality, isLoading]);


  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    const cityPosition = cityCoordinates[selectedCity];

    setFormData({
      ...formData,
      city: selectedCity,
      locality: "",
      pincode: "",
      latitude: cityPosition.lat,
      longitude: cityPosition.lng,
    });

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

  const determineSubscriptionPlan = (rentAmount) => {
    const rent = Number(rentAmount);
    if (rent <= 6000) return 299;
    if (rent <= 15000) return 499;
    if (rent <= 25000) return 699;
    if (rent <= 50000) return 999;
    return 1499;
  };

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
  };
  
  // **PROFESSIONAL COMMENT:** We are now passing the `className` prop directly to the component, which is a more idiomatic way to apply Tailwind styles in React.
  const MultiValueContainer = (props) => {
    return (
      <div className="flex flex-wrap gap-2 py-1">
        <components.MultiValueContainer {...props}>
          {props.children}
        </components.MultiValueContainer>
      </div>
    );
  };

  const customStyles = {
  // Styles the main container of the select field
  control: (provided) => ({
    ...provided,
    backgroundColor: "#000",
    color: "#fff",
    borderColor: "#C8C8C8",
    padding: "6px",
    minHeight: "3.5rem",
    // This style is important for the main control container
    flexWrap: "wrap",
    alignItems: "flex-start",
  }),

  // Styles the container that holds the selected options (the tags)
  valueContainer: (provided) => ({
    ...provided,
    // This is the key change. The `!important` rule overrides the default inline styles of the library.
    flexWrap: "wrap !important",
    maxHeight: "6rem",
    overflowY: "auto",
    padding: "0 6px",
    alignItems: "flex-start",
  }),
  
  // Styles each individual tag/selected option
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "rgb(209 213 219)",
    color: "#000",
    borderRadius: "4px",
    // Adding margin here provides spacing between the tags
    margin: "4px 4px 4px 0",
  }),

  // Styles the text inside the tag
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#000",
  }),
  
  // Styles the 'x' button to remove a tag
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#000",
    "&:hover": {
      backgroundColor: "rgb(156 163 175)",
      color: "#000",
    },
  }),
  
  // Styles the dropdown menu
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};
  const appliancesOptions = [
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
  };

  const amenitiesOptions = [
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
            }}
          />
        </div>

        {/* Owner Contact Number */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Phone Number<span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            placeholder="Enter phone number"
            required
            maxLength={10}
            pattern="[0-9]{10}"
            inputMode="numeric"
            className="bg-black w-full h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] text-white"
            value={formData.ownersContactNumber}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, "");
              setFormData({
                ...formData,
                ownersContactNumber: digitsOnly,
              });
            }}
            onKeyDown={(e) => {
              const allowedKeys = [
                "Backspace",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "Delete",
              ];
              if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>

        {/* Owner's Alternate Contact Number */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Alternate Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter phone number"
            maxLength={10}
            pattern="[0-9]{10}"
            inputMode="numeric"
            className="bg-black w-full h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-[14px] !placeholder:text-[8px] sm:placeholder:text-base text-white"
            value={formData.ownersAlternateContactNumber}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, "");
              setFormData({
                ...formData,
                ownersAlternateContactNumber: digitsOnly,
              });
            }}
            onKeyDown={(e) => {
              const allowedKeys = [
                "Backspace",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "Delete",
              ];
              if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
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
              Select locality
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
              Selected coordinates: {formData.latitude},{" "}
              {formData.longitude}
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
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Square Feet Area<span className="text-red-600">*</span>
          </label>
          <input
            required
            type="number"
            placeholder="0"
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={formData.squareFeetArea}
            onChange={(e) => {
              setFormData((formData) => {
                return { ...formData, squareFeetArea: e.target.value };
              });
            }}
          />
        </div>

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
            }}
          >
            <option value="" disabled>
              Select preference
            </option>
            <option value="Bachelors">Bachelors</option>
            <option value="Family">Family</option>
            <option value="Any">Any</option>
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
            }}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Any">Any</option>
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
            }}
          >
            <option value="" disabled>
              Select furnished type
            </option>
            <option value="Not Furnished">Not Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
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
          </select>
        </div>

        {/* Floor */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Floors<span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Enter floor number"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.floor}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || /^[0-9]+$/.test(val)) {
                setFormData({ ...formData, floor: val });
              }
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
            }}
          >
            <option value="" disabled>
              Select Washroom
            </option>
            <option value="Western">Western</option>
            <option value="Indian">Indian</option>
            <option value="Both">Both</option>
          </select>
        </div>

       {/* Appliances */}
<div className="w-full h-fit flex flex-col gap-3 items-start">
  <label className="text-[#FFFFFF] text-base font-medium">
    Appliances<span className="text-red-600">*</span>
  </label>
  <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal flex flex-wrap gap-2">
    <Select
      styles={customStyles}
      placeholder={<div className="text-white text-[18px]">Choose your App</div>}
      value={formData.appliances}
      options={appliancesOptions}
      onChange={handleOnChangeAppliances}
      isMulti={true}
    />
  </div>
</div>

{/* Amenities */}
<div className="w-full h-fit flex flex-col gap-3 items-start">
  <label className="text-[#FFFFFF] text-base font-medium">
    Amenities<span className="text-red-600">*</span>
  </label>
  <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal flex flex-wrap gap-2">
    <Select
      styles={customStyles}
      className="w-full"
      placeholder={
        <div className="text-white text-[18px] leading-[23px] font-normal">
          Choose your Amenities
        </div>
      }
      value={formData.amenities}
      options={amenitiesOptions}
      onChange={handleOnChangeAmenities}
      isMulti={true}
    />
  </div>
</div>
      </div>
    </>
  );
};

export default Form;