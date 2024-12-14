import React from 'react'
import BlogItem from './BlogItem'

function BlogList({Blogs, handleViewBlog}) {

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:mx-20 mt-10 overflow-x-auto">
            {Blogs.map((data, index) => (
                <BlogItem key={index} data={data} handleViewBlog={handleViewBlog} />
        ))}
        </div>
    )
}

export default BlogList