import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";


const Footer = () => {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeLink]);

  const handleFooterLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="text-white px-6 sm:px-10 md:px-20 py-6">
      <hr className="my-3" />

      <div className="flex flex-col md:flex-row justify-around gap-8 md:gap-20 py-2">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-teal-500">REACH US</h1>
          <ul className="mt-5">
            <li className="flex items-center mb-2 gap-2">
              <IoIosCall /> +91-8707727347
            </li>
            <li className="flex items-center mb-2 gap-2">
              <IoIosMail /> hello@toletglobe.in
            </li>
            <li className="flex items-center mb-2 gap-2 text-sm">
              <FaLocationDot /> D1/122 Vipulkhand, Gomtinagar Lucknow, Uttar Pradesh
            </li>
          </ul>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-teal-500">QUICK LINKS</h1>
          <ul className="mt-5 space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-gray-400"
                onClick={() => handleFooterLinkClick("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="hover:text-gray-400"
                onClick={() => handleFooterLinkClick("blog")}
              >
                Blog
              </Link>
            </li>
            <li>
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

        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-teal-500">SERVICES</h1>
          <ul className="mt-5 space-y-2">
            <li>Paying Guest</li>
            <li>Flat and House</li>
            <li>Office</li>
            <li>Shops and Godown</li>
          </ul>
        </div>

        <div className="flex flex-col items-center flex-1">
          <img src={logo} alt="Logo" className="w-20 md:w-32" />
          <p className="text-center mt-3">
            One-stop solution for all your <br /> brokerage-free rental needs
          </p>
        </div>
      </div>

      <div className="text-gray-500 font-bold mt-4 text-center md:text-left">
        © 2023 To-Let Globe -- Lucknow
      </div>
    </div>
  );
};

export default Footer;
