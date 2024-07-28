import { FaLocationDot } from "react-icons/fa6"
import { IoIosCall, IoIosMail } from "react-icons/io"
import logo from "../../assets/logo.png"

const Footer = () => {
  return (
    <div className="text-white mx-20">
      <div className="grid grid-cols-2 md:grid-cols-4 justify-around gap-20">
        <div>
          <h1 className="text-2xl font-semibold">REACH US</h1>
          <ul className="mt-5">
            <li className="flex flex-row items-center mb-2 gap-2"><IoIosCall /> +91-8707727347</li>
            <li className="flex flex-row items-center mb-2 gap-2"><IoIosMail />hello@toletglobe.in</li>
            <li className="flex flex-row items-center mb-2 gap-2"><FaLocationDot />D1/122 vipulkhand,Gomtinagar Lucknow, Uttar Pradesh</li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">QUICK LINKS</h1>
          <ul className="mt-5 gap-3">
            <li className=" mb-2">Home</li>
            <li className=" mb-2">Blog</li>
            <li className=" mb-2">Property</li>
          </ul>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">SERVICE</h1>
            <ul className="mt-5 gap-3">
              <li>Paying Guest</li>
              <li>Flat and House</li>
              <li>Office</li>
              <li>Shops and Godown</li>
            </ul>
          </div>
          <div className=" flex flex-col justify-center items-center">
            <div>
              <img src={logo} alt="" />
            </div>
            <div className="text-center">
            One-stop solution for all your brokerage free rental needs
            </div>
          </div>
      </div>
      <div className="">
        <div className="text-gray-500 font-bold mt-10">
        © 2023 To-Let Globe -- Lucknow
        </div>
      </div>
    </div>
  )
}

export default Footer
