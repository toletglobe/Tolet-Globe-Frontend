import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import author from "../../assets/propertyListing/author.jpg";

import { API } from "../../config/axios";

const BlogView = () => {
  const { slug } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await API.get(`blog/blogs/${slug}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const blogData = response.data;
        setBlog(blogData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, []);

  const updateLike = async () => {
    try {
      if (!authState.status) {
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }

      const { data } = await API.get(`blog/updateLikes/${blog.slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlog(data.updatedBlog);
    } catch (error) {
      console.log(error);
    }
  };

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }

  return (
    <div className="bg-black text-white my-5 md:my-10 px-10">
      <div className="mb-4">
        <p className="text-gray-400">
          {new Date(blog.date).toDateString()} |{" "}
          <span className="underline">{blog.category}</span>
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl my-2 text-[#6CC1B6] font-bold">{blog.title}</h1>
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
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={updateLike}
            >
              {!authState && <FaRegHeart />}
              {blog.likes.includes(authState.userData.id) &&
              authState.status ? (
                <IoMdHeart />
              ) : (
                <FaRegHeart />
              )}
              {blog.likes.length}
            </div>
          </div>
        </div>
        <hr />
        <div className="my-2 text-base sm:text-lg md:text-xl leading-relaxed">{blog.intro}</div>

        <div className="mx-auto my-4 max-w-3xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="rounded-md w-full h-96 max-h-full object-cover filter brightness-120"
          />
        </div>

        <div className="">
          <div
            className="my-5 text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose"
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