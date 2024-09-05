import 'animate.css'
import location from '../../../assets/getintouch/toletglobelocationimage.jpg'

export const ContactUs = () => {
  const googlemaps =
    'https://www.google.com/maps/place/To-Let+Globe/@26.8465566,80.9797793,15z/data=!4m6!3m5!1s0x399bfd77577ba78f:0xd2d6f22d1b246815!8m2!3d26.8465566!4d80.9797793!16s%2Fg%2F11vhrqqb45?entry=ttu'
  return (
    <div className="my-10 h-[650px] m-auto flex flex-col mt-20">
      <div className="w-[90%] mx-auto h-screen bg-black flex flex-col justify-between lg:flex-row lg:justify-between relative">
        
        <a href={googlemaps} className="lg:w-[65%] flex h-[85%] relative">
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${location})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            className="flex flex-col justify-center items-center w-full h-full text-white"
          >
            <p className="text-white text-[52px] font-bold mr-[500px] mt-[350px]">CONTACT US</p>
          </div>
        </a>
        <div className="lg:w-[35%] flex flex-col text-start lg:ml-8 my-10 relative z-10">
          <p className="text-[#f5595a] font-bold text-4xl text-left pb-5">
            GET IN TOUCH
          </p>
          <p className="text-gray-400 text-left pb-4">
            Have some questions?<br />
            Feel free to ask them anytime
          </p>
          <form className="w-full flex flex-col justify-between text-white">
            <input
              type="text"
              placeholder="Name"
              className="placeholder-white bg-transparent border-b border-gray-600 text-white focus:outline-none my-6 pb-2"
            />
            <input
              type="email"
              placeholder="Email"
              className="placeholder-white bg-transparent border-b border-gray-600 text-white focus:outline-none my-6 pb-2"
            />
            <input
              type="text"
              placeholder="Phone"
              className="placeholder-white bg-transparent border-b border-gray-600 text-white focus:outline-none my-6 pb-2"
            />
            <input
              type="text"
              placeholder="Message"
              className="placeholder-white bg-transparent border-b border-gray-600 text-white focus:outline-none my-6 pb-2"
            />
            <button className="mr-[340px] text-white font-semibold bg-transparent mt-4 hover:text-[#f5595a]">
              Send Message &rarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
