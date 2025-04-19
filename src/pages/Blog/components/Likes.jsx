import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import toast from "react-hot-toast";

import { jwtDecode } from "jwt-decode";

import { API } from "../../../config/axios";

const Likes = ({ data }) => {
  const [adata, setadata] = useState(null);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const updateLike = async () => {
    try {
      if (!authState.status) {
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }

      const isTokenExpired = (token) => {
        if (!token) return true;
        try {
          const decodeToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          return decodeToken.exp < currentTime;
        } catch (error) {
          console.error("Error decoding token: ", error);
          return true;
        }
      };

      const token = localStorage.getItem("token");

      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }
      const updateddata = await API.get(`blog/updateLikes/${data.slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(updateddata);
      setadata(updateddata.data.updatedBlog);

      data.likes = updateddata.data.updatedBlog.likes;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row gap-1 items-center" onClick={updateLike}>
      {!authState && <FaRegHeart />}
      {authState?.status &&
      authState?.userData?.id &&
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
