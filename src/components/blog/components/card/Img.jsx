import React from 'react'

function Img({data, handleViewBlog}) {
    return (
        <div className="w-full ">
            <img
                onClick={() => handleViewBlog(data.slug)}
                src={data?.image}
                alt="image1"
                className="cursor-pointer rounded-md w-full h-60 object-cover"
            />
        </div>
    )
}

export default Img