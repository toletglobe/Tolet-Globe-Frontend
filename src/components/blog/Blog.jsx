import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../../config/config";
import { Button } from "../index";
import { FaLongArrowAltRight, FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6); // Number of blogs per page
  const [totalBlogs, setTotalBlogs] = useState(0);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const allBlogs = await Service.fetchBlog();
        const sortedBlogs = allBlogs.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setBlogs(sortedBlogs);
        setTotalBlogs(sortedBlogs.length);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    fetchBlog();
  }, []);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  const handleViewBlog = (blogId) => {
    navigate(`/blog/${blogId}`); // Navigate to the detailed blog view page
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="bg-black my-5">
      <h1 className="text-4xl text-center text-white font-semibold mt-4">
        To-Let Tales
      </h1>
      <h1 className="text-center mt-2 text-[#6CC1B6]">
        Dive into a Sea of Endless Stories and Insights
      </h1>
      <div className="my-8 flex justify-center">
        <div className="bg-white/20 p-3 text-white rounded-lg flex flex-row gap-5">
          <button>Latest</button>
          <button>Trending</button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:mx-20 mt-10 overflow-x-auto">
        {currentBlogs.map((data, index) => (
          <div
            key={index}
            className="text-white rounded-xl m-5 h-fit flex flex-col justify-center pb-2 border-b-4 border-stone-500 hover:border-[#6CC1B6]"
          >
            <div className="">
              <div className="w-full ">
                <img
                  onClick={() => handleViewBlog(data._id)}
                  src={data?.image}
                  alt="image1"
                  className="cursor-pointer rounded-md w-full h-60 object-cover"
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
                  <Button
                    className="text-[#6CC1B6]"
                    onClick={() => handleViewBlog(data._id)}
                  >
                    Read More <FaLongArrowAltRight />
                  </Button>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex flex-col">
                    <div>{data?.author}</div>
                    <div className="text-xs text-gray-500">{data?.role}</div>
                  </div>
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-row gap-1 items-center">
                      <FaRegHeart /> {data?.likes}
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                      <MdOutlineRemoveRedEye /> {data?.views}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5 mx-20">
        <div className="bg-white/20 rounded-md px-2 py-1 flex justify-between gap-3">
          <div>
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`text-gray-400 hover:text-[#6CC1B6] rounded-lg px-5 `}
            >
              Previous
            </Button>
          </div>
          <div>
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <div>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`text-gray-400 hover:text-[#6CC1B6] rounded-lg px-5 `}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
