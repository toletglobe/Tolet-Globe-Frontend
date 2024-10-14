import { Homepage } from "./index";
import Service from "./service/Service";
import { About } from "./landingpage/home/about";
import { ContactUs } from "./landingpage/home/getintouch";
import { PropertyCarousel } from "./landingpage/home/PropertyCarousel";
import Institution from "./partner_institution/Institution";
import HiringPartners from "./Hiringpartner/HiringPartners";
import OurReach from "./OurReach/OurReach"

const Landing = () => {
  return (
    <div>
      <Homepage />
      <Service />
      <About />
      <HiringPartners/>
      <div className="flex flex-col gap-9">
      < PropertyCarousel />
      <OurReach />

      <Institution/>
      </div>
      <ContactUs />
    </div>
  );
};

export default Landing;
