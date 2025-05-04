import Service from "./components/Service";
import AboutUs from "./components/AboutUs";
import HiringPartners from "./components/HiringPartners";
import PropertyCarousel from "./components/PropertyCarousel";
import OurReach from "./components/OurReach";
import Institution from "./components/Institution";
import GetInTouch from "./components/GetInTouch";
import ChatApp from "./components/ChatApp";
import TestimonialCard from "./components/TestimonialCard";
import HomeMain from "./components/LandingAnimation/HomeMain";

// import HomeMain from "../../components/landingPageComp/homepageComp/HomeMain";

const Landing = () => {
  return (
    <div>
      <HomeMain />
      <Service />
      <AboutUs />
      <HiringPartners />
      <div className="flex flex-col gap-9">
        <PropertyCarousel />
        <OurReach />
        <Institution />
        <TestimonialCard />
      </div>
      <GetInTouch />
      <ChatApp />
    </div>
  );
};

export default Landing;
