import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy } from "react";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "./PrivateRoute";

const Landing = lazy(() => import("../pages/Landing"));
const Contact = lazy(() => import("../pages/Contact"));
const Service = lazy(() => import("../pages/Service"));
const Blog = lazy(() => import("../pages/blog/Blog.jsx"));
const BlogView = lazy(() => import("../pages/blog/BlogView.jsx"));
const Property = lazy(() => import("../pages/property/Property.jsx"));
const Listing = lazy(() => import("../pages/property/Listing.jsx"));
const AboutUs = lazy(() => import("../pages/About/AboutUs.jsx"));
const Login = lazy(() => import("../pages/Login/Login.jsx"));
const Register = lazy(() => import("../pages/register/Register.jsx"));
const ForgotPassword = lazy(() => import("../pages/forgotpassword/ForgotPassword.jsx"));
const LandlordDashboard = lazy(() => import("../pages/Dashboard/landlord/LandlordDashboard.jsx"));



// import {
// } from "../pages/pagesIndex.js";

const Routing = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogView />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/property" element={<Property />} />
          <Route path="/property-listing" element={<Listing />} />
          {/* <Route path="/property-listing/:city" element={<Listing />} /> */}
          {/* <Route path="/property/:slug" element={<Flow2a />} /> */}
          {/* <Route path="/property/reviews" element={<Reviews />} /> */}
          
          {/* Authenticated Route */}
          <Route
            path="/landlord-dashboard"
            element={
              <PrivateRoute>
                <LandlordDashboard />
              </PrivateRoute>
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/auth/reset-password" element={<ResetPassword />} /> */}
        </Route>
      </>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Routing;
