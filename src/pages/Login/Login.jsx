import  { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { API } from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const inputs = document.querySelectorAll(".input_text");
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, []);

  const handleFocus = (e) => {
    e.target.previousElementSibling.classList.add("glowIcon");
  };

  const handleBlur = (e) => {
    e.target.previousElementSibling.classList.remove("glowIcon");
  };

  const validate = () => {
    const newErrors = {};
    const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com"];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    } else {
      const domain = email.split("@")[1];
      if (!allowedDomains.includes(domain)) {
        newErrors.email = "Only Gmail, Hotmail, or Outlook emails are allowed";
      }
    }
  
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await API.post("auth/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("User", res.data.user.role);
        localStorage.setItem("userType", res.data.user.userType);
        localStorage.setItem("userId", res.data.user.id);

        dispatch(
          login({
            token: res.data.token,
            userData: {
              id: res.data.user.id,
              firstName: res.data.user.firstName,
              lastName: res.data.user.lastName,
              email: res.data.user.email,
              role: res.data.user.role,
              profilePicture: res.data.user.profilePicture,
            },
          })
        );
        toast.success("Login success");
        navigate("/landlord-dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="login_form_container">
          <div className="login_form">
            <h2 className="text-2xl font-semibold">Login</h2>

            <div className="input_group">
              <AiOutlineMail className="ml-3 text-white" />
              <input
                type="email"
                placeholder="Email"
                className="input_text"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <div className="input_group">
              <FaLock className="ml-3 text-white" />
              <input
                type="password"
                placeholder="Password"
                className="input_text"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <div className="button_group" id="login_button">
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "LOGIN"}
              </button>
            </div>

            <div className="fotter">
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-blue-300 cursor-pointer"
              >
                Forgot Password?
              </span>
              <span
                onClick={() => navigate("/register")}
                className="ml-4 text-blue-300 cursor-pointer"
              >
                Register
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
