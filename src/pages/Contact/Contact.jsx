/* eslint-disable react/no-unescaped-entities */

// import { BsChatRightDots } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { useState } from "react";
import { API } from "../../config/axios";
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
      toast.success("Enquiry Sent! We will be with you shortly.");
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:mt-5 lg:py-20 lg:gap-9 mx-4 md:mx-6 lg:mx-10 justify-between ">
      {/* Contact Details Section */}
      <div className="w-full lg:w-1/2 px-4 sm:p-6 lg:pl-10 lg:pr-52 mt-12 lg:mt-0">
        <div>
          <h1 className="text-white text-3xl md:text-4xl font-semibold">
            Contact Us, We're Ready to Help!
          </h1>
          <p className="mt-5 text-gray-400">
            We strive to provide you with the best experience and the best
            platform to find your choice.
          </p>
          <p className="mt-2 text-gray-400">
            Post us any queries and we'll get back to you.
          </p>
        </div>

        <div className="flex flex-row gap-4 mt-10 md:mt-20 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-14 p-2 border-2 border-white rounded-xl mt-6 mb-8"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8.625 12a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0m0 0H8.25m4.125 0a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0m0 0H12m4.125 0a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0m0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.8 9.8 0 0 1-2.555-.337A5.97 5.97 0 0 1 5.41 20.97a6 6 0 0 1-.474-.065a4.5 4.5 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25"
            ></path>
          </svg>
          <div>
            <h1 className="text-white text-xl md:text-2xl">Chat with us !!</h1>
            <p className="text-gray-300/50 mt-1">
              Our friendly team is here to help
            </p>
            <p className="text-[#6CC1B6]">hello@toletglobe.in</p>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-8 md:mt-10 items-center">
          <IoCallOutline className="text-white text-3xl md:text-4xl h-14 p-2 w-14 border-2 border-white rounded-xl mt-6 mb-8" />
          <div>
            <h1 className="text-white text-xl md:text-2xl">Call us...</h1>
            <p className="text-gray-300/50 mt-1">Mon - Sat, 8 AM to 10 PM</p>
            <p className="text-[#6CC1B6]">+91 8707727347</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col gap-3 w-full lg:w-1/2 px-4 sm:px-6 lg:px-14 mt-10 lg:mt-0">
        <form onSubmit={handleSubmit}>

          {/* Subject div */}
          <div className="flex flex-col">
            <label htmlFor="topic" className="text-gray-400">
              Subject
            </label>
            <input
              type="text"
              id="topic"
              placeholder="General Inquiry"
              value={formData.topic}
              name="topic"
              onChange={handleChange}
              required
              className="mt-1 border bg-transparent border-gray-300 rounded w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800 placeholder:pl-2.5"
            />
          </div>

          {/* Name, Email, Phone Div */}
          {["name", "email", "phone"].map((field, index) => (
            <div key={index} className="mt-5 flex flex-col">
              <label htmlFor={field} className="text-gray-400">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                id={field}
                placeholder={
                  field === "name"
                    ? "Enter your name"
                    : field === "email"
                    ? "Enter your email"
                    : "Enter your number"
                }
                value={formData[field]}
                name={field}
                onChange={handleChange}
                className="mt-1 border bg-transparent border-gray-300 rounded w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800 placeholder:pl-2.5"
                required={field !== "phone"}
              />
            </div>
          ))}
          <div className="mt-5 flex flex-col">
            <label htmlFor="msg" className="text-gray-400">
              Message
            </label>
            <textarea
              id="msg"
              placeholder="Type your message..."
              value={formData.msg}
              name="msg"
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 border bg-transparent border-gray-300 rounded w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800 placeholder:pl-2.5"
            />
          </div>
          <div className="mt-6">
            {loading ? (
              <div className="flex items-center justify-center space-x-2 bg-[#6CC1B6] w-full text-black py-3 px-4 rounded">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                <span className="text-black">Sending...</span>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-[#6CC1B6] hover:bg-[#6dc9bd] w-full text-black font-semibold mt-3 py-3 px-4 rounded"
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