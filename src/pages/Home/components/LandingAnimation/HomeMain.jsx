import { useEffect, useState } from "react";
import HomeUp from "./HomeUp";
import HomeLap from "./HomeLap";
import HomeMobile from "./HomeMobile";

const HomeMain = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Function to check screen size and update isMobile state
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div
        className={`transition-opacity duration-[1500ms] ease-in-out ${
          !isScrolled ? "opacity-100" : "opacity-0"
        } absolute w-full h-full`}
      >
        <HomeUp />
      </div>
      <div
        className={`transition-opacity duration-[1500ms] ease-in-out ${
          isScrolled ? "opacity-100" : "opacity-0"
        } absolute w-full h-full`}
      >
        {isMobile ? <HomeMobile /> : <HomeLap />}
      </div>
    </section>
  );
};

export default HomeMain;


