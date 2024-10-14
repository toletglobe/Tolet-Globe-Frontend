import { Homepage } from "./index";
import Service from "./service/Service";
import { About } from "./landingpage/home/about";
import { ContactUs } from "./landingpage/home/getintouch";
import { PropertyCarousel } from "./landingpage/home/PropertyCarousel";
import Institution from "./partner_institution/Institution";
import HiringPartners from "./Hiringpartner/HiringPartners";
import TestimonialCard from "./testimonial/testimonial";

const Landing = () => {
  return (
    <div>
      <Homepage />
      <Service />
      <About />
      <HiringPartners/>
      < PropertyCarousel />
      <Institution/>
      <TestimonialCard/>
      <ContactUs />
    </div>
  );
};

export default Landing;
