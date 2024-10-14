import Select from "react-select";

export default function Frm4({ formData, setFormData }) {
 
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      minHeight: "46px",
      boxShadow: "none",
      border: 0,
    }),
  };
  const appliancesOptions = [
    { value: "NA", label: "NA" },
    { value: "Refrigerator", label: "Refrigerator" },
    { value: "Heater", label: "Heater" },
    { value: "Oven", label: "Oven" },
    { value: "Dishwasher", label: "Dishwasher" },
    { value: "Air Conditioner", label: "Air Conditioner" },
  ];

  const handleOnChangeAppliances = (selectedOptions) => {
    // console.log("SO: ", selectedOptions);

    setFormData((formData) => {
      return { ...formData, appliances: selectedOptions };
    });
  };

  const amenitiesOptions = [
    { value: "NA", label: "NA" },
    { value: "Gym", label: "Gym" },
    { value: "Pool", label: "Pool" },
    { value: "Balcony", label: "Balcony" },
    { value: "Garden", label: "Garden" },
    { value: "Elevator", label: "Elevator" },
    { value: "24 Hrs Supply", label: "24 Hrs Supply" },
    { value: "Club House", label: "Club House" },
  ];

  const handleOnChangeAmenities = (selectedOptions) => {
    // console.log("SO: ", selectedOptions);

    setFormData((formData) => {
      return { ...formData, amenities: selectedOptions };
    });
  };


  return (
    <>
      <div className="mt-10 pl-5 h-fit">
        <div className="mt-14 grid grid-flow-col grid-rows-1 gap-x-10">
          <div className="text-white flex flex-col gap-y-9 items-start">
            <label className="text-[#FFFFFF] font-bold text-lg leading-6">
              Square Feet Area
            </label>
            <input
              required
              type="text"
              placeholder="0"
              // pattern="^(NA|\d+)$"
              className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
              value={formData.squareFeetArea}
              onChange={(e) => {
                setFormData((formData) => {
                  return { ...formData, squareFeetArea: e.target.value };
                });
              }}
            />
          </div>
          <div className="text-white flex flex-col gap-y-9 items-start">
            <label className="text-[#FFFFFF] font-bold text-lg leading-6">
              Location Link
            </label>
            <input
              placeholder="Google Maps location link here"
              className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
              value={formData.locationLink}
              onChange={(e) => {
                setFormData((formData) => {
                  return { ...formData, locationLink: e.target.value };
                });
              }}
            />
          </div>
        </div>

        <div className="mt-14 grid grid-flow-col grid-rows-1 gap-x-10">
          <div className="flex flex-col gap-3 items-start font-bold text-lg">
            <div className="ml-4">Appliances</div>
            <div className="mt-5 w-[466px] text-[#000000] text-[16px] leading-[24px] font-normal">
              <Select
                styles={customStyles}
                placeholder={
                  <div className="text-[#7D7D7D] text-[18px] leading-[23px] font-normal">
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

          <div className="flex flex-col gap-3 items-start font-bold text-lg">
            <div className="text-white ml-4">Amenities</div>
            <div className="mt-5 w-[466px] text-[#000000] text-[16px] leading-[24px] font-normal">
              <Select
                styles={customStyles}
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

        <div className="mt-10 text-white flex flex-col gap-y-9 items-start">
          <label className="font-bold text-lg">About the property</label>
          <textarea
            className="bg-black w-[50%] h-36 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.aboutTheProperty}
            onChange={(e) => {
              setFormData((formData) => {
                return { ...formData, aboutTheProperty: e.target.value };
              });
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
}
