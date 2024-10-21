export default function Frm1({ formData, setFormData }) {

  const optionRenderFun = (value) => (
    <option key={value} value={value}>
      {value}
    </option>
  );

  const cityOptions = [
    "Lucknow",
    "Ayodhya",
    "Vellore",
    "Kota",
  ];

  const spaceTypeOptions = [
    "Residential",
    "Commercial",
    "NA",
  ];

  const residentialOptions = [
    "House",
    "Flat",
    "PG",
    "NA",
  ];

  const commercialOptions = [
    "Office",
    "Shop",
    "Warehouse",
    "NA",
  ];

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
      localities: ["Bakhtiarpur", "Bhadohi", "Bakhtiyarpur", "Bhadohi"],
      pincodes: ["224121", "224122", "224123", "224124"],
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

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFormData({
      ...formData,
      city: selectedCity,
      locality: "",
      pincode: "",
    });
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

  return (
    <>
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7">
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
            }}
            pattern="[0-9]{10}"
          />
        </div>
        {/* Owner's Alternate Contact Number */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Alternate Contact Number
          </label>
          <input
            type="text"
            placeholder="Owner's Contact Number"
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.ownersAlternateContactNumber}
            onChange={(e) => {
              setFormData({
                ...formData,
                ownersAlternateContactNumber: e.target.value,
              });
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
        <div>
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
            }}
          />
        </div>

        {/* Pin */}
        <div>
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
        </div>

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
            }}
          />
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
            }}
          >
            <option value="" disabled>
              Select Space Type
            </option>
            {spaceTypeOptions.map(optionRenderFun)}
          </select>
        </div>

        <div>
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
        </div>
      </div>
    </>
  );
}
