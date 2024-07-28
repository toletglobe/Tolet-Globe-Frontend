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
          className={`mx-8 w-full md:w-2/3 lg:w-full transition-all duration-1000 ease-in-out ${
            isScrolled
              ? "sm:text-left opacity-100"
              : "text-center opacity-100"
          }`}
        >
          <h1 className="text-white sm:text-4xl text-2xl font-semibold mb-4">
            Welcome to To-Let Globe
          </h1>
          <h6 className={`${isScrolled ? "text-yellow-400" : "text-teal-600"} sm:text-xl text-lg font-light`}>
            NO BROKERAGE ON PGS | FLATS | HOUSES | OFFICES
          </h6>
          <div
            className={`relative w-1/2 h-7 mt-5 max-w-md ${
              isScrolled
                ? "opacity-100 transition-opacity duration-1000"
                : "opacity-0 transition-opacity duration-1000"
            }`}
          >
            <input
              type="text"
              className="form-input w-[95%] h-8 rounded-l border-gray-300 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Search PG, Flats and Houses"
              aria-label="Search PG, Flats and Houses"
            />
            <button
              className="absolute right-0 px-5 py-1 bg-teal-600 text-white rounded-r"
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