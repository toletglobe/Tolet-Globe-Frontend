import { Route, Routes } from "react-router-dom";
import { NavBar, Contact, AboutUs, Service, Blog, Property, Footer } from "./index";
import Landing from "./Landing";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="nav fixed top-0 z-50">
        <NavBar />
      </div>
      <div className="main flex-1 pt-16 px-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/property" element={<Property />} />
        </Routes>
      </div>
      <div className="footer bottom-0 mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
