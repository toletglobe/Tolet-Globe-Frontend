// import { BlogPage } from "../SampleData"
import { useEffect, useState } from "react";
import Service from "../../config/config";
import {Button} from "../index"
import { FaLongArrowAltRight, FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await Service.fetchblog();
        setBlogs(blogData);
        console.log(blogData);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    fetchBlog();
  }, []);

  const handleViewBlog =async (blogId)=>{
    try {
      const blogData = await Service.fetchBlogById(blogId);
      console.log(blogData)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return (
    <div className="bg-black my-5">
      <h1 className="text-4xl text-center text-white font-semibold mt-4">
        To-Let Tales
      </h1>
      <h1 className="text-center mt-2 text-[#6CC1B6]">
        Dive into a Sea of Endless Stories and Insights
      </h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:mx-20 mt-10 overflow-x-auto">
        {blogs?.map((data, index) => (
          <div
            key={index}
            className=" text-white rounded-xl m-5 h-fit flex flex-col justify-center pb-2 border-b-4 border-stone-500 hover:border-[#6CC1B6]"
          >
            <div className="">
              <div className="w-full ">
                <img
                  src={data?.image}
                  alt="image1"
                  className="rounded-md w-full h-60 fit"
                />
              </div>
              <div className="p-2">

              <div className="mt-2">
                <span className="text-gray-300 font-semibold">
                  {new Date(data?.date).toDateString()}
                </span>{" "}
                | {data?.category}
              </div>
              <div className="mt-2">
                <h1 className="text-lg font-semibold text-[#6CC1B6]">
                  {data?.title.length > 40
                    ? `${data.title.slice(0, 40)}...`
                    : data.title}
                </h1>
                <p className="text-base text-gray-400 mt-2">
                  {data?.intro.length > 100
                    ? `${data.intro.slice(0, 100)}...`
                    : data.intro}
                </p>
              </div>
              <div className="flex flex-row items-center gap-2 ">
                <Button className="text-[#6CC1B6]"
                onClick={()=>{
                  handleViewBlog(data._id)
                }}
                >

                Read More <FaLongArrowAltRight />
                </Button>
              </div>
              <div className="mt-2 flex justify-between items-center
              ">
                <div className="flex flex-col">
                  <div>{data?.author}</div>
                  <div className="text-xs text-gray-500">{data?.role}</div>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-row gap-1 items-center"><FaRegHeart/> {data?.likes}</div>
                  <div className="flex flex-row gap-1 items-center"><MdOutlineRemoveRedEye />{data?.views}</div>
                </div>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
