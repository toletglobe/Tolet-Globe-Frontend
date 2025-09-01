import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { API } from "../../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/store/authSlice";
import { useNavigate } from "react-router-dom";

const GoogleOAuthBar = () => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useNavigate();
  const handleGoogleLogin = async (credentialResponse) => {
    setSubmitting(true);
    const loadingToast = toast.loading(
      "Authenticating... Please wait while we log you in via Google."
    );

    try {
      const res = await API.post("/auth/google-login", {
        token: credentialResponse.credential,
      });

      const data = res.data;

      // Check if the response is successful and contains a token
      if (res.status === 200 && data.token) {
        // Store the necessary information in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("properties", data.user.properties);

        // Dispatch the login action with the user data
        dispatch(
          login({
            token: data.token,
            userData: {
              id: data.user.id,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
              profilePicture: data.user.profilePicture,
              properties: [],
            },
          })
        );
        console.log(data.user);
        toast.dismiss(loadingToast);
        if (
          !data.user.phoneNumber ||
          data.user?.phoneNumber?.trim().length === 0
        ) {
          return (window.location.href =
            location.state?.from || "/landlord-dashboard");
        }
        router(location.state?.from || "/landlord-dashboard");
      } else {
        setSubmitting(false);
        toast.dismiss(loadingToast);
        toast.error(
          res.data?.message ||
            "Unexpected response from server. Please try again."
        );
      }
    } catch (error) {
      setSubmitting(false);
      toast.dismiss(loadingToast);
      console.error(
        "Google login error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Google login failed. Please try again."
      );
    } finally {
      toast.dismiss(loadingToast);
      setSubmitting(false);
    }
  };

  const handleError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="w-full max-w-[300px] mx-auto">
      <div className="flex justify-center items-center">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={handleError}
          useOneTap={false}
          auto_select={false}
          disabled={submitting}
          theme="outline"
          size="large"
          width="280"
          text="continue_with"
          shape="rectangular"
          logo_alignment="left"
          locale="en"
        />
      </div>

      {submitting && (
        <div className="flex justify-center mt-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default GoogleOAuthBar;
