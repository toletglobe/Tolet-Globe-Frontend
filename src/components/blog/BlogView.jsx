import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Service from "../../config/config"; // Adjust the import path accordingly
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const BlogView = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await Service.fetchBlogById(id); // Fetch the blog details
        setBlog(blogData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="bg-black text-white my-5 md:my-10 px-10">
      <div className="mb-4 md:mx-16">
        <p className="text-gray-400">
          {new Date(blog.date).toDateString()} | <span>{blog.category}</span>
        </p>
        <h1 className="text-6xl my-2 text-[#6CC1B6]">{blog.title}</h1>
        <div className="flex flex-col justify-start my-5">
          <div className="text-white">{blog.author}</div>
          <div className="text-gray-300 text-xs">{blog.role}</div>
        </div>
        <hr />
        <div className="text-white flex gap-3 my-2">
          <div className="flex items-center gap-1">
            <FaRegHeart />
            {blog.likes}
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineRemoveRedEye />
            {blog.views}
          </div>
        </div>
        <hr />
        <div className=" mx-2 my-3">
          <img
            src={blog.image}
            alt={blog.title}
            className="rounded-md w-full h-[50vh] object-cover"
          />
        </div>

        <div className="">
          <div
            className="my-5 text-xl"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </div>
        <br />
        <hr />
      </div>
      {/* Assuming `content` contains HTML formatted string */}
    </div>
  );
};

export default BlogView;
