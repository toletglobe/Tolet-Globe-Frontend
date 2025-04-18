import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Views = ({ data }) => {
  return (
    <div className="flex flex-row gap-1 items-center">
      <MdOutlineRemoveRedEye /> {data?.views}
    </div>
  );
};

export default Views;
