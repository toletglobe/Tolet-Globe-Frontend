import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../reusableComponents/Navbar.jsx";
import Footer from "../reusableComponents/Footer.jsx";

const MainLayout = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </div>
  );
};

export default MainLayout;
