/* eslint-disable react/no-unescaped-entities */

import { BsChatRightDots } from "react-icons/bs";
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
    evt.preventDefault(); // Prevent the default form submissio

    const dataForEnquiry = formData;
    handleReset();
    toast.success("Enquiry Sent! We will get in touch with you.");
    const response2 = await API.post("contact/submit-data", dataForEnquiry);
    console.log(response2);
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-9 p-5 mx-6 my-10 justify-between mt-20">
      <div className="w-full md:w-1/2 px-5 mt-[50px]">
        <div>
          <h1 className="text-white text-4xl font-semibold">
            Contact Us, We're Ready to Help!
          </h1>
          <p className=" mt-5 text-gray-400 ">
            We strive to provide you with the best <br />
            experience and the best platform to find your <br />
            choice.
          </p>
          <p className="mt-2 text-gray-400">
            Post us any queries and we’ll get back to you.
          </p>
        </div>

        <div className="flex flex-row gap-5 mt-20">
          <BsChatRightDots className="text-white text-4xl" />
          <div>
            <h1 className="text-white text-2xl">Chat with us !!</h1>
            <p className="text-gray-300/50 mt-1">
              Our friendly team is here to help
            </p>
            <p className="text-[#6CC1B6] ">hello@toletglobe.in</p>
          </div>
        </div>
        <div className="flex flex-row gap-5 mt-10">
          <IoCallOutline className="text-white text-4xl" />
          <div>
            <h1 className="text-white text-2xl">Call us...</h1>
            <p className="text-gray-300/50 mt-1">Mon - Sat, 8 AM to 10 PM</p>
            <p className="text-[#6CC1B6] ">+91 8707727347</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full md:w-1/2 px-5 mt-5 md:mt-0">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="topic" className="text-gray-400">
              Topic
            </label>
            <select
              className="mt-2 appearance-none border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800"
              id="topic"
              value={formData.topic}
              name="topic"
              onChange={handleChange}
            >
              <option value="">Select a topic</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="mt-5 flex flex-col">
            <label htmlFor="name" className="text-gray-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Rohit Kapur"
              value={formData.name}
              name="name"
              className=" mt-2 appearance-none border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5 flex flex-col">
            <label htmlFor="email" className="text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@provider.com"
              value={formData.email}
              name="email"
              className=" mt-2 appearance-none border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5 flex flex-col">
            <label htmlFor="phone" className="text-gray-400">
              Phone No.
            </label>
            <input
              type="text"
              id="phone"
              placeholder="+91 8945678323"
              value={formData.phone}
              name="phone"
              className="mt-2 appearance-none border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5 flex flex-col">
            <label htmlFor="msg" className="text-gray-400">
              Message
            </label>
            <textarea
              type="text"
              id="msg"
              placeholder="Type your message..."
              value={formData.msg}
              name="msg"
              className=" row-span-6 mt-2 appearance-none border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800"
              onChange={handleChange}
            />
          </div>
          <button className="mt-6 bg-[#6CC1B6] w-full text-black py-3 px-4 rounded-lg">
            Submit Query
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
