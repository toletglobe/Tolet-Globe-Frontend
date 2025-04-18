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

  const navigate = useNavigate(); // Use useNavigate for navigation
  const [isLatest, setIsLatest] = useState(true);
  // const [backendData, setBackendData] = useState([]); // Store the original data from backend
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const fetchBlog = async () => {
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
        setBlogs(allBlogs.data); // Store the fetched data in backendData
        setTotalPages(allBlogs?.totalPages);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchBlog();
  }, [currentPage, sortBy]);

  const handleClickLatest = () => {
    setSortBy("latest");
    setIsLatest(true);
    setCurrentPage(1); // Reset to first page
  };

  const handleClickTrending = () => {
    setSortBy("trending");
    setIsLatest(false);
    setCurrentPage(1); // Reset to first page
  };

  const handleViewBlog = async (slug) => {
    try {
      const response = await API.get(`blog/updateViews/${slug}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
    navigate(`/blog/${slug}`);
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
      <h1 className="text-4xl text-center text-white font-semibold mt-8">
        To-Let Tales
      </h1>
      <h1 className="text-center mt-2 text-[#6CC1B6]">
        Dive into a Sea of Endless Stories and Insights
      </h1>
      <LatestTrending
        isLatest={isLatest}
        handleClickLatest={handleClickLatest}
        handleClickTrending={handleClickTrending}
      />
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
