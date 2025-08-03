import React from "react";
import { IoClose } from "react-icons/io5";

const ImageUpload = ({ formData, setFormData }) => {
  const handleImageSubmit = (e) => {
    const existingImages = formData.images || [];
    const newFiles = Array.from(e.target.files);

    if (existingImages.length + newFiles.length > 7) {
      alert("You can upload a maximum of 7 images.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...existingImages, ...newFiles],
    }));
    e.target.value = "";
  };

  const removeImage = (index) => {
    const updatedImages = [...(formData.images || [])];
    const removedImage = updatedImages[index];
    updatedImages.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
      // Track removed images for backend processing
      removedImages: [...(prev.removedImages || []), removedImage],
    }));

    // for Debugging
    console.log("Formdata:", formData);
  };

  return (
    <>
      {/* Image Upload Section */}
      <div className="mt-10 px-5 h-fit md:pr-0 max-sm:mt-6 max-sm:px-2">
        {/* Image Upload Section */}
        <div className="mt-16">
          <label className="block mb-2 text-[#FFFFFF] text-base font-medium">
            Property image
          </label>
          <p className="text-sm mb-4">
            Note: Your first image will be the cover image of your property
          </p>

          <div className="flex flex-col md:flex-row gap-6 max-w-full">
            {/* Left - Big First Image */}
            <div className="flex-shrink-0 flex-1 md:flex-none md:w-[376px]">
              <div className="relative">
                {formData.images?.length > 0 ? (
                  <img
                    src={
                      typeof formData.images[0] === "object"
                        ? URL.createObjectURL(formData.images[0]) // File object
                        : formData.images[0] // URL string
                    }
                    alt="uploaded-0"
                    className="rounded-lg object-cover w-full h-70"
                  />
                ) : (
                  <div className="border-2 border-dashed border-[#C8C8C8] rounded-lg py-10 flex flex-col items-center">
                    <label className="cursor-pointer rounded-md text-yellow-600 font-bold px-4 py-6 h-[185px] flex items-center justify-center w-full">
                      + Upload cover image
                      <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageSubmit(e, 0)}
                      />
                    </label>
                  </div>
                )}
                {formData.images?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => removeImage(0)}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 transition"
                    aria-label="Remove image"
                  >
                    <IoClose size={16} color="white" />
                  </button>
                )}
              </div>
            </div>

            {/* Right - Grid of Remaining Images */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[400px] flex-shrink-0">
              {Array.from({ length: 6 }, (_, idx) => (
                <div key={idx} className="relative group">
                  {formData.images?.[idx + 1] ? (
                    <img
                      src={
                        typeof formData.images[idx + 1] === "object"
                          ? URL.createObjectURL(formData.images[idx + 1])
                          : formData.images[idx + 1]
                      }
                      alt={`uploaded-${idx + 1}`}
                      className="rounded-lg object-cover w-full h-32"
                    />
                  ) : (
                    <div className="border-2 border-dashed border-[#C8C8C8] rounded-lg h-32 flex items-center justify-center">
                      <label className="cursor-pointer text-yellow-600 font-bold">
                        + Add More
                        <input
                          type="file"
                          hidden
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageSubmit(e, idx + 1)}
                        />
                      </label>
                    </div>
                  )}
                  {formData.images?.[idx + 1] && (
                    <button
                      type="button"
                      onClick={() => removeImage(idx + 1)}
                      className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 transition"
                      aria-label="Remove image"
                    >
                      <IoClose size={16} color="white" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Uploaded {formData.images?.length || 0}/7 images
          </p>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
