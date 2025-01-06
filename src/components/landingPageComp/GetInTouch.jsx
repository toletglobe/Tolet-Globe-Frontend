import "animate.css";
import location from "../../assets/map.png";
import { useRef, useState } from "react";
import { API } from "../../config/axios";
import { toast } from "react-hot-toast";

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
      evt.preventDefault(); // Prevent the default form submission
      setLoading(true);
      const dataForEnquiry = formData;
      const response2 = await API.post("contact/submit-data", dataForEnquiry);
      handleReset();
      toast.success("Enquiry Sent! We will get in touch with you shortly.");
      setLoading(false);
      console.log(response2);
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
    <div
      className="my-10 mx-20 lg:h-[85vh] flex lg:justify-end "
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.6) 100%), 
      linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.6) 100%), 
      url(${location})`,
        backgroundSize: "cover",
      }}
    >
      <a href={googlemaps}>
        <div className="text-start  h-[100%] lg:w-[860px] flex items-end ">
          {/* <div className="text-white font-semibold lg:text-5xl text-left pb-5 mb-10 -ml-20 text-shadow-lg -stroke-2 -stroke-white lg:block hidden translate-y-[-50px] ">
            CONTACT US
          </div> */}
        </div>
      </a>
      <div className=" text-start -mt-2 bg-black opacity-100 p-10  lg:h-[100%] lg:w-[380px] w-full rounded-md bg-gradient-to-r from-black via-black to-transparent shadow-[0_0_10px_rgba(0,0,0,0.2)] ">
        <p className="text-yellow-300 font-normal text-4xl text-left pb-5">
          GET IN TOUCH
        </p>
        <p className="text-gray-500 m-0 text-left pb-4">Have some questions?</p>
        <p className="text-gray-500 text-left m-0 pb-4">
          Feel free to ask them anytime
        </p>

        <form
          className="w-full flex flex-col justify-between text-white "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <select
              className=" bg-black border-b-2 border-gray-400 text-gray-400 focus:outline-none my-6 "
              id="topic"
              value={formData.topic}
              name="topic"
              onChange={handleChange}
              required
            >
              <option className=" text-black" value="">
                Topic
              </option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            name="name"
            className=" bg-black border-b-2 border-gray-400 text-white focus:outline-none my-6"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            name="email"
            className="bg-black border-b-2 border-gray-400 text-white focus:outline-none my-6"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            name="phone"
            className="bg-black border-b-2 border-gray-400 text-white focus:outline-none my-6"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Message"
            value={formData.msg}
            name="msg"
            className="bg-black border-b-2 border-gray-400 text-white focus:outline-none my-6"
            onChange={handleChange}
            required
          />
          {loading ? (
            <div className="flex items-center space-x-2 bg-black bg-opacity-70">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span className="text-yellow-300">Sending...</span>
            </div>
          ) : (
            <input
              type="submit"
              value="Send Message →"
              className="text-yellow-300 ml-0 cursor-pointer self-start font-semibold"
            />
          )}
        </form>
      </div>
    </div>
  );
};


export default GetInTouch;
