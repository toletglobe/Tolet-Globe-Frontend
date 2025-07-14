import React from 'react'

const BlogBody = ({data, handleViewBlog}) => {
    return (
        <div className="mt-2 group">
            <button
                className="text-2xl font-semibold text-left text-[#6CC1B6] min-h-16 align-t group-hover:underline  sm:group-hover:underline"
                onClick={() => handleViewBlog(data.slug)}
            >
                {data?.title.length > 45
                    ? `${data.title.slice(0, 45)}...`
                    : data.title}
            </button>
            <p className="text-base text-grey-400 my-4 text-justify min-h-20">
                {data?.intro.length > 100
                    ? `${data.intro.slice(0, 100)}...`
                    : data.intro}
            </p>
        </div>
    )
}

export default BlogBody;