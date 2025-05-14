import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { API } from "../../config/axios";

const VerifyAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      const verifyUser = async () => {
        try {
          const res = await API.get(`/auth/verify/${token}`);
          console.log(res);

          if (res.status === 200) {
            if (res.data?.message?.toLowerCase().includes("verified")) {
              toast.success(res.data.message);
              setTimeout(() => navigate("/login"), 2000);
            } else {
              toast.error(res.data.message || "Verification failed.");
              setTimeout(() => navigate("/"), 2000);
            }
          } else {
            toast.error(res.data.message || "Verification failed.");
          }
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong.");
        }
      };

      verifyUser();
      mounted.current = true;
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl font-semibold">Verifying your account...</h1>
    </div>
  );
};

export default VerifyAccount;
