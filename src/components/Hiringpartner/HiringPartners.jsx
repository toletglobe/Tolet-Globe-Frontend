import React from 'react';
import linkedinLogo from '../../assets/Hiring/linkedin.jpg';
import unstopLogo from '../../assets/Hiring/unstop.jpg';
import apnaLogo from '../../assets/Hiring/apna.jpg';
import pregradLogo from '../../assets/Hiring/pregrad.jpg'; // Add more logos as needed
import sunstoneLogo from '../../assets/Hiring/sunstone.jpg';

const HiringPartners = () => {
  const handleLogoClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full py-8 px-4 bg-black flex flex-col items-center justify-center border border-white rounded-lg shadow-lg mx-auto relative" 
         style={{ maxWidth: '1212px', height: 'auto' }}> {/* Center component and make width responsive */}
      {/* Text positioned over the border */}
      <h2 
        className="absolute text-[#2e7766] text-3xl md:text-4xl font-bold -top-6 bg-black px-4"
        style={{ borderRadius: '10px' }}
      >
        Our Hiring Partners
      </h2>
      
      <div className="w-full text-center mt-6"> {/* Pushed down to avoid overlap */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-8"> {/* Responsive logo grid */}
          <img
            src={linkedinLogo}
            alt="LinkedIn"
            onClick={() => handleLogoClick("https://www.linkedin.com/company/to-let-globe/posts/?feedView=all")}
            className="cursor-pointer h-[60px] md:h-[85px] max-w-[150px] md:max-w-[200px] rounded-[5px] transition-transform ease-in-out duration-300 hover:scale-105 hover:opacity-90"
          />
          <img
            src={unstopLogo}
            alt="Unstop"
            onClick={() => handleLogoClick("https://unstop.com")}
            className="cursor-pointer h-[60px] md:h-[85px] max-w-[150px] md:max-w-[200px] rounded-[5px] transition-transform ease-in-out duration-300 hover:scale-105 hover:opacity-90"
          />
          <img
            src={apnaLogo}
            alt="Apna"
            onClick={() => handleLogoClick("https://apna.co")}
            className="cursor-pointer h-[60px] md:h-[85px] max-w-[150px] md:max-w-[200px] rounded-[5px] transition-transform ease-in-out duration-300 hover:scale-105 hover:opacity-90"
          />
          <img
            src={pregradLogo}
            alt="Pregrad"
            onClick={() => handleLogoClick("https://www.pregrad.in/")}
            className="cursor-pointer h-[60px] md:h-[85px] max-w-[150px] md:max-w-[200px] rounded-[5px] transition-transform ease-in-out duration-300 hover:scale-105 hover:opacity-90"
          />
          <img
            src={sunstoneLogo}
            alt="Sunstone"
            onClick={() => handleLogoClick("https://sunstone.in")}
            className="cursor-pointer h-[60px] md:h-[85px] max-w-[150px] md:max-w-[200px] rounded-[5px] transition-transform ease-in-out duration-300 hover:scale-105 hover:opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default HiringPartners;
