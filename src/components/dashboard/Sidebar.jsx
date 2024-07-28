/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom"

import logo from '../../assets/logo.png'

const Sidebar = ({activeLink, handleNavLinkClick}) => {

    const navigate =useNavigate();
    const location =useLocation();
    const {pathname} =location;

  return (
    <div className="flex left-0 flex-col h-screen px-0 py-4">
      <div className="flex justify-center flex-col p">
        <img src={logo} alt="" />
        <div className="text-center font-bold text-2xl mb-10">Tolet Globe</div>
      </div>
      <nav>
        <Link
        to="/admin"
        onClick={()=>handleNavLinkClick("admin")}
        className={`flex items-center gap-2 px-5 py-2 transition-colors duration-300 ${pathname === "/user"
            ? "bg-[#6CC1B6] text-white"
            : "hover:bg-[#5ea79d]"
          }`}
        >
            <span>Dashboard</span>
        </Link>
        <Link
        to="/admin/blogpost"
        onClick={()=>handleNavLinkClick("blog")}
        className={`flex items-center gap-2 px-5 py-2 transition-colors duration-300 ${pathname === "/user"
            ? "bg-[#6CC1B6] text-white"
            : "hover:bg-[#5ea79d]"
          }`}
        >
            <span>Blog Post</span>
        </Link>
        <Link
        to="/admin/propertlisting"
        onClick={()=>handleNavLinkClick("propertylisting")}
        className={`flex items-center gap-2 px-5 py-2 transition-colors duration-300 ${pathname === "/user"
            ? "bg-[#6CC1B6] text-white"
            : "hover:bg-[#5ea79d]"
          }`}
        >
            <span>Property Listing</span>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
