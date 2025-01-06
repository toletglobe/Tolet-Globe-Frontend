import React from 'react';
import BlogItem from './BlogItem';

function BlogList({ Blogs, handleViewBlog }) {
  return (
    <div
      className="grid gap-6
                 xl:grid-cols-3
                 lg:grid-cols-2
                 md:grid-cols-1
                 sm:grid-cols-1
                 grid-cols-1
                 px-4 md:px-20
                 mt-10">
      {Blogs.map((data, index) => (   
        <BlogItem key={index} data={data} handleViewBlog={handleViewBlog}/>
      ))}
    </div>
  );
}

export default BlogList;
