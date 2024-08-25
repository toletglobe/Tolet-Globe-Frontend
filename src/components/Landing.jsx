import { Homepage } from "./index";
import Service from "./service/Service";
import { About } from "./landingpage/home/about";
import { ContactUs } from "./landingpage/home/getintouch";

const Landing = () => {
  return (
    <div>
      <Homepage />
      <Service />
      <About />
      <ContactUs />
    </div>
  );
};

export default Landing;
