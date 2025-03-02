import {
  About,
  HiringPartners,
  PropertyCarousel,
  OurReach,
  Institution,
  TestimonialCard,
  GetInTouch,
  ChatApp
} from "../components/index";
import Service from "./Service";
import HomeMain from "../components/landingPageComp/homepageComp/HomeMain";

const Landing = () => {
  return (
    <div>
      <HomeMain />
      <Service />
      <About />
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
