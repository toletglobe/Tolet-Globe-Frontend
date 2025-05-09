import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/auth/verify/${token}`);
        const data = await res.json();

        if (res.ok) {
          toast.success(data.message || "Account verified!");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          toast.error(data.message || "Verification failed.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong.");
      }
    };

    if (token) verifyUser();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl font-semibold">Verifying your account...</h1>
    </div>
  );
};

export default VerifyAccount;
