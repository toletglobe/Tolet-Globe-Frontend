import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoMdHeart } from "react-icons/io";
const Likes = ({ data }) => {
  const authState = useSelector((state) => state.auth);

  return (
    <div className="flex flex-row gap-1 items-center">
      {!authState && <FaRegHeart />}
      {authState?.userData?.id &&
      data?.likes?.includes(authState.userData.id) ? (
        <IoMdHeart />
      ) : (
        <FaRegHeart />
      )}
      {data?.likes?.length}
    </div>
  );
};

export default Likes;
