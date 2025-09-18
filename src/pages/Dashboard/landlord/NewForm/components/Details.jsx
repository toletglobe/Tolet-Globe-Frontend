import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../../../../../config/loadGoogleMaps";
import Select from "react-select";
import areas from "../../../../PropertyListing/Listings/areas";
import CreatableSelect from "react-select/creatable";

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

  const allOptions = ["House", "Flat", "PG", "Office", "Shop", "Warehouse"];

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

    // If Google Maps failed to load
    if (
      typeof window.google === "undefined" ||
      !window.google.maps ||
      !window.google.maps.Map ||
      !window.google.maps.marker ||
      !window.google.maps.marker.AdvancedMarkerElement
    ) {
      console.warn(
        "Google Maps API not available or AdvancedMarkerElement unsupported"
      );
      return; //  do nothing, skip map
    }

    let position;
    if (formData.latitude && formData.longitude) {
      position = {
        lat: Number(formData.latitude),
        lng: Number(formData.longitude),
      };
    } else if (formData.city && formData.locality) {
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

    // Initialize map
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

    // Ensure lat/lng always gets updated in formData
    setFormData((prev) => ({
      ...prev,
      latitude: position.lat,
      longitude: position.lng,
    }));
  }, [formData.city, formData.locality, isLoading]);

  const handleCityChange = (selectedOption) => {
    const selectedCity = selectedOption.value;
    const cityPosition = cityCoordinates[selectedCity];

    setFormData((prev) => ({
      ...prev,
      city: selectedCity,
      locality: "",
      pincode: "",
      latitude: cityPosition.lat, // Reset coordinates to city center
      longitude: cityPosition.lng,
    }));

    // for Debugging
    console.log("Formdata:", formData);

    // Update map and marker position immediately
    if (map && marker) {
      map.setCenter(cityPosition);
      map.setZoom(13);
      marker.position = cityPosition;
    }
  };

  const handleLocalityChange = (selectedOption) => {
    const selectedLocality = selectedOption.value;
    const selectedCity = formData.city;
    const localityIndex =
      cityLocalityData[selectedCity].localities.indexOf(selectedLocality);
    const correspondingPincode =
      cityLocalityData[selectedCity].pincodes[localityIndex];
    const localityPosition =
      localityCoordinates[selectedCity][selectedLocality];

    setFormData((prev) => ({
      ...prev,
      locality: selectedLocality,
      pincode: correspondingPincode,
      latitude: localityPosition.lat, // Update coordinates to locality center
      longitude: localityPosition.lng,
    }));

    // for Debugging
    console.log("Formdata:", formData);

    if (map && marker) {
      map.setCenter(localityPosition);
      map.setZoom(13);
      marker.position = localityPosition; // Update to use localityPosition
    }
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
    // for Debugging
    // console.log("Formdata:", formData);
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
    // console.log("Formdata:", formData);
  };
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "none",
      color: "white",
      height: "3.5rem",
      borderRadius: "0.375rem",
      border: "2px solid #C8C8C8",
      padding: "0 0.25rem",
      boxShadow: "white",
    }),
    input: (base) => ({
      ...base,
      color: "white", // ✅ Entered text color
    }),
    placeholder: (base) => ({
      ...base,
      color: "none",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "black",
      border: "1px solid #C8C8C8",
      borderRadius: "0.375rem",
      marginTop: "0.1rem",
      zIndex: 999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "none" // selected
        : state.isFocused
        ? "none" // hover (Tailwind gray-600)
        : "none",
      color: "white",
      padding: "12px 16px",
      cursor: "pointer",
      borderLeft: state.isSelected
        ? "5px solid #C8C8C8"
        : state.isFocused
        ? "5px solid #C8C8C8"
        : "none", // selected
      borderBottom: "2.5px solid #C8C8C8",
    }),
  };

  return (
    <>
      <div className="sm:my-5 mt-7 mb-8 flex flex-col gap-2 md:pr-0">
        <h1 className="ml-4 text-[#FFFFFF] text-xl md:text-[25px] leading-10 font-bold text-left whitespace-nowrap">
          Property Details
        </h1>
        <hr className="ml-2" />
      </div>
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
            type="tel"
            placeholder="Enter phone number"
            required
            maxLength={10}
            pattern="[0-9]{10}"
            inputMode="numeric"
            className="bg-black w-full h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] text-white"
            value={formData.ownersContactNumber}
            onChange={(e) => {
              // Remove non-digit characters in real-time
              const digitsOnly = e.target.value.replace(/\D/g, "");
              setFormData({
                ...formData,
                ownersContactNumber: digitsOnly,
              });
              // for Debugging
              console.log("Formdata:", formData);
            }}
            onKeyDown={(e) => {
              // Allow only numbers and essential keys
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
            value={
              formData.ownersAlternateContactNumber === "NA"
                ? ""
                : formData.ownersAlternateContactNumber
            }
            onChange={(e) => {
              // Sanitize input to allow only digits
              const digitsOnly = e.target.value.replace(/\D/g, "");
              setFormData({
                ...formData,
                ownersAlternateContactNumber: digitsOnly,
              });
              // for Debugging
              console.log("Formdata:", formData);
            }}
            onKeyDown={(e) => {
              // Block non-digit key entries
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
          <Select
            options={cityOptions.map((city) => ({ value: city, label: city }))}
            value={
              formData.city
                ? { value: formData.city, label: formData.city }
                : null
            }
            onChange={handleCityChange}
            placeholder="Select city, state"
            styles={customSelectStyles}
          />
        </div>

        {/* Locality */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Locality<span className="text-red-600">*</span>
          </label>
          <CreatableSelect
            isDisabled={!formData.city}
            placeholder="Select or enter locality"
            value={
              formData.locality
                ? { value: formData.locality, label: formData.locality }
                : null
            }
            onChange={(selectedOption) => {
              setFormData((prev) => ({
                ...prev,
                locality: selectedOption?.value || "",
              }));
            }}
            options={
              formData.city
                ? cityLocalityData[formData.city].localities.map((loc) => ({
                    value: loc,
                    label: loc,
                  }))
                : []
            }
            styles={customSelectStyles}
            isClearable
          />
        </div>

        {/* Area */}
        <div className="">
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Area<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Type to search area"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.area || areaSearch}
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
            <div className="z-10 w-full mt-1 max-h-60 overflow-y-auto bg-black border border-[#C8C8C8] rounded-md">
              {filteredAreas.map((area, index) => (
                <div
                  key={index}
                  // className="px-4 py-2 cursor-pointer hover:bg-gray-800 text-[#C8C8C8]"
                  className="bg-black text-white w-full h-14 p-3 border-b-2 border-[#C8C8C8] placeholder:text-[#C8C8C8] hover:border-l-4 hover:border-[#C8C8C8] focus:ring-0"
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

        {/* Nearest Landmark */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
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
              // for Debugging
              console.log("Formdata:", formData);
            }}
          />
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
            className="bg-black w-full h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] text-white"
            value={formData.pincode}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, pincode: e.target.value }))
            }
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
              Selected coordinates: {formData.latitude}, {formData.longitude}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Property<span className="text-red-600">*</span>
          </label>
          <Select
            required
            styles={customSelectStyles}
            placeholder="Select property type"
            value={
              formData.propertyType
                ? { value: formData.propertyType, label: formData.propertyType }
                : null
            }
            onChange={(selectedOption) => {
              setFormData({ ...formData, propertyType: selectedOption.value });
              console.log("Formdata:", formData);
            }}
            options={allOptions.map((opt) => ({
              label: opt,
              value: opt,
            }))}
          />
        </div>

        {/* Space Type */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Space<span className="text-red-600">*</span>
          </label>
          <Select
            required
            styles={customSelectStyles}
            placeholder="Select space type"
            value={
              formData.spaceType
                ? { value: formData.spaceType, label: formData.spaceType }
                : null
            }
            onChange={(selectedOption) => {
              setFormData({ ...formData, spaceType: selectedOption.value });
              console.log("Formdata:", formData);
            }}
            options={spaceTypeOptions.map((opt) => ({
              label: opt,
              value: opt,
            }))}
          />
        </div>
      </div>

      {/* Coupon */}
    </>
  );
};

export default Form;