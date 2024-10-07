export default function Frm1({ formData, setFormData }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-7 gap-y-12 mt-10 pl-5 h-fit">
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
          />
        </div>

        {/* Pin */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Pin Code
          </label>
          <input
            type="number"
            placeholder="Pin Code"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.pincode}
            onChange={(e) => {
              setFormData({ ...formData, pincode: e.target.value });
            }}
          />
        </div>
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            City
          </label>
          <input
            type="Text"
            placeholder="City"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.city}
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
            }}
          />
        </div>

        {/* Locality */}
        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Locality
          </label>
          <input
            type="text"
            placeholder="Enter Locality"
            required
            className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
            value={formData.locality}
            onChange={(e) => {
              setFormData({ ...formData, locality: e.target.value });
            }}
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
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="PG">PG</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Property Type
          </label>
          <select
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
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="PG">PG</option>
            <option value="Office">Office</option>
            <option value="Shop">Shop</option>
            <option value="Warehouse">Warehouse</option>
          </select>
        </div>
      </div>
    </>
  );
}
