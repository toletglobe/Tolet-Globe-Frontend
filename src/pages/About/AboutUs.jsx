import React, { useEffect } from "react";
import { About_Card, Flip, Faq } from "../../components/index";
import "./about.css";
import "../../index.css";
import image from "../../assets/about/download.png";
import CEO1 from "../../assets/about/first.png";
import CEO2 from "../../assets/about/CEO2.jpg";
import CEO3 from "../../assets/about/CEO3.jpeg";

export default function About() {
  useEffect(() => {
    // Function to handle the scroll event
    const handleScroll = () => {
      // Get the vertical line element
      const verticalLine = document.querySelector(".timeline");
      const timelineDot = document.querySelector(".timeline-dot");
      // Calculate the new height based on scroll position
      const scrollPosition = window.scrollY / 0.9;

      if (verticalLine) {
        // Update the height of the ::after pseudo-element using a CSS custom property
        verticalLine.style.setProperty(
          "--scroll-position",
          `${scrollPosition}px`
        );
      }

      if (timelineDot) {
        timelineDot.style.top = `calc(${scrollPosition}px - 10px)`;
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
      <div className="aboutustimeline my-24 ">
        <div className="aboutus text-center mb-4 ">
          <h1 className="border-[3px] border-[#6cc0c4] rounded-xl text-[#e59948] inline sm:text-5xl text-3xl py-1 px-20 font-bold">
            About Us
          </h1>
        </div>
        <div className="timeline relative max-w-[1450px] m-auto pt-40 overflow-hidden after:hidden md:after:block">
          <div className="timeline-dot hidden md:block"></div>
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
        <div className="teamcontainer flex items-center  flex-col h-auto mx-auto mt-0 mb-40 w-full">
          <div
            id="team-head"
            className="bg-black border-[3px] border-[#6cc0c4] rounded-3xl text-[#e59948] inline py-3 px-24"
          >
            <h2 className="sm:text-5xl text-2xl font-normal">Our Team </h2>
          </div>
          <div className="image hidden md:block pr-1">
            <img src={image} alt="" />
          </div>
          <div className="team-images flex items-center flex-wrap -mt-5 max-w-[1200px] justify-around  ">
            <Flip
              image={CEO1}
              linkedin="https://www.linkedin.com/in/mayur-kukreja-280b71b4/"
              name="Mayur Kukreja"
              post="CEO & Founder"
            />
            <Flip
              image={CEO3}
              linkedin="https://www.linkedin.com/in/emanshu-wadhwani-258678176/"
              name="Emanshu wadhwani"
              post="Co founder"
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
