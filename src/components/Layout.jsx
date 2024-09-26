import { Route, Routes, useLocation } from "react-router-dom";
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
  Listing,
  ForgotPassword,
  Flow2a,
  // LandlordPage,
} from "./index";
import Landing from "./Landing";
import ResetPassword from "./resetpassword/ResetPassword";
import Reviews from "./reviews/Reviews";
import AddProperty from "./property/create-prop/AddProperty";

const Layout = () => {
  const location = useLocation();

  // Determine whether to show the NavBar and Footer based on the current route
  // const showNavBar = location.pathname !== "/landlord-profile";
  // const showFooter = location.pathname !== "/landlord-profile";

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* {showNavBar && ( */}
      <div className="nav fixed top-0 left-0 right-0 z-50 bg-white">
        <NavBar />
      </div>
      {/* )} */}
      {/* <div className={`main flex-1 ${showNavBar ? "pt-16" : ""}`}> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogView />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/property" element={<Property />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/property-listing" element={<Listing />} />
        <Route path="/property/:id" element={<Flow2a />} />
        <Route path="/property/reviews" element={<Reviews />} />
        <Route path="/property/add-property" element={<AddProperty />} />
        {/* <Route path="/landlord-profile" element={<LandlordPage />} /> */}
      </Routes>
      {/* </div> */}
      {/* {showFooter && ( */}
      <div className="footer mt-5">
        <Footer />
      </div>
      {/* )} */}
    </div>
  );
};

export default Layout;
