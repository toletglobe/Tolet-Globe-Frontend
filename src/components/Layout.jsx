import { Route, Routes } from "react-router-dom";
import {
  NavBar,
  Contact,
  AboutUs,
  Service,
  Blog,
  Property,
  Footer,
  BlogView,
  Login,
  Register,
  ForgotPassword,
} from "./index";
import Landing from "./Landing";
import Listing from "./property/Listing";
import Flow2a from "./property/Flow2-1/Flow2a1";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="nav fixed top-0 z-50">
        <NavBar />
      </div>
      <div className="main flex-1 pt-16">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogView />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/property" element={<Property />} />
          <Route path="/property-listing" element={<Listing />} />
          <Route path="/property/:id" element={<Flow2a />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
      <div className="footer bottom-0 mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
