import React from "react";

import Img from "./Img";
import BlogBody from "./BlogBody";
import ReadMore from "./ReadMore";
import Author from "./Author";
import Views from "./Views";
import Likes from "./Likes";
// import Date from "./Date";

function BlogItem({ index, data, handleViewBlog }) {
  return (
    <div
      key={index}
      className="text-white rounded-xl h-auto flex flex-col justify-center pb-2 border-b-4 border-stone-500 hover:border-[#6CC1B6]"
    >
      <div className="group">
        <Img data={data} handleViewBlog={handleViewBlog} />
        <div className="p-2">
          <div className="mt-2">
            <span className="text-gray-300 font-semibold">
              {new Date(data?.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              {/* <Date data={data} /> */}
            </span>{" "}
            | <span className="underline">{data?.category}</span>
          </div>
          <BlogBody data={data} handleViewBlog={handleViewBlog} />
          <ReadMore data={data} handleViewBlog={handleViewBlog} />

          {/* Footer Section */}
          <div className="mt-4 flex gap-5 sm:gap-0">
            {/* Author */}
            <Author data={data} />
            {/* Likes and Views */}
            <div className="flex flex-row gap-5 mt-2 ml-auto mr-1">
              <Views data={data} />
              <Likes data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
