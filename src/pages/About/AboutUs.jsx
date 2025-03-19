import React, { useEffect } from "react";
import { About_Card, Flip, Faq } from "../../components/index";
import "./about.css";
import "../../index.css";
import image from "../../assets/about/download.png";
import CEO1 from "../../assets/about/first.png";
import CEO2 from "../../assets/about/CEO2.jpg";
import CEO3 from "../../assets/about/CEO3.png";

export default function About() {
   useEffect(() => {
      // Function to handle the scroll event
      const handleScroll = () => {
         // Get the vertical line element
         const verticalLine = document.querySelector(".timeline");
         const scrollPosition = window.scrollY / 0.9;

         if (verticalLine) {
            // Update the height of the ::after pseudo-element using a CSS custom property
            verticalLine.style.setProperty(
               "--scroll-position",
               `${scrollPosition}px`
            );
         }
      };

      // Attach the scroll event listener
      window.addEventListener("scroll", handleScroll);

      // Clean up the event listener on component unmount
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return (
      <>
         <div className="mt-24 mb-12 ">
            <div className="text-center mb-2">
               <h1 className="lg:border-[7.79px] lg:text-41.55px rounded-[12.82px] border-[1.28px] w-[103.84px] h-[44.87px] top-[-6.2px] left-[131px] md:w-[90px] md:h-[40px] md:left-[100px] sm:w-[80px] sm:h-[35px] sm:left-[80px] border-[#6cc0c4] lg:rounded-[64.92px] lg:text-[#E8B636] inline text-xl sm:text-2xl md:lg:text-3xl py-2 px-10 md:px-16 lg:px-20 md:lg:py-1 lg:font-black font-inter lg:uppercase font-roboto font-medium text-[15.38px] leading-[100%] tracking-normal  text-[#E59948]">
                  About - Us
               </h1>
            </div>
            <div className="timeline relative mx-3 pt-10 md:pt-40 overflow-hidden md:after:block">
               {/* Timeline Dot */}
               <div
                  className="absolute w-[15px] h-[15px] bg-[rgb(196,149,20)] rounded-full left-[50.1%] -ml-[10px] transition-[top] duration-0 ease-linear hidden md:block"
                  style={{ top: "calc(var(--scroll-position, 0%) - 12px)" }}
               ></div>
               <About_Card
                  head="Who we are?"
                  paragraph="At To-Let, we are more than just property managers – we are dedicated partners in your property management journey. Established with a commitment to redefining the standards of property management, To-Let brings a wealth of expertise to the dynamic property management landscape."
                  place="left"
               />
               <About_Card
                  head="Our Journey"
                  paragraph="Since our inception, we have been at the forefront of delivering exceptional property management solutions. With a foundation built on integrity, transparency, and client-centric values, To-Let has steadily grown to become a trusted name in the industry."
                  place="right"
               />
               <About_Card
                  head="Mission and Vision"
                  paragraph="Our mission is to simplify and elevate the property management experience for property owners and tenants alike. We envision a future where seamless, efficient, and client-focused property management is the norm."
                  place="left"
               />
               <About_Card
                  head="Services we offer"
                  paragraph="To-Let specializes in a comprehensive suite of property management services, including property leasing, tenant screening, rent collection, property maintenance, and the provision of PGs (Pay Guest) and flats for rent. Our tailored solutions cater to the unique needs of each property under our care."
                  place="right"
               />
               <About_Card
                  head="Client-Centric Approach"
                  paragraph="What sets To-Let apart is our unwavering dedication to client satisfaction. We prioritize open communication, timely responses, and a proactive approach to address the diverse needs of property owners and tenants."
                  place="left"
               />
               <About_Card
                  head="Expert Team"
                  paragraph="Our team consists of seasoned professionals with in-depth knowledge of the property management industry. From property managers to maintenance experts, each member of the To-Let team is committed to ensuring the optimal performance and value of your property."
                  place="right"
               />
            </div>
            <div className="mb-20 sm:mb-36 w-full">
               <div className="bg-black border-[3px] uppercase border-[#6cc0c4] rounded-3xl lg:text-[#E8B636] text-[#E59948] m-auto py-2 px-4 w-1/2 md:w-1/4">
                  <h2 className="md:text-3xl text-xl font-bold text-center">
                     Our Team
                  </h2>
               </div>
               <div className="flex justify-center items-center ms-2 md:ms-0">
                  <img
                     src={image}
                     alt="image logo"
                     className="max-w-full h-auto pr-3"
                  />
               </div>
               <div className="flex flex-row items-center justify-around">
                  <Flip
                     image={CEO1}
                     linkedin="https://www.linkedin.com/in/mayur-kukreja-280b71b4/"
                     name="Mayur Kukreja"
                     post="CEO & Founder"
                  />
                  <Flip
                     image={CEO3}
                     linkedin="https://www.linkedin.com/in/emanshu-wadhwani-258678176/"
                     name="Emanshu Wadhwani"
                     post="Co-founder"
                  />
                  <Flip
                     image={CEO2}
                     linkedin="https://www.linkedin.com/in/rohit-kanaujia-b775a5171/"
                     name="Rohit Kanaujia"
                     post="Co-founder"
                  />
               </div>
            </div>
            <Faq />
         </div>
      </>
   );
}
