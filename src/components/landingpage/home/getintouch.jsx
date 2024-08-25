import 'animate.css'
import location from '../../../assets/getintouch/toletglobelocationimage.jpg'

export const ContactUs = () => {
  const googlemaps =
    'https://www.google.com/maps/place/To-Let+Globe/@26.8465566,80.9797793,15z/data=!4m6!3m5!1s0x399bfd77577ba78f:0xd2d6f22d1b246815!8m2!3d26.8465566!4d80.9797793!16s%2Fg%2F11vhrqqb45?entry=ttu'
  return (
    <div className="my-10 h-full m-auto flex flex-col">
      <div className="w-[80%] mx-auto h-full bg-black flex flex-col justify-between lg:flex-row lg:justify-between mt-15">
        <a href={googlemaps} className="lg:w-[65%] flex h-[30rem] lg:h-auto">
          <div
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 10%, transparent 10%, rgba(0, 0, 0, 0.4) 100%), 
                               linear-gradient(to right, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.4) 95%, rgba(0, 0, 0, 0.4) 100%), 
                               url(${location})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className={` bg-cover bg-no-repeat flex flex-col items-center justify-center w-full h-[80%] text-white my-auto`}
          >
            <p className="text-[#6CC1B6] mb-0 text-4xl font-bold"></p>
          </div>
        </a>

        <div className="lg:w-[25%]  flex flex-col text-start lg:ml-8 my-10">
          <p className="text-[#6CC1B6] font-normal text-4xl text-left pb-5">
            GET IN TOUCH
          </p>
          <p className="text-gray-500 m-0 text-left pb-4">
            Have some questions?
          </p>
          <p className="text-gray-500 text-left m-0 pb-4">
            feel free to ask them anytime
          </p>

          <form className="w-full flex flex-col justify-between text-white">
            <input
              type="text"
              placeholder="Name"
              className="bg-black border-b-2 border-gray-400 text-white focus:outline-none my-6"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-black border-b-2 border-gray-400 text-white focus:outline-none my-6"
            />
            <input
              type="text"
              placeholder="Phone"
              className="bg-black border-b-2 border-gray-400 text-white focus:outline-none my-6"
            />
            <input
              type="text"
              placeholder="Message"
              className="bg-black border-b-2 border-gray-400 text-white focus:outline-none my-6"
            />
            <button className="bg-none border-none text-[#c8a21c] text-left text-lg mt-4">
              Send Message &rarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
