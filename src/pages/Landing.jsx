import {
  Homepage,
  About,
  HiringPartners,
  PropertyCarousel,
  OurReach,
  Institution,
  TestimonialCard,
  GetInTouch,
} from "../components/index";
import Service from "./Service";

const Landing = () => {
  return (
    <div>
      <Homepage />
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
    </div>
  );
};

export default Landing;
