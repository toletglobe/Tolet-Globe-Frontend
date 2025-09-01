import Select from "react-select";
import Pricing from "../PricngCard";

const AdditionalInfo = ({ formData, setFormData }) => {
  const { propertyType } = formData;

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

  const preferenceOptions = [
    { value: "Bachelors", label: "Bachelors" },
    { value: "Family", label: "Family" },
    { value: "Both", label: "Both" },
  ];

  const genderOptions = [
    { value: "Boys", label: "Boys" },
    { value: "Girls", label: "Girls" },
    { value: "Both", label: "Both" },
  ];

  const furnishedOptions = [
    { value: "Not Furnished", label: "Not Furnished" },
    { value: "Semi Furnished", label: "Semi Furnished" },
    { value: "Fully Furnished", label: "Fully Furnished" },
  ];

  const bhkOptions = [
    { value: "1", label: "1 BHK" },
    { value: "2", label: "2 BHK" },
    { value: "3", label: "3 BHK" },
    { value: "4", label: "4 BHK" },
    { value: "5", label: "5 BHK" },
  ];

  const washroomOptions = [
    { value: "Indian", label: "Indian" },
    { value: "Western", label: "Western" },
    { value: "Both", label: "Both" },
  ];

  const ownerLocationOptions = [
    { value: "Lives in same property", label: "Lives in same property" },
    {
      value: "Lives in different property",
      label: "Lives in different property",
    },
    { value: "Lives in different city", label: "Lives in different city" },
  ];

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

  const handleOnChangeAppliances = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setFormData((formData) => {
      return { ...formData, appliances: values };
    });
    // for Debugging
    console.log("Formdata:", formData);
  };

  const handleOnChangeAmenities = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setFormData((formData) => {
      return { ...formData, amenities: values };
    });
    // for Debugging
    console.log("Formdata:", formData);
  };

  const determineSubscriptionPlan = (rentData) => {
    let rent;

    // Handle case: single rent amount
    if (typeof rentData === "number" || typeof rentData === "string") {
      rent = Number(rentData);
    }

    // Handle case: PG with minRent and maxRent
    else if (
      typeof rentData === "object" &&
      rentData.minRent &&
      rentData.maxRent
    ) {
      rent = Number(rentData.maxRent);
    }

    // Safety fallback
    if (!rent || isNaN(rent)) return null;
    if (formData.propertyType === "House" || formData.propertyType === "Flat") {
      if (rent <= 6000) return 299;
      if (rent <= 15000) return 499;
      if (rent <= 25000) return 699;
      if (rent <= 50000) return 999;
      return 1499;
    } else if (
      formData.propertyType === "Warehouse" ||
      formData.propertyType === "Shop" ||
      formData.propertyType === "Office"
    ) {
      if (rent <= 25000) return 4999;
      if (rent <= 50000) return 9999;
      if (rent <= 75000) return 14999;
      if (rent <= 100000) return 19999;
      return 24999;
    }
  };

  return (
    <>
      <div className="sm:my-5 mt-7 mb-8 flex flex-col gap-2 md:pr-0">
        <h1 className="ml-4 mt-10 text-[#FFFFFF] text-xl md:text-[25px] leading-10 font-bold text-left whitespace-nowrap">
          Additional Information
        </h1>
        <hr className="ml-2" />
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
                  // for Debugging
                  console.log("Formdata:", formData);
                }}
              />
            </div>

            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Owner's Location<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select owner's location"
                value={
                  formData.ownerLocation
                    ? {
                        value: formData.ownerLocation,
                        label: formData.ownerLocation,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    ownerLocation: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={ownerLocationOptions}
              />
            </div>
          </div>
          <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
            {/* Preference */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Preference<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select preference"
                value={
                  formData.preference
                    ? { value: formData.preference, label: formData.preference }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    preference: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={preferenceOptions}
              />
            </div>
            {/* Gender - only show if Bachelors is selected */}
            {(formData.preference === "Bachelors" ||
              formData.preference === "Both") && (
              <div>
                <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                  Gender<span className="text-red-600">*</span>
                </label>
                <Select
                  required
                  styles={customSelectStyles}
                  placeholder="Select gender"
                  value={
                    formData.bachelors
                      ? { value: formData.bachelors, label: formData.bachelors }
                      : null
                  }
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      bachelors: selectedOption.value,
                    });
                    console.log("Formdata:", formData);
                  }}
                  options={genderOptions}
                />
              </div>
            )}

            {/* Type */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Furnished Type<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select furnished type"
                value={
                  formData.type
                    ? { value: formData.type, label: formData.type }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({ ...formData, type: selectedOption.value });
                  console.log("Formdata:", formData);
                }}
                options={furnishedOptions}
              />
            </div>

            {/* BHK */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                BHK<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select BHK"
                value={
                  formData.bhk
                    ? { value: formData.bhk, label: `${formData.bhk} BHK` }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({ ...formData, bhk: selectedOption.value });
                  console.log("Formdata:", formData);
                }}
                options={bhkOptions}
              />
            </div>

            {/* Floor */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Floors<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Enter floor number"
                required
                className="bg-black w-[100%] h-14 p-3 rounded-md border-2 border-[#C8C8C8] placeholder:text-[#C8C8C8]"
                value={formData.floor}
                onChange={(e) => {
                  const val = e.target.value;
                  // Ensure only positive integers or empty string
                  if (val === "" || /^[0-9]+$/.test(val)) {
                    setFormData({ ...formData, floor: val });
                  }
                  // For debigging
                  console.log("Formdata:", formData);
                }}
              />
            </div>

            {/* Type of Washroom */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Washroom<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select Washroom"
                value={
                  formData.typeOfWashroom
                    ? {
                        value: formData.typeOfWashroom,
                        label: formData.typeOfWashroom,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    typeOfWashroom: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={washroomOptions}
              />
            </div>

            {/* Appliances */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Appliances
              </label>
              <div className="mt-5 w-[100%]  text-[#000000] text-[16px] leading-[24px] font-normal">
                <Select
                  styles={customSelectStyles}
                  placeholder={"Choose your Appliances"}
                  value={
                    formData.appliances && Array.isArray(formData.appliances)
                      ? formData.appliances
                          .map((item) =>
                            appliancesOptions.find((opt) => opt.value === item)
                          )
                          .filter(Boolean)
                      : []
                  }
                  options={appliancesOptions}
                  onChange={handleOnChangeAppliances}
                  isMulti={true}
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Amenities
              </label>
              <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
                <Select
                  styles={customSelectStyles}
                  className="text-black"
                  placeholder={"Choose your Amenities"}
                  value={
                    formData.amenities && Array.isArray(formData.amenities)
                      ? formData.amenities
                          .map((item) =>
                            amenitiesOptions.find((opt) => opt.value === item)
                          )
                          .filter(Boolean)
                      : []
                  }
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
                About the Flat
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
                  // for Debugging
                  console.log("Formdata:", formData);
                }}
              />
            </div>

            {/* Owner's Location */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Owner's Location<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select owner's location"
                value={
                  formData.ownerLocation
                    ? {
                        value: formData.ownerLocation,
                        label: formData.ownerLocation,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    ownerLocation: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={ownerLocationOptions}
              />
            </div>
          </div>
          <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
            {/* Preference */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Preference<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select preference"
                value={
                  formData.preference
                    ? { value: formData.preference, label: formData.preference }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    preference: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={preferenceOptions}
              />
            </div>
            {/* Gender - only show if Bachelors is selected */}
            {(formData.preference === "Bachelors" ||
              formData.preference === "Both") && (
              <div>
                <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                  Gender<span className="text-red-600">*</span>
                </label>
                <Select
                  required
                  styles={customSelectStyles}
                  placeholder="Select gender"
                  value={
                    formData.bachelors
                      ? { value: formData.bachelors, label: formData.bachelors }
                      : null
                  }
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      bachelors: selectedOption.value,
                    });
                    console.log("Formdata:", formData);
                  }}
                  options={genderOptions}
                />
              </div>
            )}

            {/* Type */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Furnished Type<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select furnished type"
                value={
                  formData.type
                    ? { value: formData.type, label: formData.type }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({ ...formData, type: selectedOption.value });
                  console.log("Formdata:", formData);
                }}
                options={furnishedOptions}
              />
            </div>

            {/* BHK */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                BHK<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select BHK"
                value={
                  formData.bhk
                    ? { value: formData.bhk, label: `${formData.bhk} BHK` }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({ ...formData, bhk: selectedOption.value });
                  console.log("Formdata:", formData);
                }}
                options={bhkOptions}
              />
            </div>

            {/* Floor */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Floors<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Enter floor number"
                required
                className="bg-black w-[100%] h-14 p-3 rounded-md border-2 border-[#C8C8C8] placeholder:text-[#C8C8C8]"
                value={formData.floor}
                onChange={(e) => {
                  const val = e.target.value;
                  // Ensure only positive integers or empty string
                  if (val === "" || /^[0-9]+$/.test(val)) {
                    setFormData({ ...formData, floor: val });
                  }
                  // For debigging
                  console.log("Formdata:", formData);
                }}
              />
            </div>

            {/* Type of Washroom */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Washroom<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select Washroom"
                value={
                  formData.typeOfWashroom
                    ? {
                        value: formData.typeOfWashroom,
                        label: formData.typeOfWashroom,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    typeOfWashroom: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={washroomOptions}
              />
            </div>

            {/* Appliances */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Appliances
              </label>
              <div className="mt-5 w-[100%]  text-[#000000] text-[16px] leading-[24px] font-normal">
                <Select
                  styles={customSelectStyles}
                  placeholder={"Choose your Appliances"}
                  value={
                    formData.appliances && Array.isArray(formData.appliances)
                      ? formData.appliances
                          .map((item) =>
                            appliancesOptions.find((opt) => opt.value === item)
                          )
                          .filter(Boolean)
                      : []
                  }
                  options={appliancesOptions}
                  onChange={handleOnChangeAppliances}
                  isMulti={true}
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Amenities
              </label>
              <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
                <Select
                  styles={customSelectStyles}
                  className="text-black"
                  placeholder={"Choose your Amenities"}
                  value={
                    formData.amenities && Array.isArray(formData.amenities)
                      ? formData.amenities
                          .map((item) =>
                            amenitiesOptions.find((opt) => opt.value === item)
                          )
                          .filter(Boolean)
                      : []
                  }
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
                About the Flat
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
        </>
      )}

      {propertyType === "PG" && (
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
                  console.log("Formdata:", formData);
                }}
              />
            </div>

            {/* Owner's Location */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Owner's Location<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select owner's location"
                value={
                  formData.ownerLocation
                    ? {
                        value: formData.ownerLocation,
                        label: formData.ownerLocation,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    ownerLocation: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={ownerLocationOptions}
              />
            </div>
          </div>
          <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
            {/* Gender */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Gender<span className="text-red-600">*</span>
              </label>
              <Select
                disabled={formData.preference === "Family"}
                required
                styles={customSelectStyles}
                placeholder="Select gender"
                value={
                  formData.bachelors
                    ? { value: formData.bachelors, label: formData.bachelors }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({ ...formData, bachelors: selectedOption.value });
                  console.log("Formdata:", formData);
                }}
                options={genderOptions}
              />
            </div>

            {/* Type of Washroom */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Washroom<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select Washroom"
                value={
                  formData.typeOfWashroom
                    ? {
                        value: formData.typeOfWashroom,
                        label: formData.typeOfWashroom,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    typeOfWashroom: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={washroomOptions}
              />
            </div>

            {/* Appliances */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Appliances
              </label>
              <div className="mt-5 w-[100%]  text-[#000000] text-[16px] leading-[24px] font-normal">
                <Select
                  styles={customSelectStyles}
                  placeholder={"Choose your Appliances"}
                  value={
                    formData.appliances && Array.isArray(formData.appliances)
                      ? formData.appliances
                          .map((item) =>
                            appliancesOptions.find((opt) => opt.value === item)
                          )
                          .filter(Boolean)
                      : []
                  }
                  options={appliancesOptions}
                  onChange={handleOnChangeAppliances}
                  isMulti={true}
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Amenities
              </label>
              <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
                <Select
                  styles={customSelectStyles}
                  className="text-black"
                  placeholder={"Choose your Amenities"}
                  value={
                    formData.amenities && Array.isArray(formData.amenities)
                      ? formData.amenities
                          .map((item) =>
                            amenitiesOptions.find((opt) => opt.value === item)
                          )
                          .filter(Boolean)
                      : []
                  }
                  options={amenitiesOptions}
                  onChange={handleOnChangeAmenities}
                  isMulti={true}
                />
              </div>
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
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Owner's Location<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select owner's location"
                value={
                  formData.ownerLocation
                    ? {
                        value: formData.ownerLocation,
                        label: formData.ownerLocation,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    ownerLocation: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={ownerLocationOptions}
              />
            </div>
          </div>
          <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
            {/* Preference */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Preference<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select preference"
                value={
                  formData.preference
                    ? { value: formData.preference, label: formData.preference }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    preference: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={preferenceOptions}
              />
            </div>
            {/* Gender - only show if Bachelors is selected */}
            {(formData.preference === "Bachelors" ||
              formData.preference === "Both") && (
              <div>
                <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                  Gender<span className="text-red-600">*</span>
                </label>
                <Select
                  disabled={formData.preference === "Family" ? true : false}
                  required={formData.preference !== "Family"}
                  styles={customSelectStyles}
                  placeholder="Select gender"
                  value={
                    formData.bachelors
                      ? { value: formData.bachelors, label: formData.bachelors }
                      : null
                  }
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      bachelors: selectedOption.value,
                    });
                    console.log("Formdata:", formData);
                  }}
                  options={genderOptions}
                />
              </div>
            )}

            {/* Type */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Furnished Type<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select furnished type"
                value={
                  formData.type
                    ? { value: formData.type, label: formData.type }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({ ...formData, type: selectedOption.value });
                  console.log("Formdata:", formData);
                }}
                options={furnishedOptions}
              />
            </div>

            {/* BHK */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                BHK<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select BHK"
                value={
                  formData.bhk
                    ? { value: formData.bhk, label: `${formData.bhk} BHK` }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({ ...formData, bhk: selectedOption.value });
                  console.log("Formdata:", formData);
                }}
                options={bhkOptions}
              />
            </div>

            {/* Floor */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Floors<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Enter floor number"
                required
                className="bg-black w-[100%] h-14 p-3 rounded-md border-2 border-[#C8C8C8] placeholder:text-[#C8C8C8]"
                value={formData.floor}
                onChange={(e) => {
                  const val = e.target.value;
                  // Ensure only positive integers or empty string
                  if (val === "" || /^[0-9]+$/.test(val)) {
                    setFormData({ ...formData, floor: val });
                  }
                  // For debigging
                  console.log("Formdata:", formData);
                }}
              />
            </div>

            {/* Type of Washroom */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Washroom<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select Washroom"
                value={
                  formData.typeOfWashroom
                    ? {
                        value: formData.typeOfWashroom,
                        label: formData.typeOfWashroom,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    typeOfWashroom: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={washroomOptions}
              />
            </div>

            {/* Appliances */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Appliances
              </label>
              <div className="mt-5 w-[100%]  text-[#000000] text-[16px] leading-[24px] font-normal">
                <Select
                  styles={customSelectStyles}
                  placeholder={"Choose your Appliances"}
                  value={
                    formData.appliances && Array.isArray(formData.appliances)
                      ? formData.appliances
                          .map((item) =>
                            appliancesOptions.find((opt) => opt.value === item)
                          )
                          .filter(Boolean)
                      : []
                  }
                  options={appliancesOptions}
                  onChange={handleOnChangeAppliances}
                  isMulti={true}
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Amenities
              </label>
              <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
                <Select
                  styles={customSelectStyles}
                  className="text-black"
                  placeholder={"Choose your Amenities"}
                  value={
                    formData.amenities && Array.isArray(formData.amenities)
                      ? formData.amenities
                          .map((item) =>
                            amenitiesOptions.find((opt) => opt.value === item)
                          )
                          .filter(Boolean)
                      : []
                  }
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
                About the property
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
        </>
      )}

      {(propertyType === "Office" ||
        propertyType === "Warehouse" ||
        propertyType === "Shop") && (
        <>
          <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
            {/* Square Feet Area */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Square Feet Area<span className="text-red-600">*</span>
              </label>
              <input
                required
                type="number"
                placeholder="0"
                className="bg-black w-[100%] h-14 p-3 rounded-md border-2 border-[#C8C8C8] placeholder:text-[#C8C8C8] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={formData.squareFeetArea}
                onChange={(e) => {
                  setFormData((formData) => {
                    return { ...formData, squareFeetArea: e.target.value };
                  });
                }}
              />
            </div>

            {/* Owner's Location */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Owner's Location<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select owner's location"
                value={
                  formData.ownerLocation
                    ? {
                        value: formData.ownerLocation,
                        label: formData.ownerLocation,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    ownerLocation: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={ownerLocationOptions}
              />
            </div>
          </div>
          <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
            {/* Type */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Furnished Type<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select furnished type"
                value={
                  formData.type
                    ? { value: formData.type, label: formData.type }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({ ...formData, type: selectedOption.value });
                  console.log("Formdata:", formData);
                }}
                options={furnishedOptions}
              />
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
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Washroom<span className="text-red-600">*</span>
              </label>
              <Select
                required
                styles={customSelectStyles}
                placeholder="Select Washroom"
                value={
                  formData.typeOfWashroom
                    ? {
                        value: formData.typeOfWashroom,
                        label: formData.typeOfWashroom,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    typeOfWashroom: selectedOption.value,
                  });
                  console.log("Formdata:", formData);
                }}
                options={washroomOptions}
              />
            </div>

            {/* Appliances */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Appliances
              </label>
              <div className="mt-5 w-[100%]  text-[#000000] text-[16px] leading-[24px] font-normal">
                <Select
                  styles={customSelectStyles}
                  placeholder={"Choose your Appliances"}
                  value={
                    formData.appliances && Array.isArray(formData.appliances)
                      ? formData.appliances
                          .map((item) =>
                            appliancesOptions.find((opt) => opt.value === item)
                          )
                          .filter(Boolean)
                      : []
                  }
                  options={appliancesOptions}
                  onChange={handleOnChangeAppliances}
                  isMulti={true}
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
                Amenities
              </label>
              <div className="mt-5 w-[100%] text-[#000000] text-[16px] leading-[24px] font-normal">
                <Select
                  styles={customSelectStyles}
                  className="text-black"
                  placeholder={"Choose your Amenities"}
                  value={
                    formData.amenities && Array.isArray(formData.amenities)
                      ? formData.amenities
                          .map((item) =>
                            amenitiesOptions.find((opt) => opt.value === item)
                          )
                          .filter(Boolean)
                      : []
                  }
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
                About the property
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
              // for Debugging
              console.log("Formdata:", formData);
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
                      updatedData.subscriptionPlan =
                        determineSubscriptionPlan(updatedData);
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
                // for Debugging
                console.log("Formdata:", formData);
              }}
            />
          )}
        </div>
      </div>
      <div>
        <Pricing formData={formData} />
      </div>
    </>
  );
};

export default AdditionalInfo;
