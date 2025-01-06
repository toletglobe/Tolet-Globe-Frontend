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
const CompareProperty = lazy(() =>
  import("../pages/property/compare-prop/CompareProperty.jsx")
);
const Listing = lazy(() => import("../pages/property/Listing.jsx"));
const AboutUs = lazy(() => import("../pages/About/AboutUs.jsx"));
const Login = lazy(() => import("../pages/Login/Login.jsx"));
const Register = lazy(() => import("../pages/register/Register.jsx"));
const ForgotPassword = lazy(() =>
  import("../pages/forgotpassword/ForgotPassword.jsx")
);
const LandlordDashboard = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboard.jsx")
);
const LandlordDashboardWelcomePage = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboardWelcomePage.jsx")
);
const LandlordDashboardMyProperties = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboardMyProperties.jsx")
);
const LandlordDashboardAddProperties = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboardAddProperties.jsx")
);
const LandlordDashboardProfileForm = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboardProfileForm.jsx")
);
const LandlordDashboardAccountSecurity = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboardAccountSecurity.jsx")
);
const Flow2a = lazy(() => import("../pages/property/Flow2-1/Flow2a1.jsx"));

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
          <Route path="/compare-property" element={<CompareProperty />} />
          <Route path="/property-listing/:city" element={<Listing />} />
          <Route path="/property/:slug" element={<Flow2a />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/property/reviews" element={<Reviews />} /> */}

          {/* Authenticated Route */}
          <Route
            path="/landlord-dashboard"
            element={
              <PrivateRoute>
                <LandlordDashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<LandlordDashboardWelcomePage />} />
            <Route
              path="my-properties"
              element={<LandlordDashboardMyProperties />}
            />
            <Route
              path="add-properties"
              element={<LandlordDashboardAddProperties />}
            />
            <Route
              path="settings/profile"
              element={<LandlordDashboardProfileForm />}
            />
            <Route
              path="settings/account-security"
              element={<LandlordDashboardAccountSecurity />}
            />
          </Route>
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
