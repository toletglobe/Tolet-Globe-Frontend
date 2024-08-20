import { useEffect, useState } from "react";
import { HomeUp } from "../index";
import HomeDown from "./home/HomeDown";

const Homepage = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div
        className={`transition-opacity duration-[1500ms] ease-in-out ${
          scrollPos < 20 ? "opacity-100" : "opacity-0"
        } absolute w-full h-full`}
      >
        <HomeUp />
      </div>
      <div
        className={`transition-opacity duration-[1500ms] ease-in-out ${
          scrollPos >= 20 ? "opacity-100" : "opacity-0"
        } absolute w-full h-full`}
      >
        <HomeDown />
      </div>
    </section>
  );
};

export default Homepage;
