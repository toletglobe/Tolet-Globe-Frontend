import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import LatestTrending from "./components/LatestTrending";
import BlogList from "./components/BlogList";
import Pagination from "../../reusableComponents/Pagination";

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
        setBlogs(allBlogs.data);
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
  };

  const handleClickTrending = () => {
    setSortBy("trending");
    setCurrentPage(1);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }

  return (
    <div className="bg-black my-5">
      <h1 className="text-4xl text-center text-white font-semibold mt-8">
        To-Let Tales
      </h1>
      <h1 className="text-center mt-2 text-[#6CC1B6]">
        Dive into a Sea of Endless Stories and Insights
      </h1>
      <LatestTrending
        isLatest={sortBy === "latest"}
        handleClickTrending={handleClickTrending}
        handleClickLatest={handleClickLatest}
      />

      {error && <div className="text-red-500 text-center">{error}</div>}
      <BlogList Blogs={blogs} handleViewBlog={handleViewBlog} />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Blog;
