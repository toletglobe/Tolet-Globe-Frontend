import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Scroll to the top of the page when activeLink changes
    window.scrollTo(0, 0);
  }, [activeLink]);

  const handleFooterLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className="text-white mx-5 sm:mx-10 md:mx-20">
      <hr className="my-3" />
  
      {/* Grid Layout for Responsiveness */}
      <div className="flex flex-col items-center mb-2 gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-4 gap-10 py-5 px-2 w-full">
          {/* Reach Us Section */}
          <div className="w-full min-h-[200px]">
            <h1 className="text-2xl sm:text-xl font-semibold text-teal-500">REACH US</h1>
            <ul className="mt-5">
              <li className="flex flex-row items-center mb-2 gap-2 sm:break-words">
                <IoIosCall /> +91-8707727347
              </li>
              <li className="flex flex-row items-center mb-2 gap-2 sm:break-words">
                <IoIosMail /> hello@toletglobe.in
              </li>
              <li className="flex flex-row items-center mb-2 gap-2 text-sm sm:break-words">
                <FaLocationDot /> D1/122 Vipulkhand, Gomtinagar Lucknow, Uttar Pradesh
              </li>
            </ul>
          </div>
  
          {/* Quick Links Section */}
          <div className="w-full min-h-[200px]">
            <h1 className="text-2xl sm:text-xl font-semibold whitespace-nowrap text-teal-500 sm:break-words">
              QUICK LINKS
            </h1>
            <ul className="mt-5">
              <li className="mb-2 sm:break-words">
                <Link
                  to="/"
                  className="hover:text-gray-400"
                  onClick={() => handleFooterLinkClick("home")}
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/blog"
                  className="hover:text-gray-400"
                  onClick={() => handleFooterLinkClick("blog")}
                >
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/property"
                  className="hover:text-gray-400"
                  onClick={() => handleFooterLinkClick("property")}
                >
                  Property
                </Link>
              </li>
            </ul>
          </div>
  
          {/* Services Section */}
          <div className="w-full min-h-[200px]">
            <h1 className="text-2xl sm:text-xl font-semibold text-teal-500">SERVICES</h1>
            <ul className="mt-5">
              <li className="mb-2">Paying Guest</li>
              <li className="mb-2">Flat and House</li>
              <li className="mb-2">Office</li>
              <li className="mb-2">Shops and Godown</li>
            </ul>
          </div>
  
          {/* Logo and Tagline Section */}
          <div className="flex flex-col items-center w-full min-h-[200px]">
            <img src={logo} alt="To-Let Globe Logo" className="max-w-[150px]" />
            <p className="text-center mt-3 text-sm sm:text-base break-words">
              One-stop solution for all your <br /> brokerage-free rental needs
            </p>
          </div>
        </div>
  
        {/* Footer Bottom */}
        <div className="text-gray-500 font-bold mt-4 ml-2 text-center lg:text-left">
          © 2023 To-Let Globe -- Lucknow
        </div>
      </div>
    </div>
  );
}  
export default Footer;