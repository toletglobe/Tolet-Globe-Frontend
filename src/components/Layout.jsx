import { Route, Routes, useLocation } from "react-router-dom";

import {
  NavBar,
  Contact,
  AboutUs,
  Service,
  Shop,
  Office,
  Warehouse,
  Flat,
  Pg,
  House,
  Blog,
  Property,
  Footer,
  BlogView,
  Login,
  Register,
  Listing,
  ForgotPassword,
  Flow2a,

  LandlordPage,
  LandlordDashboard,
  Listing_Ayodhya,
  Listing_Vellore,
  Listing_Kota
} from "./index";
import Landing from "./Landing";
import ResetPassword from "./resetpassword/ResetPassword";
import Reviews from "./reviews/Reviews";
import AddProperty from "./property/create-prop/AddProperty";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen w-full">
     
        <div className="nav fixed top-0 left-0 right-0 z-50 bg-white">
          <NavBar />
        </div>

      <div className="main flex-1 pt-16">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/house" element={<House />} />
          <Route path="/flat" element={<Flat />} />
          <Route path="/office" element={<Office />} />
          <Route path="/pg" element={<Pg />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogView />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/property" element={<Property />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/property-listing-lucknow" element={<Listing />} />
          <Route path="/property-listing-ayodhya" element={<Listing_Ayodhya />} />
          <Route path="/property-listing-vellore" element={<Listing_Vellore />} />
          <Route path="/property-listing-kota" element={<Listing_Kota />} />
          <Route path="/property/:id" element={<Flow2a />} />
          <Route path="/property/reviews" element={<Reviews />} />
          <Route path="/property/add-property" element={<AddProperty />} />
          <Route path="/landlord-profile" element={<LandlordPage />} />
          <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
        </Routes>

 
      </div> 
      <div className="footer mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

