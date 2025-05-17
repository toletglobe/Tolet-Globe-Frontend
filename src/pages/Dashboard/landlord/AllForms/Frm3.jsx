
import { X } from 'lucide-react';

import { IoClose } from "react-icons/io5";


export default function Frm3({ formData, setFormData }) {
  const handleImageSubmit = (e) => {
    const existingImages = formData.images || [];
    const newFiles = Array.from(e.target.files);

    if (existingImages.length + newFiles.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...existingImages, ...newFiles],
    }));
    e.target.value = '';
  };

  const handleVideoSubmit = (e) => {
    const existingVideos = formData.videos || [];
    const newFiles = Array.from(e.target.files);

    if (existingVideos.length + newFiles.length > 5) {
      alert("You can upload a maximum of 5 videos.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      videos: [...existingVideos, ...newFiles],
    }));
    e.target.value = '';
  };

  const removeImage = (index) => {
    const updatedImages = [...(formData.images || [])];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  return (
    <div className="mt-10 px-5 md:px-0">
      <div className="w-full max-w-md mx-auto md:max-w-full">
        {/* Rent & Security Fields */}
        <div className="mt-16 flex flex-col md:flex-row md:gap-8">
          <div className="flex-1">
            <label className="text-gray-200 font-bold text-lg">Security Amount (If Applicable)</label>
            <input
              required
              type="text"
              placeholder="₹ 5,00,000"
              className="mt-2 bg-black w-full h-14 p-3 rounded-md border border-[#C8C8C8] placeholder:text-[#C8C8C8]"
              value={formData.security || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, security: e.target.value }))}
            />
          </div>
          <div className="flex-1 mt-10 md:mt-0">
            <label className="text-gray-200 font-bold text-lg">
              Rent Amount <span className="text-red-800">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="₹ 25,000"
              className="mt-2 bg-black w-full h-14 p-3 rounded-md border border-[#C8C8C8] placeholder:text-[#C8C8C8]"
              value={formData.rent || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, rent: e.target.value }))}
            />
          </div>
        </div>

       {/* Image Upload Section */}
<div className="mt-16">
  <h3 className="text-gray-200 font-bold text-lg mb-4">Photos</h3>

  {(formData.images?.length || 0) === 0 && (
    <div className="border-2 border-dashed border-yellow-600 rounded-lg py-10 flex flex-col items-center">      
      <label className="cursor-pointer rounded-md text-yellow-600 font-bold px-4 py-2">
       + Add More
        <input type="file" hidden multiple accept="image/*" onChange={handleImageSubmit} />
      </label>
    </div>
  )}

  {(formData.images?.length || 0) === 1 && (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left - First image */}
      <div className="flex-1">
        <div className="relative">
          <img
            src={URL.createObjectURL(formData.images[0])}
            alt="uploaded-0"
            className="rounded-lg object-cover w-full h-48"
          />
          <button
            onClick={() => removeImage(0)}
            className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 transition"
            aria-label="Remove image"
          >
            <X size={16} color="white" />
          </button>
          {(formData.images?.length || 0) === 1 && (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left - First image */}
              <div className="flex-1">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.images[0])}
                    alt="uploaded-0"
                    className="rounded-lg object-cover w-full h-48"
                  />
                  <button
                    onClick={() => removeImage(0)}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 transition"
                    aria-label="Remove image"
                  >
                    <IoClose size={16} color="white" />
                  </button>
                </div>
              </div>

              {/* Right - Add more UI */}
              <div className="flex-1 border-2 border-dashed rounded-lg border-yellow-600 py-10 flex flex-col justify-center items-center">
                {formData.images.length < 10 && (
                  <label className="cursor-pointer  rounded-md text-yellow-600  font-bold px-4 py-2">
                    Add More
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageSubmit}
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          {(formData.images?.length || 0) >= 2 && (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left - Always the first image */}
              <div className="flex-1">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.images[0])}
                    alt="uploaded-0"
                    className="rounded-lg object-cover w-full h-48"
                  />
                  <button
                    onClick={() => removeImage(0)}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 transition"
                    aria-label="Remove image"
                  >
                    <IoClose size={16} color="white" />
                  </button>
                </div>
              </div>

              {/* Right - Grid of rest images */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.slice(1).map((img, idx) => (
                  <div key={idx + 1} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`uploaded-${idx + 1}`}
                      className="rounded-lg object-cover w-full h-32"
                    />
                    <button
                      onClick={() => removeImage(idx + 1)}
                      className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 transition"
                      aria-label="Remove image"
                    >
                      <IoClose size={16} color="white" />
                    </button>
                  </div>
                ))}

                {/* Add photo button inside grid */}
                {formData.images.length < 10 && (
                  <label className="flex items-center justify-center border-2 border-dashed  border-yellow-600 rounded-lg cursor-pointer h-32 transition text-yellow-600 font-bold text-sm">
                    Add Photo
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageSubmit}
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          <p className="mt-4 text-sm text-gray-400">
            Uploaded {formData.images?.length || 0}{" "}
            {formData.images?.length === 1 ? "image" : "images"}.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            {formData.images?.length === 10 &&
              " You have reached the maximum limit of 10 images."}
          </p>

        </div>
      </div>

      {/* Right - Add more UI */}
      <div className="flex-1 border-2 border-dashed rounded-lg border-yellow-600 py-10 flex flex-col justify-center items-center">
       
        {formData.images.length < 10 && (
          <label className="cursor-pointer  rounded-md text-yellow-600  font-bold px-4 py-2">
            Add More
            <input type="file" hidden multiple accept="image/*" onChange={handleImageSubmit} />
          </label>
        )}
      </div>
    </div>
  )}

  {(formData.images?.length || 0) >= 2 && (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left - Always the first image */}
      <div className="flex-1">
        <div className="relative">
          <img
            src={URL.createObjectURL(formData.images[0])}
            alt="uploaded-0"
            className="rounded-lg object-cover w-full h-48"
          />
          <button
            onClick={() => removeImage(0)}
            className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 transition"
            aria-label="Remove image"
          >
            <X size={16} color="white" />
          </button>
        </div>
      </div>

      {/* Right - Grid of rest images */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
        {formData.images.slice(1).map((img, idx) => (
          <div key={idx + 1} className="relative group">
            <img
              src={URL.createObjectURL(img)}
              alt={`uploaded-${idx + 1}`}
              className="rounded-lg object-cover w-full h-32"
            />
            <button
              onClick={() => removeImage(idx + 1)}
              className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 transition"
              aria-label="Remove image"
            >
              <X size={16} color="white" />
            </button>
          </div>
        ))}

        {/* Add photo button inside grid */}
        {formData.images.length < 10 && (
          <label className="flex items-center justify-center border-2 border-dashed  border-yellow-600 rounded-lg cursor-pointer h-32 transition text-yellow-600 font-bold text-sm">
            Add Photo
            <input type="file" hidden multiple accept="image/*" onChange={handleImageSubmit} />
          </label>
        )}
      </div>
    </div>
  )}

  <p className="mt-4 text-sm text-gray-400">
    Uploaded {formData.images?.length || 0}5 images
  </p>
</div>


      </div>
    </div>
  );
}
