/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AiOutlineHome } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { MdLockOutline } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom"

import logo from '../../assets/logo.png'

const Sidebar = ({activeLink, handleNavLinkClick}) => {

    const navigate =useNavigate();
    const location =useLocation();
    const {pathname} =location;

  return (
    <div className="min-h-screen flex bg-black text-white">
        <aside className="w-[300px] p-6">
            <div className="flex justify-center flex-col p">
                <img src={logo} alt="" />
                <div className="text-center font-bold text-2xl mb-10">Tolet Globe</div>
            </div>
            <nav className="space-y-1">
                <Link
                    to="/admin"
                    onClick={()=>handleNavLinkClick("admin")}
                    className="flex block text-white-700 hover:bg-[#ffcc00] p-3 rounded"
                >
                    <svg className='mr-3' width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9688 19.4376C21.9688 19.9036 21.591 20.2813 21.125 20.2813H0.875C0.40901 20.2813 0.0312502 19.9036 0.0312502 19.4376C0.0312502 18.9716 0.40901 18.5938 0.875 18.5938H1.71875V11.8438C1.71875 11.3778 2.09651 11.0001 2.5625 11.0001H5.09375C5.55974 11.0001 5.9375 11.3778 5.9375 11.8438V18.5938H7.625V6.78131C7.625 6.31532 8.00276 5.93756 8.46875 5.93756H11.8438C12.3097 5.93756 12.6875 6.31532 12.6875 6.78131V18.5938H14.375V1.71881C14.375 1.25282 14.7528 0.875062 15.2188 0.875062H19.4375C19.9035 0.875062 20.2813 1.25282 20.2813 1.71881V18.5938H21.125C21.591 18.5938 21.9688 18.9716 21.9688 19.4376Z" fill="white"/>
                    </svg>
                    <span>Dashboard</span>
                </Link>
                <Link
                    to="/admin/My-Properties"
                    onClick={()=>handleNavLinkClick("My-Properties")}
                    className="flex block text-white-700 hover:bg-[#ffcc00] p-3 rounded"
                >
                    <AiOutlineHome size={27} className='mr-3' /><span>My Properties</span>
                </Link>
                <Link
                    to="/admin/Add-Properties"
                    onClick={()=>handleNavLinkClick("/Add-Properties")}
                    className="flex block text-white-700 hover:bg-[#ffcc00] p-3 rounded"
                >
                    <IoAddOutline size={27} className='mr-3' /><span>Add Property</span>
                </Link>
                <div>
                    <button
                        className="flex block text-white-700 hover:bg-[#ffcc00] p-3 rounded w-full text-left"
                        onClick={() => document.getElementById('settingsMenu').classList.toggle('hidden')}
                    >
                        <IoSettingsOutline size={27} className='mr-3' /> <span>Settings</span> 
                        <svg className='ml-[120px] mt-[10px]' width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.04518 0.616227C1.27959 0.381889 1.59748 0.250244 1.92893 0.250244C2.26039 0.250244 2.57827 0.381889 2.81268 0.616227L9.00018 6.80373L15.1877 0.616227C15.4234 0.38853 15.7392 0.262536 16.0669 0.265384C16.3947 0.268232 16.7082 0.399694 16.94 0.631454C17.1717 0.863214 17.3032 1.17673 17.306 1.50448C17.3089 1.83222 17.1829 2.14797 16.9552 2.38373L9.88393 9.45498C9.64952 9.68932 9.33164 9.82096 9.00018 9.82096C8.66873 9.82096 8.35084 9.68932 8.11643 9.45498L1.04518 2.38373C0.810843 2.14932 0.679199 1.83143 0.679199 1.49998C0.679199 1.16852 0.810843 0.850637 1.04518 0.616227Z" fill="#F8F8F8"/>
                        </svg>
                    </button>
                    <div id="settingsMenu" className="ml-6 space-y-2 hidden">
                        <Link
                            to="/admin/Profile"
                            onClick={()=>handleNavLinkClick("/Profile")}
                            className="flex block text-white-700 hover:bg-[#ffcc00] p-3 rounded"
                        >
                            <GoPerson size={27} className='mr-3' /><span>Profile</span>
                    </Link>
                        <Link
                            to="/admin/Account-Security"
                            onClick={()=>handleNavLinkClick("/Account-Security")}
                            className="flex block text-white-700 hover:bg-[#ffcc00] p-3 rounded"
                        >
                            <MdLockOutline size={27} className='mr-3' /><span>Account Security</span>
                        </Link>
                    </div>  
                </div>
                <a href="#logout" className="flex block text-red-500 p-3 rounded">
                    <MdLogout size={27} className='mr-3' /> Logout
                </a>
            </nav>
        </aside>
    </div>
  )
}
export default Sidebar
