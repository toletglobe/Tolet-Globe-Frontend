import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../../../../config/loadGoogleMaps";

export default function Frm1({ formData, setFormData }) {
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

  return (
    <>
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
        {/* First Name */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
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
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
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
            Owner's Contact Number
          </label>
          <input
            type="text"
            placeholder="Owner's Contact Number"
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
            Owner's Alternate Contact Number (Optional)
          </label>
          <input
            type="text"
            placeholder="Owner's Alternate Contact Number"
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

        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            City
          </label>
          <select
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.city}
            onChange={handleCityChange}
          >
            <option value="" disabled>
              Select City
            </option>
            {cityOptions.map(optionRenderFun)}
          </select>
        </div>

        {/* Locality */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Locality
          </label>
          <select
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.locality}
            onChange={handleLocalityChange}
            disabled={!formData.city}
          >
            <option value="" disabled>
              Select Locality
            </option>
            {formData.city &&
              cityLocalityData[formData.city].localities.map(optionRenderFun)}
          </select>
        </div>

        {/* Area */}
        {/* <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Area
          </label>
          <input
            type="text"
            placeholder="Enter Area"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.area}
            onChange={(e) => {
              setFormData({ ...formData, area: e.target.value });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          />
        </div> */}

        {/* Pin */}
        {/* <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Pin Code
          </label>
          <input
            type="text"
            placeholder="Pin Code"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.pincode}
            readOnly
          />
        </div> */}

        {/* Address */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter Address"
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

        {/* Space Type */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Space Type
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
              Select Space Type
            </option>
            {spaceTypeOptions.map(optionRenderFun)}
          </select>
        </div>

        {/* <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Property Type
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
              Select Property Type
            </option>

            {formData.spaceType === "Commercial"
              ? commercialOptions.map(optionRenderFun)
              : formData.spaceType === "Residential"
              ? residentialOptions.map(optionRenderFun)
              : allOptions.map(optionRenderFun)}
          </select>
        </div> */}
      </div>
    </>
  );
}
