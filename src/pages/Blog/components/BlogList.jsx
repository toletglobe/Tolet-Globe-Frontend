import React from "react";
import BlogItem from "./BlogItem";

function BlogList({ Blogs, handleViewBlog }) {
  return (
    <div className="grid gap-6 px-4 sm:px-6  md:px-10 mt-6 sm:mt-10 grid-cols-1  lg:grid-cols-2 xl:grid-cols-3">
      {Blogs.map((data, index) => (
        <BlogItem key={index} data={data} handleViewBlog={handleViewBlog} />
      ))}
    </div>
  );
}

export default BlogList;
