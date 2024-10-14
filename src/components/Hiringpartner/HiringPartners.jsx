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
    <div className="h-full w-full py-8 px-6 bg-black flex flex-col items-center justify-center relative -top-8 border border-white rounded-lg shadow-lg" 
         style={{ width: '1212px', height: '246px', marginLeft: 'auto', marginRight: '160px' }}> {/* Align component to the right */}
      <div className="max-w-[1310px] w-full text-center">
        <div className="bg-black z-20 relative inline-block" style={{ width: '392px', height: '49px', borderRadius: '10px', position: 'absolute', left: '410px',top:-20 }}> {/* Updated styles */}
          <h2 className="text-[#2e7766] text-4xl font-bold mb-0 relative">
            Our Hiring Partners
          </h2>
        </div>
        <div className="flex justify-center items-center flex-wrap gap-10 mt-12"> {/* Centered logos */}
          <img
            src={linkedinLogo}
            alt="LinkedIn"
            onClick={() => handleLogoClick("https://linkedin.com")}
            className="cursor-pointer h-[85px] max-w-[200px] rounded-[5px] transition-transform ease-in-out duration-300 hover:scale-105 hover:opacity-90"
          />
          <img
            src={unstopLogo}
            alt="Unstop"
            onClick={() => handleLogoClick("https://unstop.com")}
            className="cursor-pointer h-[85px] max-w-[200px] rounded-[5px] transition-transform ease-in-out duration-300 hover:scale-105 hover:opacity-90"
          />
          <img
            src={apnaLogo}
            alt="Apna"
            onClick={() => handleLogoClick("https://apna.co")}
            className="cursor-pointer h-[85px] max-w-[200px] rounded-[5px] transition-transform ease-in-out duration-300 hover:scale-105 hover:opacity-90"
          />
          <img
            src={pregradLogo}
            alt="Pregrad"
            onClick={() => handleLogoClick("https://pregrad.com")}
            className="cursor-pointer h-[85px] max-w-[200px] rounded-[5px] transition-transform ease-in-out duration-300 hover:scale-105 hover:opacity-90"
          />
          <img
            src={sunstoneLogo}
            alt="Sunstone"
            onClick={() => handleLogoClick("https://sunstone.in")}
            className="cursor-pointer h-[85px] max-w-[200px] rounded-[5px] transition-transform ease-in-out duration-300 hover:scale-105 hover:opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default HiringPartners;
