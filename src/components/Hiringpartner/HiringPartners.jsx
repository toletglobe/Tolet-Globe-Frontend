import React from 'react';
import linkedinLogo from '../../assets/about/linkedin.jpg';
import unstopLogo from '../../assets/about/unstop.jpg';
import apnaLogo from '../../assets/about/apna.jpg';
import pregradLogo from '../../assets/about/pregrad.jpg'; // Add more logos as needed
import sunstoneLogo from '../../assets/about/sunstone.jpg';
import './HiringPartners.css';

const HiringPartners = () => {
  const handleLogoClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="hiring-partners">
      <div className="hiring-partners-container">
        <h2 className="hiring-title">Our Hiring Partners</h2> {/* Updated class */}
        <div className="logos">
          <img
            src={linkedinLogo}
            alt="LinkedIn"
            onClick={() => handleLogoClick("https://linkedin.com")}
          />
          <img
            src={unstopLogo}
            alt="Unstop"
            onClick={() => handleLogoClick("https://unstop.com")}
          />
          <img
            src={apnaLogo}
            alt="Apna"
            onClick={() => handleLogoClick("https://apna.co")}
          />
          <img
            src={pregradLogo}
            alt="Pregrad"
            onClick={() => handleLogoClick("https://pregrad.com")}
          />
          <img
            src={sunstoneLogo}
            alt="Sunstone"
            onClick={() => handleLogoClick("https://sunstone.in")}
          />
        </div>
      </div>
    </div>
  );
};

export default HiringPartners;
