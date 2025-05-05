import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../reusableComponents/Navbar.jsx";
import Footer from "../reusableComponents/Footer.jsx";

const MainLayout = () => {
  return (
    <div>
      <Suspense fallback={<div className="flex min-h-screen justify-center items-center text-lg md:text-xl">Loading...</div>}>
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
