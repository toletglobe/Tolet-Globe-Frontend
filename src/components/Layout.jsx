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
  LandlordDashboard,
} from "./index";
import Landing from "./Landing";
import ResetPassword from "./resetpassword/ResetPassword";
import Reviews from "./PropertyComp/Reviews";
import AddProperty from "./property/create-prop/AddProperty";
import CompareProperty from "./property/compare-prop/CompareProperty";
import LandlordDashboardMyProperties from "./landlord/LandlordDashboardMyProperties";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constant/constant";

const Layout = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null); // State to hold user info
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user info once when the app loads
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await axios.get(
          `${BASE_URL}user/info?token=${token}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo(response.data); // Set user info in state
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <p>Loading...</p>; // Optionally show loading state

  return (
    <div className="flex flex-col min-h-screen w-full bg-black">
      <div className="fixed top-0 z-50 left-0 right-0 bg-black">
        <NavBar userInfo={userInfo} />
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
          <Route path="/property-listing/:city" element={<Listing />} />
          <Route path="/property-listing/" element={<Listing />} />
          <Route path="/property/:slug" element={<Flow2a />} />
          <Route path="/property/reviews" element={<Reviews />} />
          <Route path="/property/add-property" element={<AddProperty />} />

          <Route
            path="/landlord-dashboard/"
            element={<LandlordDashboard setUserInfo={setUserInfo} />}
          ></Route>
          <Route path="/compare-property" element={<CompareProperty />} />
        </Routes>
      </div>
      <div className="footer mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
