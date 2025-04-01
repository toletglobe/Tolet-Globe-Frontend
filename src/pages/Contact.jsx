/* eslint-disable react/no-unescaped-entities */

import { BsChatRightDots } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { useState } from "react";
import { API } from "../config/axios";
import { toast } from "react-hot-toast";

const Contact = () => {
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
      await API.post("contact/submit-data", formData);
      handleReset();
      toast.success("Enquiry Sent! We will get back to you shortly.");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:py-24 lg:gap-12 mx-6 md:mx-8 lg:mx-20 justify-between items-center min-h-screen">
      {/* Contact Details Section */}
      <div className="w-full lg:w-1/2 px-6 lg:pl-20 lg:pr-36 mt-12 lg:mt-0 flex flex-col justify-center items-start text-left">
        <h1 className="text-white text-3xl md:text-4xl font-semibold leading-tight font-poppins">
          Contact Us, We're Ready to Help!
        </h1>
        <p className="mt-6 text-gray-400 text-lg">
          We strive to provide you with the best experience and the best platform to find your choice.
        </p>
        <p className="mt-3 text-gray-400 text-lg">
          Post us any queries and we'll get back to you.
        </p>
        <div className="mt-12 space-y-8">
          <div className="flex items-center gap-5">
            <IoCallOutline className="text-white text-4xl border-2 border-white rounded-xl p-2 w-16 h-16" />
            <div>
              <h2 className="text-white text-xl md:text-2xl font-medium">Call us...</h2>
              <p className="text-gray-300/50 text-lg">Mon - Sat, 8 AM to 10 PM</p>
              <p className="text-[#6CC1B6] text-lg">+91 8707727347</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <BsChatRightDots className="text-white text-4xl border-2 border-white rounded-xl p-2 w-16 h-16" />
            <div>
              <h2 className="text-white text-xl md:text-2xl font-medium">Chat with us !!</h2>
              <p className="text-gray-300/50 text-lg">Our friendly team is here to help</p>
              <p className="text-[#6CC1B6] text-lg">hello@toletglobe.in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 px-6 lg:px-20 mt-12 lg:mt-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="topic" className="text-gray-400 text-lg">Subject</label>
            <input
              type="text"
              id="topic"
              placeholder="General Inquiry"
              value={formData.topic}
              name="topic"
              onChange={handleChange}
              required
              className="mt-3 border bg-transparent border-gray-300 rounded-lg w-full py-4 px-5 text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800 text-lg"
            />
          </div>
          {["name", "email", "phone"].map((name, index) => (
            <div key={index}>
              <label htmlFor={name} className="text-gray-400 text-lg">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </label>
              <input
                type={name === "email" ? "email" : "text"}
                id={name}
                placeholder={`Enter your ${name}`}
                value={formData[name]}
                name={name}
                onChange={handleChange}
                required={name !== "phone"}
                className="mt-3 border bg-transparent border-gray-300 rounded-lg w-full py-4 px-5 text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800 text-lg"
              />
            </div>
          ))}
          <div>
            <label htmlFor="msg" className="text-gray-400 text-lg">Message</label>
            <textarea
              id="msg"
              placeholder="Type your message..."
              value={formData.msg}
              name="msg"
              onChange={handleChange}
              required
              className="mt-3 border bg-transparent border-gray-300 rounded-lg w-full py-4 px-5 text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800 text-lg"
            />
          </div>
          <div>
            {loading ? (
              <div className="flex items-center justify-center bg-[#6CC1B6] w-full text-black py-4 px-5 rounded-lg text-lg">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                <span className="ml-3">Sending...</span>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-[#6CC1B6] w-full text-black py-4 px-5 rounded-lg text-lg hover:opacity-90"
              >
                Submit Query
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
