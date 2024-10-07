import { Homepage } from "./index";
import Service from "./service/Service";
import { About } from "./landingpage/home/about";
import { ContactUs } from "./landingpage/home/getintouch";
import { PropertyCarousel } from "./landingpage/home/Propertycarousel";

const Landing = () => {
  return (
    <div>
      <Homepage />
      <Service />
      <About />
      <PropertyCarousel />
      <ContactUs />
    </div>
  );
};

export default Landing;
