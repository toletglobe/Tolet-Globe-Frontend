import { Homepage } from "./index";
import Service from "./service/Service";
import { About } from "./landingpage/home/about";
import { ContactUs } from "./landingpage/home/getintouch";
import { PropertyCarousel } from "./landingpage/home/PropertyCarousel";
import Institution from "./partner_institution/Institution";

const Landing = () => {
  return (
    <div>
      <Homepage />
      <Service />
      <About />
      < PropertyCarousel />
      <Institution/>
      <ContactUs />
    </div>
  );
};

export default Landing;
