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
    className="relative bg-black bg-opacity-80 px-6 py-12 lg:px-20 lg:py-16 min-h-[calc(100vh-80px)]"
    style={{
      backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.6) 100%), 
      linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.6) 100%), 
      url(${location})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-8">
      {/* Map Section */}
      <a href={googlemaps} target="_blank" rel="noopener noreferrer" className="lg:w-1/2 w-full">
        <div className="text-white font-semibold text-4xl lg:text-5xl leading-tight">
          CONTACT US
        </div>
      </a>
   <div className="flex">
      {/* Contact Form */}
      <div className="sm:w-[300px] w-full bg-opacity-90 p-8 rounded-lg shadow-lg sm:ml-80">
        <p className="text-yellow-300 text-3xl font-bold mb-4">GET IN TOUCH</p>
        <p className="text-gray-400 mb-2">Have some questions?</p>
        <p className="text-gray-400 mb-6">Feel free to ask them anytime.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            className="w-full bg-black border-b border-gray-500 text-gray-300 py-2 focus:outline-none focus:border-yellow-300"
          >
            <option value="">Select a Topic</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Others">Others</option>
          </select>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-black border-b border-gray-500 text-gray-300 py-2 focus:outline-none focus:border-yellow-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-black border-b border-gray-500 text-gray-300 py-2 focus:outline-none focus:border-yellow-300"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-black border-b border-gray-500 text-gray-300 py-2 focus:outline-none focus:border-yellow-300"
          />
          <textarea
            name="msg"
            placeholder="Message"
            value={formData.msg}
            onChange={handleChange}
            required
            className="w-full bg-black border-b border-gray-500 text-gray-300 py-2 focus:outline-none focus:border-yellow-300"
          />
          <button
            type="submit"
            className="w-full text-yellow-300 py-2 rounded font-bold transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message →"}
          </button>
        </form>
      </div>
     </div>
    </div>
  </div>
)};
export default GetInTouch;