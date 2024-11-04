import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom"; // Import the Link component
import logo from "../../assets/logo.png";

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
    <div className="text-white mx-20 sm:mx-2">

      <hr className="my-3"/>

      <div className="flex flex-col py-2 px-2 sm:align-center md:flex-row md:flex-wrap lg:flex-wrap xl:flex-nowrap">
        <div className="sm:flex flex-col items-center md:w-1/2 p-4">
          <h1 className="text-2xl font-semibold text-teal-500">REACH US</h1>
          <ul className="mt-5">
            <li className="flex flex-row items-center mb-2 gap-2 sm:justify-center">
              <IoIosCall /> +91-8707727347
            </li>
            <li className="flex flex-row items-center mb-2 gap-2 sm:justify-center">
              <IoIosMail /> hello@toletglobe.in
            </li>
            <li className="flex items-center mb-2 text-sm sm:justify-center gap-2">
              <FaLocationDot />
              <p className="text-center"> D1/122 Vipulkhand,Gomtinagar<p> Lucknow,Uttar
              Pradesh</p></p>
            </li>
          </ul>
        </div>
        <div className="sm:flex flex-col items-center text-center md:w-1/2 p-4">
          <h1 className="text-2xl font-semibold whitespace-nowrap text-teal-500">QUICK LINKS</h1>
          <ul className="mt-5 gap-3">
            <li className="mb-2">
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
        <div className="sm:flex flex-col items-center text-center md:w-1/2 p-4">
          <h1 className="text-2xl font-semibold text-teal-500">SERVICES</h1>
          <ul className="mt-5 gap-3">
            <li>Paying Guest</li>
            <li>Flat and House</li>
            <li>Office</li>
            <li>Shops and Godown</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center sm:py-2 md:w-1/2 p-4">
          <div>
            <img src={logo} alt="" />
          </div>
        <p className="text-center justify-stretch mt-3">
          One-stop solution for all your <br/> brokerage-free rental needs
        </p>
        </div>
      </div>
      <div className="text-gray-500 font-bold m-4 text-center">
        © 2023 To-Let Globe -- Lucknow
      </div>
    </div>
  );
};

export default Footer;