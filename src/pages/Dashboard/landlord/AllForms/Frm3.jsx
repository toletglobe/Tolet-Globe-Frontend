export default function Frm3({ formData, setFormData }) {
  const handleImageSubmit = (e) => {
    if (formData.images.length >= 10) {
      alert("We admit at most 10 images");
      return;
    }

    if (e.target.files.length == 1) {
      const file = e.target.files[0];

      setFormData((formData) => {
        return {
          ...formData,
          images: [...formData.images, file],
        };
      });

      e.target.value = ""; // if you want that user do not put same file multiple times then use it.
    } else if (e.target.files.length > 1) {
      if (formData.images.length + e.target.files.length > 10) {
        alert("We admit at most 10 images");
        return;
      }

      const filesArray = Array.from(e.target.files);

      setFormData((formData) => {
        return {
          ...formData,
          images: [...formData.images, ...filesArray],
        };
      });
    }
  };

   const handleVideoSubmit = (e) => {
     if (formData.videos.length + e.target.files.length > 5) {
       alert("We admit at most 5 videos");
       return;
     }

     if (e.target.files.length === 1) {
       const file = e.target.files[0];

       setFormData((formData) => {
         return { ...formData, videos: [...formData.videos, file] };
       });

       e.target.value = "";
     } else {
       const filesArray = Array.from(e.target.files);

       setFormData((formData) => {
         return { ...formData, videos: [...formData.videos, ...filesArray] };
       });
     }
   };

  return (
    <>
      <div className="mt-10 h-fit px-5 md:pl-5 md:px-0">
        <div className="text-gray-200 font-bold text-lg w-fit">Car Parking</div>
        <div className="mt-16 w-fit">
          <input
            type="radio"
            id="yes_btn"
            name="car_Parking"
            hidden
            value="Yes"
            onChange={(e) => {
              if (e.target.checked) {
                setFormData((formData) => {
                  formData = {
                    ...formData,
                    carParking: e.target.value,
                  };
                  return formData;
                });
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
                setFormData((formData) => {
                  formData = {
                    ...formData,
                    carParking: e.target.value,
                  };
                  return formData;
                });
              }
            }}
          />
          <label
            htmlFor="no_btn"
            className={`border-2 border-gray-200 rounded-md py-3 px-4 mr-4  ${
              formData.carParking === "No"
                ? "text-black bg-white"
                : "text-gray-200"
            }`}
          >
            No
          </label>
        </div>

        <div className="mt-16 grid gap-y-14 sm:grid-cols-2 sm:gap-x-14">
          <div className=" flex flex-col">
            <label className="w-fit text-gray-200 font-bold text-lg">
              Rent Amount
            </label>
            <input
              required
              type="text"
              placeholder=" ₹ 2500"
              // pattern="^(NA|\d+)$"
              className="mt-10 bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
              value={formData.rent}
              onChange={(e) => {
                setFormData((formData) => {
                  return { ...formData, rent: e.target.value };
                });
              }}
            />
          </div>

          <div className="flex flex-col">
            <label className="w-fit text-gray-200 font-bold text-lg">
              Security Deposit
            </label>
            <input
              required
              type="text"
              placeholder=" ₹ 5000"
              // pattern="^(NA|\d+)$"
              className="mt-10 bg-black w-[100%] h-14 p-3 rounded-md border-[1.5px] border-[#C8C8C8] placeholder:text-[#C8C8C8]"
              value={formData.security}
              onChange={(e) => {
                setFormData((formData) => {
                  return { ...formData, security: e.target.value };
                });
              }}
            />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="w-fit text-gray-200 font-bold text-lg">
            Photos / Videos
          </h3>

          <div className="border-2 border-dashed rounded-lg mt-16 py-10 flex flex-col justify-center items-center">
            <h3 className="text-gray-200 font-bold text-lg">
              Upload Photos / Videos
            </h3>
            <p className="mt-2 mb-6 text-gray-200 text-sm min-[320px]:max-sm:mx-5">
              Add images and videos that showcase your property's best features.
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

              <label className="border-2 border-gray-200 rounded-md bg-[#E8EDF2] text-[#0D141C] font-bold px-4 py-2">
                Add videos
                <input
                  type="file"
                  hidden
                  multiple={true}
                  onChange={handleVideoSubmit}
                />
              </label>
            </div>
          </div>

          <p className="mt-14 text-[#C8A117]">
            You've uploded {formData.images.length}/10 images and{" "}
            {formData.videos.length}/5 videos
          </p>
        </div>
      </div>
    </>
  );
}
