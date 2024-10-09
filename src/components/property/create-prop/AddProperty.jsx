import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddProperty = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [images, setImages] = useState([]);
  

  const onFileChange = (e) => {
    if (e.target.files.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }
    setImages([...e.target.files]);
    setValue("images", e.target.files); // Set file input value for react-hook-form
  };

  const onSubmit = async (data) => {

     
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key]) formData.append(key, data[key]);
      });

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      // change backend url to Base url when pushing to main branch e.g ${BASE_URL}property/add-property
      const response = await axios.post(
        "http://localhost:8000/api/v1/property/add-property",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);

      alert("Property added successfully!");
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <h2 className="text-3xl font-bold col-span-full mb-6 text-center">
        Add Property
      </h2>
     

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Owner Name:
        </label>
        <input
          type="text"
          {...register("ownerName", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.ownerName && (
          <p className="text-red-500 text-sm mt-1">Owner Name is required</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Owner{"'"}s Contact Number:
        </label>
        <input
          type="text"
          {...register("ownersContactNumber", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.ownersContactNumber && (
          <p className="text-red-500 text-sm mt-1">
            Owner{"'"}s Contact Number is required
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Owner{"'"}s Alternate Contact Number:
        </label>
        <input
          type="text"
          {...register("ownersAlternateContactNumber")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Locality:
        </label>
        <input
          type="text"
          {...register("locality", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.locality && (
          <p className="text-red-500 text-sm mt-1">Locality is required</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Address:
        </label>
        <input
          type="text"
          {...register("address", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">Address is required</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Space Type:
        </label>
        <select
          {...register("spaceType", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Space Type</option>
          <option value="Commercial">Commercial</option>
          <option value="Residential">Residential</option>
        </select>
        {errors.spaceType && (
          <p className="text-red-500 text-sm mt-1">Space Type is required</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Property Type:
        </label>
        <select
          {...register("propertyType", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Property Type</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
          <option value="PG">PG</option>
          <option value="Office">Office</option>
          <option value="Shop">Shop</option>
        </select>
        {errors.propertyType && (
          <p className="text-red-500 text-sm mt-1">Property Type is required</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Current Residence of Owner:
        </label>
        <select
          {...register("currentResidenceOfOwner")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Residence</option>
          <option value="Same City">Same City</option>
          <option value="Same Place">Same Place</option>
          <option value="Different City">Different City</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Rent:</label>
        <input
          type="number"
          {...register("rent", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.rent && (
          <p className="text-red-500 text-sm mt-1">Rent is required</p>
        )}
      </div>

      <div className="mb-4 flex items-center col-span-full">
        <input type="checkbox" {...register("concession")} className="mr-2" />
        <label className="text-gray-700 font-semibold">Concession</label>
      </div>

      <div className="mb-4 flex items-center col-span-full">
        <input type="checkbox" {...register("petsAllowed")} className="mr-2" />
        <label className="text-gray-700 font-semibold">Pets Allowed</label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Preference:
        </label>
        <select
          {...register("preference", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Preference</option>
          <option value="Bachelors">Bachelors</option>
          <option value="Family">Family</option>
          <option value="Any">Any</option>
        </select>
        {errors.preference && (
          <p className="text-red-500 text-sm mt-1">Preference is required</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Bachelors:
        </label>
        <select
          {...register("bachelors", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Bachelors</option>
          <option value="Allowed">Allowed</option>
          <option value="Not Allowed">Not Allowed</option>
        </select>
        {errors.bachelors && (
          <p className="text-red-500 text-sm mt-1">Bachelors is required</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Type:</label>
        <select
          {...register("type", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Type</option>
          <option value="Non-Furnished">Non-Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Fully-Furnished">Fully-Furnished</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">Type is required</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">BHK:</label>
        <input
          type="number"
          {...register("bhk", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.bhk && (
          <p className="text-red-500 text-sm mt-1">BHK is required</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Floor:</label>
        <input
          type="number"
          {...register("floor", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.floor && (
          <p className="text-red-500 text-sm mt-1">Floor is required</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Nearest Landmark:
        </label>
        <input
          type="text"
          {...register("nearestLandmark")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Type of Washroom:
        </label>
        <select
          {...register("typeOfWashroom", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Type of Washroom</option>
          <option value="Western">Western</option>
          <option value="Indian">Indian</option>
          <option value="Both">Both</option>
        </select>
        {errors.typeOfWashroom && (
          <p className="text-red-500 text-sm mt-1">
            Type of Washroom is required
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Cooling Facility:
        </label>
        <select
          {...register("coolingFacility", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Cooling Facility</option>
          <option value="AC">AC</option>
          <option value="Fan">Fan</option>
          <option value="Cooler">Cooler</option>
        </select>
        {errors.coolingFacility && (
          <p className="text-red-500 text-sm mt-1">
            Cooling Facility is required
          </p>
        )}
      </div>

      <div className="mb-4 flex items-center col-span-full">
        <input
          type="checkbox"
          {...register("carParking", { required: true })}
          className="mr-2"
        />
        <label className="text-gray-700 font-semibold">Car Parking</label>
        {errors.carParking && (
          <p className="text-red-500 text-sm ml-2">Car Parking is required</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Subscription Amount:
        </label>
        <input
          type="number"
          {...register("subscriptionAmount")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Comment by Analyst:
        </label>
        <input
          type="text"
          {...register("commentByAnalyst")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 col-span-full">
        <label className="block text-gray-700 font-semibold mb-1">
          Photos (max 5):
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onFileChange}
          className="w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {images.length > 0 &&
            images.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-full h-32 object-cover rounded-md"
              />
            ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Location Link:
        </label>
        <input
          type="text"
          {...register("locationLink", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.locationLink && (
          <p className="text-red-500 text-sm mt-1">Location Link is required</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default AddProperty;