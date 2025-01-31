import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar.jsx";
import Footer from "../components/Footer.jsx";

const MainLayout = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
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
