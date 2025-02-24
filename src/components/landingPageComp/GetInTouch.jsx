import { useState } from "react";
import { toast } from "react-hot-toast";
import location from "../../assets/Map1.jpg";

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
    <div className="relative w-full h-screen flex max-sm:flex-col items-center sm:justify-end">
      {/* Contact Form */}
      <div className="p-10 z-20 lg:w-[380px] w-full text-white">
        <p className="text-[#bc5f56] font-semibold text-4xl pb-5">
          GET IN TOUCH
        </p>
        <p className="text-gray-300 pb-4">
          Have some questions? Feel free to ask them anytime.
        </p>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            name="name"
            className="bg-transparent border-b-2 border-gray-400 text-white focus:outline-none my-6"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            name="email"
            className="bg-transparent border-b-2 border-gray-400 text-white focus:outline-none my-6"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            name="phone"
            className="bg-transparent border-b-2 border-gray-400 text-white focus:outline-none my-6"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Message"
            value={formData.msg}
            name="msg"
            className="bg-transparent border-b-2 border-gray-400 text-white focus:outline-none my-6"
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
              className=" cursor-pointer self-start font-semibold"
            />
          )}
        </form>
      </div>
      {/* Make the map image clickable */}
      <div className="max-sm:w-[90%]">
        <a href={googlemaps} target="_blank" rel="noopener noreferrer">
          <img
            src={location}
            alt="Background"
            className="sm:absolute top-0 left-0 w-full"
          />
          {/* Add gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-black/95 to-transparent"></div>
        </a>
      </div>

      <div
        className="absolute bottom-32 left-10 p-4 text-white hidden lg:block"
        style={{ fontSize: "80px" }}
      >
        CONTACT US
      </div>
    </div>
  );
};

export default GetInTouch;
