import { Route, Routes } from "react-router-dom";
import { Login, NavBar } from "./index";

const LoginLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="nav fixed top-0 z-50">
        <NavBar />
      </div>
      <div className="main flex-1 pt-16 px-4">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default LoginLayout;
