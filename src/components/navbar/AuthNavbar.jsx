import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AuthNavbar = () => {
    const location = useLocation();
    const path = location.pathname;
    let linkTo = '/';
    if (path === '/register'  || path === '/forgot-password') {
        linkTo = '/login';
    }
   
  return (
    <div className="text-3xl text-[#c8a217]">
      <Link to={linkTo}>
        <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
    </div>
  );
};

export default AuthNavbar;
