/* eslint-disable react/no-unescaped-entities */

import { BsChatRightDots } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";

const Contact = () => {
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
              <p className="text-[#6CC1B6] ">to_let@gmail.com</p>
            </div>
         </div>
          <div className="flex flex-row gap-5 mt-10">
            <IoCallOutline className="text-white text-4xl" />
            <div>
              <h1 className="text-white text-2xl">Call us...</h1>
              <p className="text-gray-300/50 mt-1">
              Mon - fri 8 am to 10 pm
              </p>
              <p className="text-[#6CC1B6] ">+91 9876543210</p>
            </div>
          </div>
        </div>

      <div className="flex flex-col gap-3 w-full md:w-1/2 px-5 mt-5 md:mt-0">
        <form action="">
          <div className="flex flex-col">
            <label htmlFor="topix" className="text-gray-400">
              Topic
            </label>
            <select className="mt-2 appearance-none border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800">
              <option value="">Select a topic</option>
              <option value="RH">Rental House</option>
              <option value="RF">Rental Flat</option>
              <option value="PG">PGs</option>
              <option value="GD">Godowns</option>
            </select>
          </div>
          <div className="mt-5 flex flex-col">
            <label htmlFor="topix" className="text-gray-400">
              Name
            </label>
            <input
              type="text"
              id="topic"
              placeholder="johndoe"
              className=" mt-2 appearance-none border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>
          <div className="mt-5 flex flex-col">
            <label htmlFor="topix" className="text-gray-400">
              Email
            </label>
            <input
              type="mail"
              id="Email"
              placeholder="name@provider.com"
              className=" mt-2 appearance-none border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>
          <div className="mt-5 flex flex-col">
            <label htmlFor="topix" className="text-gray-400">
              Phone No.
            </label>
            <input
              type="phone"
              id="phone"
              placeholder="+995 598 63 79 48"
              className=" mt-2 appearance-none border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>
          <div className="mt-5 flex flex-col">
            <label className="text-gray-400">Message</label>
            <textarea
              type="text"
              id="msg"
              placeholder="Type your message..."
              className=" row-span-6 mt-2 appearance-none border bg-transparent border-gray-300 rounded-lg w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-green-800"
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
