import { useEffect, useState } from "react";

 const HomeUp = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-full">
      <div className="flex w-screen h-screen justify-center items-center">
        <div
          className={`mx-8 w-full text-center md:w-2/3 lg:w-full duration-[2s] ease-in-out ${
            isScrolled
              ? "md:-translate-x-[34%] opacity-100"
              : " opacity-100"
          }`}
        >
          <h1 className="text-white sm:text-4xl text-2xl font-semibold mb-4">
            Welcome to To-Let Globe
          </h1>
          <h6 className={`${isScrolled ? "text-yellow-400 ml-7" : "text-teal-600"} sm:text-xl text-lg font-light`}>
            NO BROKERAGE ON PGS | FLATS | HOUSES | OFFICES
          </h6>
          <div
            className={`w-1/2 flex justify-center h-7 mt-5 max-w-md ${
              isScrolled
                ? "opacity-100 translate-x-[160%] transition-opacity duration-1000"
                : "opacity-0 flex justify-center transition-opacity duration-1000"
            }`}
          >
            <input
              type="text"
              className="form-input w-[95%] h-8 rounded-l border-gray-300 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Search PG, Flats and Houses"
              aria-label="Search PG, Flats and Houses"
            />
            <button
              className="right-0 px-5 py-1 h-8 bg-teal-600 text-white rounded-r"
              onClick={() => console.log("connect")}
            >
              Search
            </button>
          </div>
        </div>
        {/* <BottomBg /> */}
      </div>
    </div>
  );
};
export default HomeUp