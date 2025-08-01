import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import LatestTrending from "./components/LatestTrending";
import BlogList from "./components/BlogList";

import { API } from "../../config/axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(9);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("trending"); // Set default to "trending"
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await API.get(
          `blog/blogs?page=${currentPage}&limit=${blogsPerPage}&sortBy=${sortBy}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const allBlogs = response.data;
        // setBlogs((prevBlogs) => [...prevBlogs, ...allBlogs.data]); // Append new blogs to the existing list
        setBlogs((prevBlogs) => {
          const existingSlugs = new Set(prevBlogs.map((blog) => blog.slug));
          const newUniqueBlogs = allBlogs.data.filter((blog) => !existingSlugs.has(blog.slug));
          return [...prevBlogs, ...newUniqueBlogs];
        });
        setTotalPages(allBlogs?.totalPages);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [currentPage, sortBy]);

  const handleClickLatest = () => {
    setSortBy("latest");
    setCurrentPage(1);
    setBlogs([]); // Reset blogs when sorting changes
  };

  const handleClickTrending = () => {
    setSortBy("trending");
    setCurrentPage(1);
    setBlogs([]); // Reset blogs when sorting changes
  };

  const handleViewBlog = async (slug) => {
    try {
      await API.get(`blog/updateViews/${slug}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate(`/blog/${slug}`);
    } catch (error) {
      console.error(error);
      setError("Failed to update views. Please try again later.");
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const remainingBlogsCount = totalPages && (totalPages - currentPage) * blogsPerPage;

  if (loading && currentPage === 1) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }

  return (
    <div className="bg-black py-5 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-4xl text-center text-white font-semibold mt-4 sm:mt-8">
        To-Let Tales
      </h1>
      <h1 className="text-center mt-1 sm:mt-2 text-sm sm:text-base text-[#6CC1B6]">
        Dive into a Sea of Endless Stories and Insights
      </h1>
      <div className="max-w-6xl mx-auto"></div>
      <LatestTrending
        isLatest={sortBy === "latest"}
        handleClickTrending={handleClickTrending}
        handleClickLatest={handleClickLatest}
      />

      {error && <div className="text-red-500 text-center">{error}</div>}
      <BlogList Blogs={blogs} handleViewBlog={handleViewBlog} />

      {loading && <div className="flex justify-center my-4"><ClipLoader color="#6CC1B6" size={50} /></div>}

      {currentPage < totalPages && !loading && (
        <div className="flex flex-col items-center my-4">
          <button
            onClick={handleLoadMore}
            className="bg-[#212629] px-6 py-2 rounded-md text-lg font-medium text-gray-400 active:bg-[#5edbd3] transition active:text-gray-900"
          >
            Load More ({remainingBlogsCount})
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;