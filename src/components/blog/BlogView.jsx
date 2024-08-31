import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Service from "../../config/config"; // Adjust the import path accordingly
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import author from "../../assets/property/author.jpg";

const BlogView = () => {
  const { slug } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await Service.fetchBlogBySlug(slug); // Fetch the blog details
        setBlog(blogData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, []);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="bg-black text-white my-5 md:my-10 px-10">
      <div className="mb-4 md:mx-16">
        <p className="text-gray-400">
          {new Date(blog.date).toDateString()} |{" "}
          <span className="underline">{blog.category}</span>
        </p>
        <h1 className="text-4xl my-2 text-[#6CC1B6] font-bold">{blog.title}</h1>
        <div className="flex my-6">
          <figure className="author-avatar w-10 h-10 overflow-hidden rounded-full mr-4">
            <img src={author} alt="Author" />
          </figure>
          <div className="flex flex-col justify-start">
            <div className="text-white">{blog.author}</div>
            <div className="text-gray-300 text-xs">{blog.role}</div>
          </div>
        </div>
        <hr />
        <div className="flex justify-between">
          <div className="text-white flex gap-3 my-2">
            <div className="flex items-center gap-1">
              <MdOutlineRemoveRedEye />
              {blog.views}
            </div>
            <div className="flex items-center gap-1">
              <FaRegHeart />
              {blog.likes}
            </div>
          </div>
          <div className="text-gray-400 underline flex items-center">
            {"6 min read"}
          </div>
        </div>
        <hr />
        <div className="my-2 font-semibold">{blog.intro}</div>

        <div className=" mx-2 my-3">
          <img
            src={blog.image}
            alt={blog.title}
            className="rounded-md w-full h-full object-cover"
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
    </div>
  );
};

export default BlogView;
