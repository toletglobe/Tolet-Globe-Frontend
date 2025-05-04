import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar.jsx";
import Footer from "../components/Footer.jsx";

const MainLayout = () => {
  return (
    <div>
      <Suspense fallback={<div className="flex min-h-screen justify-center items-center text-lg md:text-xl">Loading...</div>}>
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </div>
  );
};

export default MainLayout;
