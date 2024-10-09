import { Homepage } from "./index";
import Service from "./service/Service";
import { About } from "./landingpage/home/about";
import { ContactUs } from "./landingpage/home/getintouch";
import Institution from "./partner_institution/Institution";

const Landing = () => {
  return (
    <div>
      <Homepage />
      <Service />
      <About />
      <Institution/>
      <ContactUs />
    </div>
  );
};

export default Landing;
