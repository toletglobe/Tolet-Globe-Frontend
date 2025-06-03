import React, { useState } from 'react';

const Frm4 = () => {
  const [formData, setFormData] = useState({
    spaceType: '',
    propertyType: '',
  });

  const spaceTypeOptions = ['Residential', 'Commercial'];

  const residentialOptions = ['House', 'Flat', 'PG'];
  const commercialOptions = ['Office', 'Shop', 'Warehouse'];

  const allOptions = [...residentialOptions, ...commercialOptions];

  const optionRenderFun = (option) => (
    <option key={option} value={option}>
      {option}
    </option>
  );

  return (
    <div>
      {/* Space Type */}
      <div>
        <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
          Space<span className="text-red-600">*</span>
        </label>
        <select
          required
          className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
          value={formData.spaceType}
          onChange={(e) => {
            setFormData({ ...formData, spaceType: e.target.value, propertyType: '' });
          }}
        >
          <option value="" disabled>
            Select space type
          </option>
          {spaceTypeOptions.map(optionRenderFun)}
        </select>
      </div>

      {/* Property Type */}
      <div className="mt-4">
        <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
          Property<span className="text-red-600">*</span>
        </label>
        <select
          disabled={formData.spaceType === ''}
          required
          className="bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
          value={formData.propertyType}
          onChange={(e) => {
            setFormData({ ...formData, propertyType: e.target.value });
          }}
        >
          <option value="" disabled>
            Select property type
          </option>
          {formData.spaceType === 'Commercial'
            ? commercialOptions.map(optionRenderFun)
            : formData.spaceType === 'Residential'
            ? residentialOptions.map(optionRenderFun)
            : allOptions.map(optionRenderFun)}
        </select>
      </div>
    </div>
  );
};

export default Frm4;
