import React from "react";

export default function Frm3({ formData, setFormData }) {
  const handleImageSubmit = (e) => {
    const images = formData.images || [];
    if (images.length >= 10) {
      alert("We admit at most 10 images");
      return;
    }

    if (e.target.files.length === 1) {
      const file = e.target.files[0];
      setFormData((formData) => ({
        ...formData,
        images: [...(formData.images || []), file],
      }));
      e.target.value = "";
    } else if (e.target.files.length > 1) {
      if (images.length + e.target.files.length > 10) {
        alert("We admit at most 10 images");
        return;
      }
      const filesArray = Array.from(e.target.files);
      setFormData((formData) => ({
        ...formData,
        images: [...(formData.images || []), ...filesArray],
      }));
    }
  };

  const handleVideoSubmit = (e) => {
    const videos = formData.videos || [];
    if (videos.length + e.target.files.length > 5) {
      alert("We admit at most 5 videos");
      return;
    }
    if (e.target.files.length === 1) {
      const file = e.target.files[0];
      setFormData((formData) => ({
        ...formData,
        videos: [...(formData.videos || []), file],
      }));
      e.target.value = "";
    } else {
      const filesArray = Array.from(e.target.files);
      setFormData((formData) => ({
        ...formData,
        videos: [...(formData.videos || []), ...filesArray],
      }));
    }
  };

  return (
    <>
      <div className="mt-10 px-5 md:pl-5 md:px-0">
        <div className="w-full max-w-md mx-auto md:max-w-full">
          <div className="text-gray-200 font-bold text-lg w-fit">
            Car Parking
          </div>
          <div className="mt-16 w-fit">
            <input
              type="radio"
              id="yes_btn"
              name="car_Parking"
              hidden
              value="Yes"
              onChange={(e) => {
                if (e.target.checked) {
                  setFormData((formData) => ({
                    ...formData,
                    carParking: e.target.value,
                  }));
                }
              }}
            />
            <label
              htmlFor="yes_btn"
              className={`border-2 border-gray-200 rounded-md py-3 px-4 mr-4 ${
                formData.carParking === "Yes"
                  ? "text-black bg-gray-200"
                  : "text-gray-200"
              }`}
            >
              Yes
            </label>

            <input
              type="radio"
              id="no_btn"
              name="car_Parking"
              hidden
              value="No"
              onChange={(e) => {
                if (e.target.checked) {
                  setFormData((formData) => ({
                    ...formData,
                    carParking: e.target.value,
                  }));
                }
              }}
            />
            <label
              htmlFor="no_btn"
              className={`border-2 border-gray-200 rounded-md py-3 px-4 mr-4 ${
                formData.carParking === "No"
                  ? "text-black bg-white"
                  : "text-gray-200"
              }`}
            >
              No
            </label>
          </div>

          <div className="mt-16">
            <div className="flex flex-col">
              <label className="w-fit text-gray-200 font-bold text-lg">
                Subscription Amount
              </label>
              <input
                required
                type="text"
                placeholder=" ₹ 5,00,000"
                className="mt-10 bg-black w-full h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
                value={formData.subscriptionAmount}
                onChange={(e) => {
                  setFormData((formData) => ({
                    ...formData,
                    subscriptionAmount: e.target.value,
                  }));
                }}
              />
            </div>
          </div>

          <div className="mt-16">
            <h3 className="w-fit text-gray-200 font-bold text-lg">Photos</h3>
            <div className="border-2 border-dashed rounded-lg mt-16 py-10 flex flex-col justify-center items-center">
              <h3 className="text-gray-200 font-bold text-lg">Upload Photos</h3>
              <p className="mt-2 mb-6 text-gray-200 text-xs truncate">
                Add images that showcase your property's best features.
              </p>

              <div className="flex justify-between gap-x-10 min-[320px]:max-sm:flex-col gap-y-5">
                <label className="border-2 border-gray-200 rounded-md bg-[#E8EDF2] text-[#0D141C] font-bold px-4 py-2">
                  Add photos
                  <input
                    type="file"
                    hidden
                    multiple={true}
                    onChange={handleImageSubmit}
                  />
                </label>
                {/*
                <label className="border-2 border-gray-200 rounded-md bg-[#E8EDF2] text-[#0D141C] font-bold px-4 py-2">
                  Add videos
                  <input
                    type="file"
                    hidden
                    multiple={true}
                    onChange={handleVideoSubmit}
                  />
                </label>
                */}
              </div>
            </div>
            <p className="mt-14 text-[#C8A117]">
              You've uploaded {formData.images?.length || 0}/5 photos
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
