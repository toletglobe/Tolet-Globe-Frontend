import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API } from "./config/axios";
import { login } from "./redux/store/authSlice";
import Routing from "./routes/Routing";

const RoutingAuthServer = () => {
  const dispatch = useDispatch();

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

  return <Routing />;
};

export default RoutingAuthServer;
