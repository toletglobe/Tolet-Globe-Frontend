import React from "react";
import SideBar from "../../../../sidebar-pro/src/Components/SideBar/SideBar";

const ProfileForm = () => {
  return (
    <div className="min-h-screen flex bg-black text-white">
      <SideBar />
      <main className="flex-grow bg-black p-8">
      <div>
        <div>
          <div>
            <p className="text-3xl font-bold mb-5">Profile</p>
            <p className="text-xl font-bold mb-2">Profile Picture</p>
            <p className="text-[#4F7396] mb-6">
              Add a photo to personalize your account
            </p>
          </div>
          <div>
            <button className="px-8 py-2 bg-white text-black font-bold rounded-md mb-8">
              Upload
            </button>
          </div>
        </div>
        <div>
          <form
            action=""
            className="flex items-start justify-start flex-col gap-5"
          >
            <div className="flex items-center justify-start gap-8">
              <div className="flex flex-col gap-3">
                <label htmlFor="First name" className="font-medium text-lg">
                  First name
                </label>
                <input
                  type="text"
                  placeholder='Enter Your First Name'
                  className=" border-2 rounded-[5px] bg-transparent w-56 h-9 p-4"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="First name" className="font-medium text-lg">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder='Enter Your Last Name'
                  className="border-2 rounded-[5px] bg-transparent w-56 h-9 p-4"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="" className="font-medium text-lg">
                Email
              </label>
              <input
                type="email"
                placeholder='Enter Your Email id'
                className=" border-2 rounded-[5px] bg-transparent w-[476px] h-9 p-4"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor=" " className="font-medium text-lg">
                Number
              </label>
              <input
                type="text"
                placeholder='Enter Your Phone Number'
                className=" border-2 rounded-[5px] bg-transparent w-[476px] h-9 p-4"
              />
            </div>
          </form>
        </div>
        <div>
          <button className="bg-[#3CBDB1CC] text-white font-bold rounded-md px-5 py-3 float-right mt-5">
            Save Changes
          </button>
        </div>
      </div>
    </main>
    </div>
  );
};

export default ProfileForm;
