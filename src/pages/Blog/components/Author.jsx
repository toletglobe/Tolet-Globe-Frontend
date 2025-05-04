import React from "react";

import author from "../../../assets/propertyListing/author.jpg";

const Author = ({ data }) => {
  return (
    <div className="flex">
      <figure className="author-avatar w-10 h-10 overflow-hidden rounded-full mr-4">
        <img src={author} alt="" />
      </figure>
      <div className="flex flex-col">
        <div>{data?.author}</div>
        <div className="text-xs text-gray-500">{data?.role}</div>
      </div>
    </div>
  );
};

export default Author;
