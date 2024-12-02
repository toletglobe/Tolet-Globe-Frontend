// import { Route, Routes } from "react-router-dom";
// import { Layout, Admin } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API } from "../config/axios";
import { login } from "../redux/store/authSlice";
import Routing from "../routes/Routing";

const Main = () => {
  const dispatch = useDispatch();
  // const authState = useSelector((state) => state.auth);
  
  // fetching user info whenever auth state changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    // fetching user info with jwt token
    const fetchUserInfo = async () => {
      if (!token) return null;
      try {
        const res = await API.get("/user/info", {
          params: {
            token: token,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = {
          token: token,
          userData: res.data,
        };

        dispatch(login(data));
      } catch (err) {
        console.error("Error fetching user info: ", err);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    // <Routes>
    //   <Route path="/*" element={<Layout />} />
    //   <Route path="/admin/*" element={<Admin />} />
    // </Routes>
    <Routing/>
  );
};

export default Main;
