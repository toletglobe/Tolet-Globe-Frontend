export default function Frm2({ formData, setFormData }) {
  return (
    <div className="mt-8 h-fit w-full ">
   
      <div className="grid gap-y-12 mt-10 px-5 h-fit md:pr-0 md:grid-cols-2 md:gap-x-7 max-sm:gap-y-6 max-sm:mt-6 max-sm:px-2">
        {/* Pets Allowed  */}
        <div className="w-full h-fit flex flex-col gap-3 items-start ">
          <label className="text-[#FFFFFF] text-base font-medium">
            Pets Allowed
          </label>
          <select
            className="bg-black px-3 py-3 w-full h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
            value={formData.petsAllowed}
            onChange={(e) => {
              setFormData({ ...formData, petsAllowed: e.target.value });
            }}
          >
            <option value="" disabled>
              Select Pets Allowed
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="NA">NA</option>
          </select>
        </div>
       

        {/* Preference */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Preference
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
              Select Preference
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
            Bachelors
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
              Select Bachelors
            </option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Any">Any</option>
            <option value="NA">NA</option>
          </select>
        </div>

        {/* Type */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">Type</label>
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
              Select Type
            </option>
            <option value="Not Furnished">Not Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
            <option value="NA">NA</option>
          </select>
        </div>

        {/* BHK */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">BHK</label>
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
          <label className="text-[#FFFFFF] text-base font-medium">Floor</label>
          <select
            required
            className="bg-black px-3 py-3 w-full h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
            value={formData.floor}
            onChange={(e) => {
              setFormData({ ...formData, floor: e.target.value });
              // for Debugging
              console.log("Formdata:", formData);
            }}
          >
            <option value="" disabled>
              Select Floor
            </option>
            <option value="Ground Floor">Ground Floor</option>
            <option value="1st Floor">1st Floor</option>
            <option value="2nd Floor">2nd Floor</option>
            <option value="3rd Floor">3rd Floor</option>
            <option value="4th Floor">4th Floor</option>
            <option value="5th Floor">5th Floor</option>
            <option value="6th Floor">6th Floor</option>
            <option value="7th Floor">7th Floor</option>
            <option value="8th Floor">8th Floor</option>
            <option value="9th Floor">9th Floor</option>
            <option value="10th Floor">10th Floor</option>
            <option value="11th Floor">11th Floor</option>
            <option value="12th Floor">12th Floor</option>
            <option value="13th Floor">13th Floor</option>
            <option value="14th Floor">14th Floor</option>
            <option value="15th Floor">15th Floor</option>
            <option value="16th Floor">16th Floor</option>
            <option value="17th Floor">17th Floor</option>
            <option value="18th Floor">18th Floor</option>
            <option value="19th Floor">19th Floor</option>
            <option value="20th Floor">20th Floor</option>
            <option value="21th Floor">21th Floor</option>
            <option value="22th Floor">22th Floor</option>
            <option value="23th Floor">23th Floor</option>
            <option value="24th Floor">24th Floor</option>
            <option value="25th Floor">25th Floor</option>
            <option value="26th Floor">26th Floor</option>
            <option value="27th Floor">27th Floor</option>
            <option value="28th Floor">28th Floor</option>
            <option value="29th Floor">29th Floor</option>
            <option value="30th Floor">30th Floor</option>
            <option value="NA">NA</option>
          </select>
        </div>

        {/* Nearest Landmark */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Nearest Landmark
          </label>
          <input
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

        {/* Type of Washroom */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Type of Washroom
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

        {/* Cooling Facility  */}
        <div className="w-full h-fit flex flex-col gap-3 items-start">
          <label className="text-[#FFFFFF] text-base font-medium">
            Cooling Facility
          </label>
          <select
            required
            className="bg-black px-3 py-3 w-full h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
            value={formData.coolingFacility}
            onChange={(e) => {
              setFormData({
                ...formData,
                coolingFacility: e.target.value,
              });
            }}
          >
            <option value="" disabled>
              Select Cooling Facility
            </option>
            <option value="AC">AC</option>
            <option value="Fan">Fan</option>
            <option value="Cooler">Cooler</option>
            <option value="NA">NA</option>
          </select>
        </div>
      </div>
    </div>
  );
}
