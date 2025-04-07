import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import image from "/image.png";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  // const ScrollToTop = () => {
  //   const { pathname, hash } = useLocation();
  
  //   useEffect(() => {
  //     // If there's a hash (like #section), scroll to that element
  //     if (hash) {
  //       const element = document.getElementById(hash.substring(1));
  //       if (element) {
  //         element.scrollIntoView({ behavior: "smooth" });
  //       }
  //     } else {
  //       // Otherwise, scroll to the top of the page
  //       window.scrollTo({ top: 0, behavior: "smooth" });
  //     }
  //   }, [pathname, hash]);
  
  //   return null;
  // };
  // const ScrollToTop = () => {
  //   const { pathname } = useLocation();
  
  //   useEffect(() => {
  //     const handleLinkClick = (e) => {
  //       const target = e.currentTarget.getAttribute("href");
  
  //       // Only scroll if the target is the current page
  //       if (target === window.location.pathname) {
  //         window.scrollTo({ top: 0, behavior: "smooth" });
  //       }
  //     };
  
  //     // Always scroll on route change
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  
  //     // Attach click event listener to links
  //     const links = document.querySelectorAll("a");
  //     links.forEach(link => link.addEventListener("click", handleLinkClick));
  
  //     // Cleanup event listeners
  //     return () => {
  //       links.forEach(link => link.removeEventListener("click", handleLinkClick));
  //     };
  //   }, [pathname]);
  
  //   return null;
  // };
  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      const handleLinkClick = () => {
        window.scrollTo(0, 0);
      };
  
      // Scroll on route change
      window.scrollTo(0, 0);
     
      // Attach click event listener to links
      const links = document.querySelectorAll("a");
      links.forEach(link => link.addEventListener("click", handleLinkClick));
  
      // Cleanup event listeners
      return () => {
        links.forEach(link => link.removeEventListener("click", handleLinkClick));
      };
    }, [pathname]);
  
    return null;
  };
  
  return (
    <>
    <ScrollToTop />

  
    <div className="bg-black text-white flex flex-col mt- sm:mt- md:mt- lg:mt-[] xl:mt-[]">
    {/* <div className="bg-black text-white flex flex-col mt-52 sm:mt-60 md:mt-72 lg:mt-[63px] xl:mt-[71px]"> */}
      <div className="flex-grow"></div>

      {/* Footer */}
      <div className="lg:mt-auto mt-[50px]">
        <hr className="border-gray-700 w-full h-[2px] mb-[40px] lg:border-t border-t-[2px]" />

        {/* Responsive Grid Layout */}
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-start">
          {/* Logo and Tagline Section */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left w-full lg:w-[250.67px] mb-8 lg:mb-0">
            <img
              src={image}
              alt="To-Let Globe Logo"
              className="w-[83.93px] h-[59.45px] mb-[14.22px] m-auto"
            />
            <p className="text-[14.51px] font-normal m-auto">
              One-stop solution for all your <br /> brokerage-free rental needs
            </p>
            <div className="w-[181.87px] mt-[20.44px] flex flex-row justify-between m-auto">
              <a href="https://www.linkedin.com/company/to-let-globe/posts/?feedView=all" target="_blank">
                <FaLinkedin className="w-[21.33px] h-[21.33px]" />
              </a>
              <a href="https://m.facebook.com/toletglobe/" target="_blank">
                <FaFacebookSquare className="w-[21.33px] h-[21.33px]" />
              </a>
              <Link to="/twitter">
                <FaTwitter className="w-[21.33px] h-[21.33px]" />
              </Link>
              <a href="https://www.instagram.com/toletglobe?igsh=bm1wdHkxbnF0MGhw" target="_blank">
                <RiInstagramFill className="w-[21.33px] h-[21.33px]" />
              </a>
            </div>
          </div>
          <div className="lg:flex lg:flex-row lg:gap-[40px]">
            {/* Quick Links Section */}
            <div className="flex flex-col text-center lg:text-left w-full lg:w-[125.04px] mb-8 lg:mb-0">
              <h1 className="text-[17.49px] font-semibold text-teal-500">QUICK LINKS</h1>
              <ul className="mt-[10px] space-y-[10px]">
                <li><Link to="/" className="hover:text-gray-400 block lg:inline text-[16px]">Home</Link></li>
                <li><Link to="/blog" className="hover:text-gray-400 block lg:inline text-[16px]">Blog</Link></li>
                <li><Link to="/property-listing" className="hover:text-gray-400 block lg:inline text-[16px]">Property</Link></li>
              </ul>
            </div>

            {/* Services Section */}
            <div className="flex flex-col text-center lg:text-left w-full lg:w-[161.85px] mb-8 lg:mb-0">
              <h1 className="text-[17.49px] font-semibold text-teal-500">SERVICES</h1>
              <ul className="mt-[10px] space-y-[10px]">
                <li><Link to="/property-listing?residential=PG" className="hover:text-gray-400 block lg:inline text-[16px]">Paying Guest</Link></li>
                <li><Link to="/property-listing?residential=Flat,House" className="hover:text-gray-400 block lg:inline text-[16px]">Flat and House</Link></li>
                <li><Link to="/property-listing?commercial=Shop,Warehouse" className="hover:text-gray-400 block lg:inline text-[16px]">Shops and Godown</Link></li>
              </ul>
            </div>

            {/* Reach Us Section */}
            <div className="flex flex-col text-center lg:text-left w-full lg:w-[308.41px]">
              <h1 className="text-[17.49px] font-semibold text-teal-500">REACH US</h1>
              <ul className="mt-[10px] space-y-[10px]">
                <li className="flex items-center gap-[10px] justify-center lg:justify-start">
                  <LuPhone className="w-[21.33px] h-[21.33px]" /> +91-8707727347
                </li>
                <li className="flex items-center gap-[10px] justify-center lg:justify-start">
                  <MdOutlineMailOutline className="w-[21.33px] h-[21.33px]" /> hello@toletglobe.in
                </li>
                <li className="flex items-center gap-[10px] justify-center lg:justify-start">
                  <HiOutlineLocationMarker className="w-[24.65px] h-[24.65px] mt-0" /> D1/122 Vipulkhand, Gomtinagar,<br /> Lucknow, Uttar Pradesh
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="font-semibold text-[17px] text-gray-500 bg-[#1c1c1c] w-full h-[68.44px] flex items-center justify-center mt-[31.1px] text-center">
          © 2023 To-Let Globe -- Lucknow. All Rights Reserved.
        </div>
      </div>
    </div>
    </>
  );
};

export default Footer;