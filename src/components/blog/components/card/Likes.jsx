import React from 'react'
import {FaRegHeart} from "react-icons/fa";

const Likes = ({data}) => {
    return (
        <div className="flex flex-row gap-1 items-center">
            <FaRegHeart /> {data?.likes}
        </div>
    )
}

export default Likes