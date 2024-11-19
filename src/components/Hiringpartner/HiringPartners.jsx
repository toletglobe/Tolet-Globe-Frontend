import React from 'react';
import linkedinLogo from '../../assets/Hiring/linkedin.jpg';
import unstopLogo from '../../assets/Hiring/unstop.jpg';
import apnaLogo from '../../assets/Hiring/apna.jpg';
import pregradLogo from '../../assets/Hiring/pregrad.jpg';
import sunstoneLogo from '../../assets/Hiring/sunstone.jpg';

const HiringPartners = () => {
  // Array of hiring partners
  const hiringPartners = [
    { name: "LinkedIn", logo: linkedinLogo, url: "https://www.linkedin.com/company/to-let-globe/posts/?feedView=all" },
    { name: "Unstop", logo: unstopLogo, url: "https://unstop.com" },
    { name: "Apna", logo: apnaLogo, url: "https://apna.co" },
    { name: "Pregrad", logo: pregradLogo, url: "https://www.pregrad.in/" },
    { name: "Sunstone", logo: sunstoneLogo, url: "https://sunstone.in" },
  ];

  // Function to handle logo click
  const handleLogoClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-full py-8 px-6 bg-black flex flex-col items-center justify-center relative -top-8 border border-white rounded-lg shadow-lg mx-auto max-w-[1212px]">
      {/* Heading Section */}
      <div className="w-full text-center">
        <div className="bg-black z-20 relative inline-block mx-auto px-4 py-2 rounded-lg -top-14">
          <h2 className="text-[#2e7766] text-2xl md:text-4xl font-bold mb-0">
            Our Hiring Partners
          </h2>
        </div>
      </div>

      {/* Logo Section */}
      <div className="flex justify-center items-center flex-wrap gap-6 md:gap-8 mt-12 px-4">
        {hiringPartners.map((partner, index) => (
          <img
            key={index}
            src={partner.logo}
            alt={partner.name}
            onClick={() => handleLogoClick(partner.url)}
            className="cursor-pointer h-[60px] md:h-[85px] max-w-[150px] md:max-w-[200px] rounded-lg transition-transform ease-in-out duration-300 hover:scale-105 hover:opacity-90"
          />
        ))}
      </div>
    </div>
  );
};

export default HiringPartners;
