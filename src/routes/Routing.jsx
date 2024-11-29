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
import LandlordDashboard from '../pages/Dashboard/landlord/LandlordDashboard.jsx'

const Landing = lazy(() => import("../pages/Landing"));
const Contact = lazy(() => import("../pages/Contact"));
const Service = lazy(() => import("../pages/Service"));

import {
  // Landing.jsx imports
  // Landing,

  // Service.jsx imports
  // Service,

  // Blog imports
  // Blog,
  // BlogView,

  // Contact imports
  // Contact,

  // About imports
  AboutUs,

  //property imports
  // Property,
  // Listing,

  // Login imports
  Login,

  // register imports
  Register,

  // forgotpassword imports
  ForgotPassword,
} from "../pages/pagesIndex.js";

const Routing = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          {/* <Route path="/blog/:slug" element={<BlogView />} /> */}
          <Route path="/aboutus" element={<AboutUs />} />
          {/* <Route path="/property" element={<Property />} /> */}
          {/* <Route path="/property-listing" element={<Listing />} /> */}

          {/* Authenticated Route */}
          <Route
            path="/landlord-dashboard"
            element={
              <PrivateRoute>
                <LandlordDashboard />
              </PrivateRoute>
            }
          />

          {/* Role Based Route */}
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
