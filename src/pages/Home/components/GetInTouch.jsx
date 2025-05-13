import { useState } from "react";
import { toast } from "react-hot-toast";

import location from "../../../assets/home/getInTouch/Map1.jpg";

import { API } from "../../../config/axios";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
    topic: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (evt) => {
    setFormData((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      msg: "",
      topic: "",
    });
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      setLoading(true);
      const dataForEnquiry = formData;
      const response = await API.post("contact/submit-data", dataForEnquiry);
      handleReset();
      toast.success("Enquiry Sent! We will get in touch with you shortly.");
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      handleReset();
      toast.error("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  const googlemaps =
    "https://www.google.com/maps/place/To-Let+Globe/@26.8465566,80.9797793,15z/data=!4m6!3m5!1s0x399bfd77577ba78f:0xd2d6f22d1b246815!8m2!3d26.8465566!4d80.9797793!16s%2Fg%2F11vhrqqb45?entry=ttu";

  return (
    <div className="pt-20 relative w-full h-s flex max-sm:flex-col items- sm:justify-end">
      {/* Contact Form */}
      <div className="pt-10 pl-10 pr-10 pb-8 z-20 lg:w-[380px] w-full text-white flex flex-col justify-end">
        <p className="max-lg:text-[#C69F22] max-lg:text-center max-lg:text-2xl max-lg:font-medium lg:text-[#bc5f56] font-semibold text-4xl pb-4">
          GET IN TOUCH
        </p>
        <div className="max-lg:text-center">
          <p className="text-gray-300 pb-2">Have some questions?</p>
          <p className="text-gray-300 pb-4">Feel free to ask them anytime.</p>
        </div>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            name="name"
            className="bg-transparent border-b-2 border-white placeholder:text-white placeholder:font-thin text-white focus:outline-none my-6"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            name="email"
            className="bg-transparent border-b-2 border-white placeholder:text-white placeholder:font-thin text-white focus:outline-none my-6"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            name="phone"
            className="bg-transparent border-b-2 border-white placeholder:text-white placeholder:font-thin text-white focus:outline-none my-6"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Message"
            value={formData.msg}
            name="msg"
            className="bg-transparent border-b-2 border-white placeholder:text-white placeholder:font-thin text-white focus:outline-none my-6"
            onChange={handleChange}
            required
          />
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span className="text-yellow-300">Sending...</span>
            </div>
          ) : (
            <input
              type="submit"
              value="Send Message →"
              className="cursor-pointer self-start font-semibold max-lg:font-normal max-lg:text-[#C69F22]"
            />
          )}
        </form>
      </div>

      {/* Make the map image clickable */}
      <div className="max-sm:w-[100%] overflow-hidden">
        <a href={googlemaps} target="_blank" rel="noopener noreferrer">
          <img
            src={location}
            alt="Background"
            className="sm:absolute top-0 left-0 w-7/10 h-full w-full object-cover"
          />
          {/* Add gradient overlay */}
          {/* Here the gradient is only visible after sm(640px) */}
          <div className="sm:absolute sm:top-0 sm:left-0 sm:w-full sm:h-full sm:bg-gradient-to-l sm:from-black/95 sm:to-transparent"></div>
        </a>
      </div>

      <div
        className="absolute font-semibold bottom-0 left-0 p-4 text-white hidden lg:block"
        style={{ fontSize: "60px" }}
      >
        CONTACT US
      </div>
    </div>
  );
};

export default GetInTouch;
