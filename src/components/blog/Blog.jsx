import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../../config/config";
import { Button } from "../index";
import {
  FaLongArrowAltRight,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import author from "../../assets/property/author.jpg";
import { ClipLoader } from "react-spinners";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [isLatest, setIsLatest] = useState(true);
  const [backendData, setBackendData] = useState([]); // Store the original data from backend
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const allBlogs = await Service.fetchBlog();
        setBackendData(allBlogs); // Store the fetched data in backendData

        // By default, sort by latest
        const sortedBlogs = allBlogs.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setBlogs(sortedBlogs);

        setTotalBlogs(sortedBlogs.length); // Set the total number of blogs
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchBlog();
  }, []);

  const handleClickLatest = () => {
    const sortedBlogs = backendData.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setBlogs(sortedBlogs);
    setIsLatest(true);
    setCurrentPage(1); // Reset to first page
  };

  const handleClickTrending = () => {
    const trendingBlogs = backendData.sort((a, b) => {
      const sumA = a.views + a.likes;
      const sumB = b.views + b.likes;
      return sumB - sumA;
    });
    setBlogs(trendingBlogs);
    setIsLatest(false);
    setCurrentPage(1); // Reset to first page
  };

  // Pagination logic

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  const handleViewBlog = (slug) => {
    navigate(`/blog/${slug}`);
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

  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} /> {/* Spinner component */}
      </div>
    );
  }

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
          <button
            onClick={handleClickLatest}
            className={`${isLatest ? "text-[#6CC1B6]" : "text-white"}`}
          >
            Latest
          </button>
          <button
            onClick={handleClickTrending}
            className={`${!isLatest ? "text-[#6CC1B6]" : "text-white"}`}
          >
            Trending
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:mx-16 mt-10 overflow-x-auto">
        {currentBlogs.map((data, index) => (
          <div
            key={index}
            className="text-white rounded-xl m-5 h-fit flex flex-col justify-center pb-2 border-b-4 border-stone-500 hover:border-[#6CC1B6]"
          >
            <div className="">
              <div className="w-full ">
                <img
                  onClick={() => handleViewBlog(data.slug)}
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
                  | <span className="underline">{data?.category}</span>
                </div>
                <div className="mt-2">
                  <button
                    className="text-2xl font-semibold text-left text-[#6CC1B6]"
                    onClick={() => handleViewBlog(data.slug)}
                  >
                    {data?.title.length > 35
                      ? `${data.title.slice(0, 35)}...`
                      : data.title}
                  </button>
                  <p className="text-base text-gray-400 my-4">
                    {data?.intro.length > 100
                      ? `${data.intro.slice(0, 100)}...`
                      : data.intro}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2 ">
                  <Button
                    className="text-[#6CC1B6]"
                    onClick={() => handleViewBlog(data.slug)}
                  >
                    Read More
                  </Button>
                  <Button
                    className="text-[#6CC1B6]"
                    onClick={() => handleViewBlog(data.slug)}
                  >
                    <FaLongArrowAltRight />
                  </Button>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex">
                    <figure className="author-avatar w-10 h-10 overflow-hidden rounded-full mr-4">
                      <img src={author} alt="" />
                    </figure>
                    <div className="flex flex-col">
                      <div>{data?.author}</div>
                      <div className="text-xs text-gray-500">{data?.role}</div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-row gap-1 items-center">
                      <MdOutlineRemoveRedEye /> {data?.views}
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                      <FaRegHeart /> {data?.likes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5 mx-auto">
        <div className="bg-white/20 rounded-md px-2 py-1 flex justify-center gap-3">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="hover:text-[#6CC1B6] rounded-lg  flex items-center"
          >
            <FaChevronLeft className="mr-2" /> Previous
          </Button>
          <div className="flex items-center space-x-2">
            {currentPage > 2 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="px-2 py-1 rounded-lg  hover:text-[#6CC1B6]"
                >
                  1
                </button>
                {currentPage > 3 && <span className="px-2">...</span>}
              </>
            )}
            {currentPage > 1 && (
              <button
                onClick={() => onPageChange(currentPage - 1)}
                className="px-2 py-1 rounded-lg  hover:text-[#6CC1B6]"
              >
                {currentPage - 1}
              </button>
            )}
            <button
              className="px-2 py-1 rounded-lg text-[#6CC1B6] underline"
              aria-current="page"
            >
              {currentPage}
            </button>
            {currentPage < totalPages && (
              <button
                onClick={() => onPageChange(currentPage + 1)}
                className="px-2 py-1 rounded-lg hover:text-[#6CC1B6]"
              >
                {currentPage + 1}
              </button>
            )}
            {currentPage < totalPages - 1 && (
              <>
                {currentPage < totalPages - 2 && (
                  <span className="px-2">...</span>
                )}
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="px-2 py-1 rounded-lg hover:text-[#6CC1B6]"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          <div className="flex gap-1">
            <span className="pt-0.5">|</span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="hover:text-[#6CC1B6] rounded-lg flex items-center"
            >
              Next <FaChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
