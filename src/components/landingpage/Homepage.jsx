import { useEffect, useState } from "react";
import { HomeUp } from "../index";


const Homepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={isScrolled ? "home scrolled" : "home"} id="home">
      
        <HomeUp />
      
      
    </section>
  );
};

export default Homepage;