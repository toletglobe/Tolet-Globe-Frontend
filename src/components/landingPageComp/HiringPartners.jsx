import React from 'react';
import linkedinLogo from '../../assets/Hiring/linkedin.jpg';
import unstopLogo from '../../assets/Hiring/unstop.jpg';
import apnaLogo from '../../assets/Hiring/apna.jpg';
import pregradLogo from '../../assets/Hiring/pregrad.jpg'; // Add more logos as needed
import sunstoneLogo from '../../assets/Hiring/sunstone.jpg';

const HiringPartners = () => {
  const handleLogoClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-full py-8 px-6 bg-black flex flex-col items-center justify-center relative -top-8 border border-white rounded-lg shadow-lg mx-auto"
         style={{ maxWidth: '1212px', marginLeft: 'auto', marginRight: 'auto' }}> {/* Centered component with responsive max width */}
      <div className="w-full text-center">
        <div className="bg-black z-20 relative inline-block mx-auto" style={{ width: 'fit-content', padding: '0 16px', borderRadius: '10px', position: 'relative', top: '-56px' }}> {/* Responsive header with padding */}
          <h2 className="text-[#2e7766] text-2xl md:text-4xl font-bold mb-0">
            Our Hiring Partners
          </h2>
        </div>
        <div className="flex justify-center items-center flex-wrap gap-10 md:gap-10 mt-12 px-4"> {/* Responsive gap between logos */}
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
