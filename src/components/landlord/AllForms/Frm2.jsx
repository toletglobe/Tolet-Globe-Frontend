export default function Frm2({ formData, setFormData }) {
  return (
    <>
      <div className="mt-8 pl-5 h-fit">
        <div className="grid gap-x-10 gap-y-4 grid-rows-3 grid-flow-col">
          <div className="w-[30vw] h-fit flex flex-col gap-3 items-start">
            <label className="text-[#FFFFFF] text-base font-medium">
              Pets Allowed
            </label>
            <select
              required
              className="bg-black px-3 py-3 w-[95%] h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
              value={formData.petsAllowed}
              onChange={(e) => {
                setFormData({ ...formData, petsAllowed: e.target.value });
              }}
            >
              <option value="" disabled>
                Select Pets Allowed
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="w-[30vw] h-fit flex flex-col gap-3 items-start">
            <label className="text-[#FFFFFF] text-base font-medium">
              Bachelors
            </label>
            <select
              required
              className="bg-black px-3 py-3 w-[95%] h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
              value={formData.bachelors}
              onChange={(e) => {
                setFormData({ ...formData, bachelors: e.target.value });
              }}
            >
              <option value="" disabled>
                Select Bachelors
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="w-[30vw] h-fit flex flex-col gap-3 items-start">
            <label className="text-[#FFFFFF] text-base font-medium">BHK</label>
            <select
              required
              className="bg-black px-3 py-3 w-[95%] h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
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
            </select>
          </div>

          <div className="w-[30vw] h-fit flex flex-col gap-3 items-start">
            <label className="text-[#FFFFFF] text-base font-medium">
              Preference
            </label>
            <select
              required
              className="bg-black px-3 py-3 w-[95%] h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
              value={formData.preference}
              onChange={(e) => {
                setFormData({ ...formData, preference: e.target.value });
              }}
            >
              <option value="" disabled>
                Select Preference
              </option>
              <option value="Bachelors">Bachelors</option>
              <option value="Family">Family</option>
              <option value="Any">Any</option>
            </select>
          </div>

          <div className="w-[30vw] h-fit flex flex-col gap-3 items-start">
            <label className="text-[#FFFFFF] text-base font-medium">Type</label>
            <select
              required
              className="bg-black px-3 py-3 w-[95%] h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
              value={formData.type}
              onChange={(e) => {
                setFormData({ ...formData, type: e.target.value });
              }}
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Non-Furnished">Non-Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Fully-Furnished">Fully-Furnished</option>
            </select>
          </div>

          <div className="w-[30vw] h-fit flex flex-col gap-3 items-start">
            <label className="text-[#FFFFFF] text-base font-medium">
              Floor
            </label>
            <select
              required
              className="bg-black px-3 py-3 w-[95%] h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
              value={formData.floor}
              onChange={(e) => {
                setFormData({ ...formData, floor: e.target.value });
              }}
            >
              <option value="" disabled>
                Select Floor
              </option>
              <option value="Ground Floor">Ground Floor</option>
              <option value="1st Floor">1st Floor</option>
              <option value="2nd Floor">2nd Floor</option>
            </select>
          </div>
        </div>

        {/* Second grid */}

        <div className="mt-12 grid gap-x-10 gap-y-12  grid-rows-2 grid-flow-col">
          <div className="w-[30vw] h-fit flex flex-col gap-3 items-start">
            <label className="text-[#FFFFFF] text-base font-medium">
              Nearest Landmark
            </label>
            <input
              type="text"
              placeholder="Enter Nearest Landmark"
              className="bg-black px-3 py-3 w-[95%] h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
              value={formData.nearestLandmark}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  nearestLandmark: e.target.value,
                });
              }}
            />
          </div>

          <div className="w-[30vw] h-fit flex flex-col gap-3 items-start">
            <label className="text-[#FFFFFF] text-base font-medium">
              Cooling Facility
            </label>
            <select
              required
              className="bg-black px-3 py-3 w-[95%] h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
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
            </select>
          </div>

          <div className="w-[30vw] h-fit flex flex-col gap-3 items-start">
            <label className="text-[#FFFFFF] text-base font-medium">
              Type of Washroom
            </label>
            <select
              required
              className="bg-black px-3 py-3 w-[95%] h-14 rounded-[4px] border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8] placeholder:text-base"
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
        </div>
      </div>
    </>
  );
}
