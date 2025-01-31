import { useState } from "react";
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

  return (
    <div className="relative w-full h-screen flex items-center justify-end">
      {/* Full-screen map background */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.328314905671!2d80.97977931504363!3d26.846556583153824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd77577ba78f%3A0xd2d6f22d1b246815!2sTo-Let%20Globe!5e0!3m2!1sen!2sin!4v1647425388883!5m2!1sen!2sin"
        className="absolute top-0 left-0 w-full h-full insect-shadow-3xl bg-black"
        style={{ border: 0, filter: "invert(100%) hue-rotate(180deg)", boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.5)", }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Contact Form */}
      <div className="relative z-10 p-10 lg:w-[380px] w-full text-white bg-black bg-opacity-90 shadow-2xl">
        <p className="text-yellow-300 font-semibold text-4xl pb-5">GET IN TOUCH</p>
        <p className="text-gray-300 pb-4">Have some questions? Feel free to ask them anytime.</p>

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
              className="text-yellow-300 cursor-pointer self-start font-semibold"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default GetInTouch;
