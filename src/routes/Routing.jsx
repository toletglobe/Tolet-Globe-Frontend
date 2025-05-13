import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { lazy } from "react";

import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";

const Home = lazy(() => import("../pages/Home/Home.jsx"));
const VerifyAccount = lazy(() =>
  import("../pages/VerifyAccount/VerifyAccount.jsx")
);

const Blog = lazy(() => import("../pages/Blog/Blog.jsx"));
const BlogView = lazy(() => import("../pages/Blog/BlogView.jsx"));
const Contact = lazy(() => import("../pages/Contact/Contact.jsx"));
const About = lazy(() => import("../pages/About/About.jsx"));
const Listings = lazy(() =>
  import("../pages/PropertyListing/Listings/Listings.jsx")
);
const CompareProperty = lazy(() =>
  import("../pages/PropertyListing/CompareProperties/CompareProperty.jsx")
);
const ViewProperty = lazy(() =>
  import("../pages/PropertyListing/ViewProperty/ViewProperty.jsx")
);
const Login = lazy(() => import("../pages/Login/Login.jsx"));
const Register = lazy(() => import("../pages/Register/Register.jsx"));
const ForgotPassword = lazy(() =>
  import("../pages/ForgotPassword/ForgotPassword.jsx")
);
const ResetPassword = lazy(() =>
  import("../pages/ResetPassword/ResetPassword.jsx")
);

const Pricing = lazy(() => import("../pages/Pricing/Pricing.jsx"));
const Twitter = lazy(() => import("../pages/Twitter/Twitter.jsx"));

const LandlordDashboard = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboard.jsx")
);
const LandlordDashboardWelcomePage = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboardWelcomePage.jsx")
);
const LandlordDashboardMyProperties = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboardMyProperties.jsx")
);
const LandlordDashboardMyFavourites = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboardMyFavourites.jsx")
);
const LandlordDashboardAddProperties = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboardAddProperties.jsx")
);
const LandlordDashboardEditProperties = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboardEditProperties.jsx")
);
const LandlordDashboardProfileForm = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboardProfileForm.jsx")
);
const LandlordDashboardAccountSecurity = lazy(() =>
  import("../pages/Dashboard/landlord/LandlordDashboardAccountSecurity.jsx")
);

const Routing = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogView />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/property-listing" element={<Listings />} />
          <Route path="/property-listing/:city" element={<Listings />} />
          <Route path="/compare-property" element={<CompareProperty />} />
          <Route path="/property/:slug" element={<ViewProperty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/twitter" element={<Twitter />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/verify/:token" element={<VerifyAccount />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />

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
              path="favourites"
              element={<LandlordDashboardMyFavourites />}
            />
            <Route
              path="add-properties"
              element={<LandlordDashboardAddProperties />}
            />
            <Route
              path="edit-properties/:id"
              element={<LandlordDashboardEditProperties />}
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
