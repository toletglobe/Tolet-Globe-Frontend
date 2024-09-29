
export default function Frm4({formData, setFormData}) {
 

  const handleSelectChangeApp = (e) => {
    const options = e.target.options;
    let selected = [];

    for (let i = 0; i < options.length; i++){
      if (options[i].selected) {
        selected.push(options[i].value)
      }
    }

    setFormData((formData) => { return { ...formData, appliances: selected } });

  }

  const handleSelectChangeAmen = (e) => {
    const options = e.target.options;
    let selected = [];

    for (let i = 0; i < options.length; i++){
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }

    setFormData((formData) => { return { ...formData, amenities: selected } });
  }


  return (
    <>
      <div className="mt-10 pl-5 h-fit">
        <div className="text-white flex flex-col gap-y-9 items-start">
          <label className="text-[#FFFFFF] font-bold text-lg leading-6">
            Square Feet Area
          </label>
          <input
            required
            type="number"
            placeholder="0"
            className="bg-black w-[50%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.squareFeetArea}
            onChange={(e) => {
              setFormData((formData) => {
                return { ...formData, squareFeetArea: e.target.value };
              });
            }}
          />
        </div>

        <div className="mt-14 grid grid-flow-col grid-rows-1">
          <div className="flex flex-col gap-3 items-start font-bold text-lg">
            <label className="ml-4">Appliances</label>
            <select
              required
              className="bg-white mt-5 px-4 py-3 w-[80%] text-gray-600 outline outline-2 rounded-sm font-normal"
              multiple={true}
              value={formData.appliances}
              // onChange={(event)=>{setFormData({...formData, appliances: event.target.value })}}
              onChange={handleSelectChangeApp}
            >
              <option value="" disabled>
                Choose your Appliances
              </option>
              <option value="refrigerator">Refrigerator</option>
              <option value="oven">Oven</option>
              <option value="dishwasher">Dishwasher</option>
              <option value="heater">Heater</option>
              <option value="air conditioner">Air conditioner</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 items-start font-bold text-lg">
            <label className="text-white ml-4">Amenities</label>
            <select
              required
              className="bg-white mt-5 px-4 py-3 w-[80%] text-gray-600 outline outline-2 rounded-sm font-normal"
              multiple={true}
              value={formData.amenities}
              // onChange={(event) => {setFormData({ ...formData, Amenities: event.target.value });}}
              onChange={handleSelectChangeAmen}
            >
              <option value="" disabled>
                Choose your Amenities
              </option>
              <option value="gym">Gym</option>
              <option value="pool">Pool</option>
              <option value="balcony">Balcony</option>
              <option value="garden">Garden</option>
              <option value="elevator">Elevator</option>
            </select>
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

        <div className="mt-10 text-white flex flex-col gap-y-9 items-start">
          <label className="font-bold text-lg">Comments</label>
          <textarea
            className="bg-black w-[50%] h-36 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.comments}
            onChange={(e) => {
              setFormData((formData) => {
                return { ...formData, comments: e.target.value };
              });
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
}
