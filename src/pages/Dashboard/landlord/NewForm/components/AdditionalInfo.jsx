import Select from "react-select";
import Pricing from "../PricngCard";


const AdditionalInfo = ({ formData, setFormData }) => {
  const { propertyType } = formData;


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#000000",
      color: "#FFFFFF",
      borderColor: "#C8C8C8",
      padding: "6px",
      minHeight: "3.5rem",
      boxShadow: state.isFocused ? "0 0 0 1px #C8C8C8" : "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#1F1F1F"
        : state.isFocused
        ? "#333333"
        : "#000000",
      color: "#FFFFFF",
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#FFFFFF",
      color: "#1F1F1F",
    }),
    input: (styles) => ({
      ...styles,
      color: "#FFFFFF",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#7D7D7D",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#FFFFFF",
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
    // for Debugging
    // console.log("Formdata:", formData);
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
    // for Debugging
    // console.log("Formdata:", formData);
  };

 const determineSubscriptionPlan = (rentData) => {
  let rent;

  // Handle case: single rent amount
  if (typeof rentData === "number" || typeof rentData === "string") {
    rent = Number(rentData);
  }

  // Handle case: PG with minRent and maxRent
  else if (typeof rentData === "object" && rentData.minRent && rentData.maxRent) {
    rent = Number(rentData.maxRent);
  }

  // Safety fallback
  if (!rent || isNaN(rent)) return null;

  if (rent <= 6000) return 299;
  if (rent <= 15000) return 499;
  if (rent <= 25000) return 699;
  if (rent <= 50000) return 999;
  return 1499;
};



  return (
    <>
      

      <div className="sm:my-5 mt-7 mb-8 flex flex-col gap-2 md:pr-0">
        <h1 className="mt-10 text-center text-[#FFFFFF] text-xl md:text-[25px] leading-10 font-bold md:text-left whitespace-nowrap">
          Additional Information
        </h1>
        <hr />
      </div>

       {propertyType === "" && (
        <>
           <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
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
      </div>
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
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
              // console.log("Formdata:", formData);
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
                // for Debugging
                // console.log("Formdata:", formData);
              }}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Any">Any</option>
              {/* <option value="NA">NA</option> */}
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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select furnished type
            </option>
            <option value="Not Furnished">Not Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
            {/* <option value="NA">NA</option> */}
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
              // console.log("Formdata:", formData);
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
            {/* <option value="NA">NA</option> */}
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
              // Ensure only positive integers or empty string
              if (val === "" || /^[0-9]+$/.test(val)) {
                setFormData({ ...formData, floor: val });
              }
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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select Washroom
            </option>
            <option value="Western">Western</option>
            <option value="Indian">Indian</option>
            <option value="Both">Both</option>
            {/* <option value="NA">NA</option> */}
          </select>
        </div>

        {/* Appliances */}
        <div className="w-full h-fit flex flex-col gap-3 items-start ">
          <label className="text-[#FFFFFF] text-base font-medium">
            Appliances<span className="text-red-600">*</span>
          </label>
          <div className="mt-5 w-[100%]  text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              placeholder={
                <div className="text-white  text-[18px] leading-[23px] font-normal">
                  Choose your Appliances
                </div>
              }
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
          <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              className="text-black"
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
      
      {/* About Property */}
      <div className=" mt-10 px-5 h-fit md:pr-0 max-sm:mt-6 max-sm:px-2">
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            About the Flat<span className="text-red-600">*</span>
          </label>
          <textarea
            className="bg-black min-[320px]:max-md:w-[100%] w-[100%] h-36 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.aboutTheProperty}
            onChange={(e) => {
              setFormData((formData) => {
                return { ...formData, aboutTheProperty: e.target.value };
              });
              // for Debugging
              // console.log("Formdata:", formData);
            }}
          ></textarea>
        </div>
      </div>
        </>
      )}
       
       {propertyType === "Flat" && (
        <>
           <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
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
      </div>
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
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
              // console.log("Formdata:", formData);
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
                // for Debugging
                // console.log("Formdata:", formData);
              }}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Any">Any</option>
              {/* <option value="NA">NA</option> */}
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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select furnished type
            </option>
            <option value="Not Furnished">Not Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
            {/* <option value="NA">NA</option> */}
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
              // console.log("Formdata:", formData);
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
            {/* <option value="NA">NA</option> */}
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
              // Ensure only positive integers or empty string
              if (val === "" || /^[0-9]+$/.test(val)) {
                setFormData({ ...formData, floor: val });
              }
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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select Washroom
            </option>
            <option value="Western">Western</option>
            <option value="Indian">Indian</option>
            <option value="Both">Both</option>
            {/* <option value="NA">NA</option> */}
          </select>
        </div>

        {/* Appliances */}
        <div className="w-full h-fit flex flex-col gap-3 items-start ">
          <label className="text-[#FFFFFF] text-base font-medium">
            Appliances<span className="text-red-600">*</span>
          </label>
          <div className="mt-5 w-[100%]  text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              placeholder={
                <div className="text-white  text-[18px] leading-[23px] font-normal">
                  Choose your Appliances
                </div>
              }
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
          <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              className="text-black"
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
      
      {/* About Property */}
      <div className=" mt-10 px-5 h-fit md:pr-0 max-sm:mt-6 max-sm:px-2">
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            About the Flat<span className="text-red-600">*</span>
          </label>
          <textarea
            className="bg-black min-[320px]:max-md:w-[100%] w-[100%] h-36 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.aboutTheProperty}
            onChange={(e) => {
              setFormData((formData) => {
                return { ...formData, aboutTheProperty: e.target.value };
              });
              // for Debugging
              // console.log("Formdata:", formData);
            }}
          ></textarea>
        </div>
      </div>
        </>
      )}

      {propertyType === "PG" && (
        <>
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
         {/* Preference */}
       
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
                // console.log("Formdata:", formData);
              }}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Any">Any</option>
              {/* <option value="NA">NA</option> */}
            </select>
        </div>

        {/* Type */}
      
        {/* BHK */}
               

        {/* Floor */}
       

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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select Washroom
            </option>
            <option value="Western">Western</option>
            <option value="Indian">Indian</option>
            <option value="Both">Both</option>
            {/* <option value="NA">NA</option> */}
          </select>
        </div>

        {/* Appliances */}
        <div className="w-full h-fit flex flex-col gap-3 items-start ">
          <label className="text-[#FFFFFF] text-base font-medium">
            Appliances<span className="text-red-600">*</span>
          </label>
          <div className="mt-5 w-[100%]  text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              placeholder={
                <div className="text-white  text-[18px] leading-[23px] font-normal">
                  Choose your Appliances
                </div>
              }
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
          <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              className="text-black"
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
              // console.log("Formdata:", formData);
            }}
          ></textarea>
        </div>
      </div>
        </>
      )}

         {propertyType === "House" && (
        <>
            <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
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
      </div>
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
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
              // console.log("Formdata:", formData);
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
                // for Debugging
                // console.log("Formdata:", formData);
              }}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Any">Any</option>
              {/* <option value="NA">NA</option> */}
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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select furnished type
            </option>
            <option value="Not Furnished">Not Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
            {/* <option value="NA">NA</option> */}
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
              // console.log("Formdata:", formData);
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
            {/* <option value="NA">NA</option> */}
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
              // Ensure only positive integers or empty string
              if (val === "" || /^[0-9]+$/.test(val)) {
                setFormData({ ...formData, floor: val });
              }
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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select Washroom
            </option>
            <option value="Western">Western</option>
            <option value="Indian">Indian</option>
            <option value="Both">Both</option>
            {/* <option value="NA">NA</option> */}
          </select>
        </div>

        {/* Appliances */}
        <div className="w-full h-fit flex flex-col gap-3 items-start ">
          <label className="text-[#FFFFFF] text-base font-medium">
            Appliances<span className="text-red-600">*</span>
          </label>
          <div className="mt-5 w-[100%]  text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              placeholder={
                <div className="text-white  text-[18px] leading-[23px] font-normal">
                  Choose your Appliances
                </div>
              }
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
          <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              className="text-black"
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
              // console.log("Formdata:", formData);
            }}
          ></textarea>
        </div>
      </div>
        </>
      )}

          {propertyType === "Office" && (
        <>
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
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
         {/* Preference */}
       
          {/* Bachelors */}
         

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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select furnished type
            </option>
            <option value="Not Furnished">Not Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
            {/* <option value="NA">NA</option> */}
          </select>
        </div>

        {/* BHK */}
     

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
              // Ensure only positive integers or empty string
              if (val === "" || /^[0-9]+$/.test(val)) {
                setFormData({ ...formData, floor: val });
              }
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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select Washroom
            </option>
            <option value="Western">Western</option>
            <option value="Indian">Indian</option>
            <option value="Both">Both</option>
            {/* <option value="NA">NA</option> */}
          </select>
        </div>

        {/* Appliances */}
        <div className="w-full h-fit flex flex-col gap-3 items-start ">
          <label className="text-[#FFFFFF] text-base font-medium">
            Appliances<span className="text-red-600">*</span>
          </label>
          <div className="mt-5 w-[100%]  text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              placeholder={
                <div className="text-white  text-[18px] leading-[23px] font-normal">
                  Choose your Appliances
                </div>
              }
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
          <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              className="text-black"
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
              // console.log("Formdata:", formData);
            }}
          ></textarea>
        </div>
      </div>
        </>
      )}

          {propertyType === "Shop" && (
        <>
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
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
         {/* Preference */}
       
          {/* Bachelors */}
       
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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select furnished type
            </option>
            <option value="Not Furnished">Not Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
            {/* <option value="NA">NA</option> */}
          </select>
        </div>

        {/* BHK */}
       
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
              // Ensure only positive integers or empty string
              if (val === "" || /^[0-9]+$/.test(val)) {
                setFormData({ ...formData, floor: val });
              }
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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select Washroom
            </option>
            <option value="Western">Western</option>
            <option value="Indian">Indian</option>
            <option value="Both">Both</option>
            {/* <option value="NA">NA</option> */}
          </select>
        </div>

        {/* Appliances */}
        <div className="w-full h-fit flex flex-col gap-3 items-start ">
          <label className="text-[#FFFFFF] text-base font-medium">
            Appliances<span className="text-red-600">*</span>
          </label>
          <div className="mt-5 w-[100%]  text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              placeholder={
                <div className="text-white  text-[18px] leading-[23px] font-normal">
                  Choose your Appliances
                </div>
              }
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
          <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              className="text-black"
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
              // console.log("Formdata:", formData);
            }}
          ></textarea>
        </div>
      </div>
        </>
      )}

         {propertyType === "Warehouse" && (
        <>
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
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
              // console.log("Formdata:", formData);
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
                // for Debugging
                // console.log("Formdata:", formData);
              }}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Any">Any</option>
              {/* <option value="NA">NA</option> */}
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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select furnished type
            </option>
            <option value="Not Furnished">Not Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
            {/* <option value="NA">NA</option> */}
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
              // console.log("Formdata:", formData);
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
            {/* <option value="NA">NA</option> */}
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
              // Ensure only positive integers or empty string
              if (val === "" || /^[0-9]+$/.test(val)) {
                setFormData({ ...formData, floor: val });
              }
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
              // console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select Washroom
            </option>
            <option value="Western">Western</option>
            <option value="Indian">Indian</option>
            <option value="Both">Both</option>
            {/* <option value="NA">NA</option> */}
          </select>
        </div>

        {/* Appliances */}
        <div className="w-full h-fit flex flex-col gap-3 items-start ">
          <label className="text-[#FFFFFF] text-base font-medium">
            Appliances<span className="text-red-600">*</span>
          </label>
          <div className="mt-5 w-[100%]  text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              placeholder={
                <div className="text-white  text-[18px] leading-[23px] font-normal">
                  Choose your Appliances
                </div>
              }
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
          <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
            <Select
              styles={customStyles}
              className="text-black"
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
              // console.log("Formdata:", formData);
            }}
          ></textarea>
        </div>
      </div>
        </>
      )}

    
    
      {/* Rent , coupon & Security Fields */}
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
        <div className="flex-1">
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Security Amount (If Applicable)
          </label>
          <input
            required
            type="number"
            min="0"
            step="1"
            placeholder="Enter security amount"
            className="mt-2 bg-black w-full h-14 p-3 rounded-md border border-[#C8C8C8] placeholder:text-[#C8C8C8] 
             [&::-webkit-outer-spin-button]:appearance-none 
             [&::-webkit-inner-spin-button]:appearance-none 
             appearance-none"
            value={formData.security || ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || /^[0-9]+$/.test(val)) {
                setFormData((prev) => ({ ...prev, security: val }));
              }
            }}
          />
        </div>
    <div className="flex-1 mt-10 md:mt-0">
  <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
    {formData.propertyType === "PG" ? (
      <>
        Min & Max Rent Amount <span className="text-red-800">*</span>
      </>
    ) : (
      <>
        Rent Amount <span className="text-red-800">*</span>
      </>
    )}
  </label>

  {formData.propertyType === "PG" ? (
  <div className="flex gap-4">
    <input
      type="number"
      placeholder="Min rent"
      required
      className="mt-2 bg-black w-full h-14 p-3 rounded-md border border-[#C8C8C8] placeholder:text-[#C8C8C8] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none"
      value={formData.minRent || ""}
      onChange={(e) => {
        const updatedMinRent = e.target.value;
        setFormData((prev) => {
          const updatedData = {
            ...prev,
            minRent: updatedMinRent,
          };

          // Optionally update subscription plan only when maxRent is already set
          if (updatedData.maxRent) {
            updatedData.subscriptionPlan = determineSubscriptionPlan(updatedData);
          }

          return updatedData;
        });
      }}
    />

    <input
      type="number"
      placeholder="Max rent"
      required
      className="mt-2 bg-black w-full h-14 p-3 rounded-md border border-[#C8C8C8] placeholder:text-[#C8C8C8] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none"
      value={formData.maxRent || ""}
     onChange={(e) => {
  const updatedMaxRent = e.target.value;

  setFormData((prev) => {
    const updatedData = {
      ...prev,
      maxRent: updatedMaxRent,
    };

    // Only compute subscriptionPlan if both minRent and maxRent exist
    if (updatedData.minRent && updatedMaxRent) {
      updatedData.subscriptionPlan = determineSubscriptionPlan({
        minRent: updatedData.minRent,
        maxRent: updatedMaxRent,
      });
    }

    return updatedData;
  });
}}

    />
  </div>
) : (
    <input
      type="number"
      placeholder="Enter rent amount"
      required
      className="mt-2 bg-black w-full h-14 p-3 rounded-md border border-[#C8C8C8] placeholder:text-[#C8C8C8] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none"
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
  )}
</div>


        
      </div>
      <div>
                    <Pricing formData={formData} />
                </div>
      <div>
        <div className="w-1/2">
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Coupon
          </label>
          <input
            type="text"
             placeholder="Enter Coupon"
              className="mt-2 bg-black w-full h-14 p-3 rounded-md border border-[#C8C8C8] placeholder:text-[#C8C8C8] appearance-none"
                value={formData.coupon || ""}
                onChange={(e) =>
                        setFormData((prev) => ({
                                  ...prev,
                                  coupon: e.target.value,
                                  }))
                                 }
                                  />
        </div>
        </div>          
    </>
  );
};

export default AdditionalInfo;