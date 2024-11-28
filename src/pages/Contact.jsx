/* eslint-disable react/no-unescaped-entities */

import { BsChatRightDots } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { API } from "../config/axios"
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
      const response = await API.post("contact/submit-data", formData);
      handleReset();
      toast.success("Enquiry Sent! We will get in touch with you shortly.");
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:mt-5 lg:py-5 lg:gap-9 sm:px-10 md:px-20 mx-4 md:mx-6 lg:mx-10 justify-between ">
      {/* Contact Details Section */}
      <div className="w-full lg:w-1/2 px-4 lg:px-5 mt-[50px]">
        <div>
          <h1 className="text-white text-3xl md:text-4xl font-semibold">
            Contact Us, We're Ready to Help!
          </h1>
          <p className="mt-5 text-gray-400">
            We strive to provide you with the best experience and the best platform to find your choice.
          </p>
          <p className="mt-2 text-gray-400">
            Post us any queries and we’ll get back to you.
          </p>
        </div>

        <div className="flex flex-row gap-4 mt-10 md:mt-20">
          <BsChatRightDots className="text-white text-3xl md:text-4xl" />
          <div>
            <h1 className="text-white text-xl md:text-2xl">Chat with us !!</h1>
            <p className="text-gray-300/50 mt-1">Our friendly team is here to help</p>
            <p className="text-[#6CC1B6]">hello@toletglobe.in</p>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-8 md:mt-10">
          <IoCallOutline className="text-white text-3xl md:text-4xl" />
          <div>
            <h1 className="text-white text-xl md:text-2xl">Call us...</h1>
            <p className="text-gray-300/50 mt-1">Mon - Sat, 8 AM to 10 PM</p>
            <p className="text-[#6CC1B6]">+91 8707727347</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col gap-3 w-full lg:w-1/2 px-4 lg:px-5 mt-10 lg:mt-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="topic" className="text-gray-400">Topic</label>
            <select
              id="topic"
              value={formData.topic}
              name="topic"
              onChange={handleChange}
              required
              className="mt-2 border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800"
            >
              <option value="">Select a topic</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Others">Others</option>
            </select>
          </div>
          {['name', 'email', 'phone'].map((field, index) => (
            <div key={index} className="mt-5 flex flex-col">
              <label htmlFor={field} className="text-gray-400">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                placeholder={
                  field === 'name' ? "Rohit Kapur" : field === 'email' ? "name@provider.com" : "+91 8945678323"
                }
                value={formData[field]}
                name={field}
                onChange={handleChange}
                className="mt-2 border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800"
                required={field !== 'phone'}
              />
            </div>
          ))}
          <div className="mt-5 flex flex-col">
            <label htmlFor="msg" className="text-gray-400">Message</label>
            <textarea
              id="msg"
              placeholder="Type your message..."
              value={formData.msg}
              name="msg"
              onChange={handleChange}
              required
              className="mt-2 border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>
          <div className="mt-6">
            {loading ? (
              <div className="flex items-center justify-center space-x-2 bg-[#6CC1B6] w-full text-black py-3 px-4 rounded-lg">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                <span className="text-black">Sending...</span>
              </div>
            ) : (
              <button type="submit" className="bg-[#6CC1B6] w-full text-black py-3 px-4 rounded-lg">
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
