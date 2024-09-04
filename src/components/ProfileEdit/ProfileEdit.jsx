import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';



export default function ProfileEdit() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  const [profilePic, setProfilePic] = useState(null);
   

  // demo data for charts
  const data = [
    { name: 'Jan', bookings: 30 },
    { name: 'Feb', bookings: 50 },
    { name: 'Mar', bookings: 20 },
    { name: 'Apr', bookings: 40 },
    { name: 'May', bookings: 70 },
    { name: 'Jun', bookings: 60 },
  ];


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  

  return (
    <div className="w-full ">

      <header className=" mx-5 flex justify-between items-center py-4 border-b">
      <div className="flex items-center">
      {/* <div className="w-10 h-10 bg-gray-300 rounded-full"></div> */}

      <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-400 ">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  {/* No Image */}
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
          </div>
        <h1 className=" ml-4 text-3xl font-semibold">Edit Profile</h1>
        </div>
        
        <nav className=" pr-4 flex items-center gap-10">
          <a href="#" className=" ">Home</a>
          <a href="#" className=" ">My Properties</a>
          <a href="#" className=" ">Settings</a>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search in site"
              className="p-2 pl-2 border rounded-lg w-full"
            />
            <FaSearch className="absolute right-2 top-2.5 text-gray-500" />
          </div>
        </nav>
        
      </header>
      

      <div className="w-full bg-[rgba(0,0,0,0.6)] py-12 px-36 flex justify-between items-center">
        <div className="flex items-center">
          {/* <div className="w-24 h-24 bg-gray-400 rounded-full">

          </div> */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-400 ">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  {/* No Image */}
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
          </div>
          <div className="ml-10">
            <h2 className="text-2xl text-white my-3 font-bold">John Doe</h2>
            <span className=" bg-gray-400 px-2 py-1 my-3 ">Superhost</span>
            <p className=" text-white my-3">Manage your profile details here</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button className="px-14 py-3  text-white border-2 border-white rounded-lg hover:bg-gray-400">Save</button>
          <button className="px-14 py-3 bg-black text-white rounded-lg hover:bg-gray-800">Edit</button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="m-14 space-y-6 mx-auto max-w-5xl">
        <div className="flex justify-between items-center">
          <div>
          <h3 className="text-4xl font-bold">Edit Profile Information</h3>
          <p className=" mt-5">Update your personal information</p>
          </div>
          {/* <div className="w-36 h-36 bg-gray-200 ">
          

          </div> */}
          <div className="relative">
          <div className="w-36 h-36 bg-gray-200 ">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  {/* No Image */}
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        
        
        
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-gray-700 font-semibold">Full Name</label>
            <input
              {...register('fullName')}
              className="w-full p-2 mt-1 border rounded"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full p-2 mt-1 border rounded"
              placeholder="Enter your email address"
            />
          </div>
          <div>
  <label className="block text-gray-700 font-semibold">Gender</label>
  <div className="flex gap-4 mt-2">
    <label className="flex items-center bg-gray-100 p-2 rounded">
      <input
        {...register('gender')}
        type="radio"
        value="Male"
        className="hidden"
      />
      <span className="text-gray-800">Male</span>
    </label>
    <label className="flex items-center bg-gray-100 p-2 rounded">
      <input
        {...register('gender')}
        type="radio"
        value="Female"
        className="hidden"
      />
      <span className="text-gray-800">Female</span>
    </label>
    <label className="flex items-center bg-gray-100 p-2 rounded">
      <input
        {...register('gender')}
        type="radio"
        value="Other"
        className="hidden"
      />
      <span className="text-gray-800">Other</span>
    </label>
  </div>
</div>

          <div>
            <label className="block text-gray-700 font-semibold">Phone Number</label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full p-2 mt-1 border rounded"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Country</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center bg-gray-100 p-2 rounded">
                <input
                  {...register('country')}
                  type="radio"
                  value="USA"
                  className="hidden"
                />
                 <span className="text-gray-800">USA</span>
              </label>
              <label className="flex items-center bg-gray-100 p-2 rounded">
                <input
                  {...register('country')}
                  type="radio"
                  value="Canada"
                  className="hidden"
                />
                 <span className="text-gray-800">Canada</span>
              </label>
              <label className="flex items-center bg-gray-100 p-2 rounded">
                <input
                  {...register('country')}
                  type="radio"
                  value="UK"
                  className="hidden"
                />
                 <span className="text-gray-800">India</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button type="submit" className="px-11 py-2 bg-black text-white rounded-md hover:bg-gray-800">
            Save Changes
          </button>
        </div>
      </form>
      

      <div className="m-20 text-center mx-auto max-w-5xl">
        <h3 className="text-3xl font-bold text-black">My Properties</h3>
        <button className="mt-6 px-10 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Add New Property
        </button>
        <div className="flex gap-6 mt-12 justify-center">
          <div className="w-1/3   text-center">
            <div className="w-16 h-16 mx-auto bg-gray-300 rounded-full mb-4">
              {/* image  */}
            </div>
            <h4 className="font-semibold">Apartment A</h4>
            <p className="text-gray-600 text-sm">2 Bedrooms, 1 Bath</p>
            <p className=" mt-3 text-xl font-semibold">In Progress</p>
          </div>
          <div className="w-1/3  text-center">
            <div className="w-16 h-16 mx-auto bg-gray-300 rounded-full mb-4">
              {/* image  */}
            </div>
            <h4 className="font-semibold">House B</h4>
            <p className="text-gray-600 text-sm">3 Bedrooms, 2 Baths</p>
            <p className="mt-3 text-xl font-semibold">Available</p>
          </div>
          <div className="w-1/3 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-300 rounded-full mb-4">
              {/* image  */}
            </div>
            <h4 className="font-semibold">Commercial Space</h4>
            <p className="text-gray-600 text-sm">Office Space</p>
            <p className="mt-3 text-xl font-semibold">Rented</p>
          </div>
        </div>
      </div>

      <div className="m-14 mx-auto max-w-5xl">
        <h3 className="text-3xl font-bold text-black text-center">Performance Metrics</h3>
        <p className="text-sm  mt-2 text-center">View your profile performance data</p>
        <button className="block mx-auto mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800">
          View Details
        </button>
        <div className="flex gap-8 mt-6">
          <div className="w-1/3  p-4 border-2 border-gray-200 rounded-lg">
            <h4 className="text-lg text-gray-500 ">Bookings</h4>
            <p className="text-2xl font-bold mt-2">35</p>
            <p className="">+10%</p>
          </div>
          <div className="w-1/3  p-4 border-2 border-gray-200 rounded-lg">
            <h4 className="text-lg text-gray-500 ">Revenue</h4>
            <p className="text-2xl font-bold mt-2">Rs.5000</p>
            <p className="">-5%</p>
          </div>
          <div className="w-1/3  p-4 border-2 border-gray-200 rounded-lg">
            <h4 className="text-lg text-gray-500 ">Rating</h4>
            <p className="text-2xl font-bold mt-2">4.8</p>
          </div>
        </div>
      </div>
      <div className="mt-10 mx-auto max-w-5xl">
  <h3 className="text-xl font-semibold">Booking Trends</h3>
  <p className="text-gray-500 text-sm">Bookings</p>
  <div className="mt-4 relative">
  <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
    <p className="text-gray-500 text-sm absolute bottom-0 right-0 pr-4">Months</p>
  </div>
</div>




      <footer className="m-10 text-center text-gray-600">
        © 2022 Rental Properties Inc. All Rights Reserved
      </footer>
    </div>
  );
}

