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
    setImages(e.target.files);
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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-20">
      <div>
        <label>Owner Name:</label>
        <input type="text" {...register("ownerName", { required: true })} />
        {errors.ownerName && <p>Owner Name is required</p>}
      </div>

      <div>
        <label>Owner{"'"}s Contact Number:</label>
        <input
          type="text"
          {...register("ownersContactNumber", { required: true })}
        />
        {errors.ownersContactNumber && (
          <p>Owner{"'"}s Contact Number is required</p>
        )}
      </div>

      <div>
        <label>Owner{"'"}s Alternate Contact Number:</label>
        <input type="text" {...register("ownersAlternateContactNumber")} />
      </div>

      <div>
        <label>Locality:</label>
        <input type="text" {...register("locality", { required: true })} />
        {errors.locality && <p>Locality is required</p>}
      </div>

      <div>
        <label>Address:</label>
        <input type="text" {...register("address", { required: true })} />
        {errors.address && <p>Address is required</p>}
      </div>

      <div>
        <label>Space Type:</label>
        <select {...register("spaceType", { required: true })}>
          <option value="">Select Space Type</option>
          <option value="Commercial">Commercial</option>
          <option value="Residential">Residential</option>
        </select>
        {errors.spaceType && <p>Space Type is required</p>}
      </div>

      <div>
        <label>Property Type:</label>
        <select {...register("propertyType", { required: true })}>
          <option value="">Select Property Type</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
          <option value="PG">PG</option>
          <option value="Office">Office</option>
          <option value="Shop">Shop</option>
        </select>
        {errors.propertyType && <p>Property Type is required</p>}
      </div>

      <div>
        <label>Current Residence of Owner:</label>
        <select {...register("currentResidenceOfOwner")}>
          <option value="">Select Residence</option>
          <option value="Same City">Same City</option>
          <option value="Same Place">Same Place</option>
          <option value="Different City">Different City</option>
        </select>
      </div>

      <div>
        <label>Rent:</label>
        <input type="number" {...register("rent", { required: true })} />
        {errors.rent && <p>Rent is required</p>}
      </div>

      <div>
        <label>Concession:</label>
        <input type="checkbox" {...register("concession")} />
      </div>

      <div>
        <label>Pets Allowed:</label>
        <input type="checkbox" {...register("petsAllowed")} />
      </div>

      <div>
        <label>Preference:</label>
        <select {...register("preference", { required: true })}>
          <option value="">Select Preference</option>
          <option value="Bachelors">Bachelors</option>
          <option value="Family">Family</option>
          <option value="Any">Any</option>
        </select>
        {errors.preference && <p>Preference is required</p>}
      </div>

      <div>
        <label>Bachelors:</label>
        <select {...register("bachelors", { required: true })}>
          <option value="">Select Bachelors</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
        {errors.bachelors && <p>Bachelors is required</p>}
      </div>

      <div>
        <label>Type:</label>
        <select {...register("type", { required: true })}>
          <option value="">Select Type</option>
          <option value="Non-Furnished">Non-Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Fully-Furnished">Fully-Furnished</option>
        </select>
        {errors.type && <p>Type is required</p>}
      </div>

      <div>
        <label>BHK:</label>
        <input type="number" {...register("bhk", { required: true })} />
        {errors.bhk && <p>BHK is required</p>}
      </div>

      <div>
        <label>Floor:</label>
        <input type="number" {...register("floor", { required: true })} />
        {errors.floor && <p>Floor is required</p>}
      </div>

      <div>
        <label>Nearest Landmark:</label>
        <input type="text" {...register("nearestLandmark")} />
      </div>

      <div>
        <label>Type of Washroom:</label>
        <select {...register("typeOfWashroom", { required: true })}>
          <option value="">Select Type of Washroom</option>
          <option value="Western">Western</option>
          <option value="Indian">Indian</option>
          <option value="Both">Both</option>
        </select>
        {errors.typeOfWashroom && <p>Type of Washroom is required</p>}
      </div>

      <div>
        <label>Cooling Facility:</label>
        <select {...register("coolingFacility", { required: true })}>
          <option value="">Select Cooling Facility</option>
          <option value="AC">AC</option>
          <option value="Fan">Fan</option>
          <option value="Cooler">Cooler</option>
        </select>
        {errors.coolingFacility && <p>Cooling Facility is required</p>}
      </div>

      <div>
        <label>Car Parking:</label>
        <input
          type="checkbox"
          {...register("carParking", { required: true })}
        />
        {errors.carParking && <p>Car Parking is required</p>}
      </div>

      <div>
        <label>Subscription Amount:</label>
        <input type="number" {...register("subscriptionAmount")} />
      </div>

      <div>
        <label>Comment by Analyst:</label>
        <input type="text" {...register("commentByAnalyst")} />
      </div>

      <div>
        <label>Photos (max 5):</label>
        <input type="file" multiple accept="image/*" onChange={onFileChange} />
      </div>

      <div>
        <label>Location Link:</label>
        <input type="text" {...register("locationLink", { required: true })} />
        {errors.locationLink && <p>Location Link is required</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProperty;
