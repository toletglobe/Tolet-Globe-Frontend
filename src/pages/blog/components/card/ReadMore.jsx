import React from 'react'
import{ Button }from "../../../../components/index.js";
import {FaLongArrowAltRight} from "react-icons/fa";

const ReadMore = ({data, handleViewBlog}) => {
    return (
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
    )
}

export default ReadMore