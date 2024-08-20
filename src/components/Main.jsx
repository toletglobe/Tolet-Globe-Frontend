import { Route, Routes } from "react-router-dom";
import { Layout, Admin } from "./index";

const Main = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
};

export default Main;
