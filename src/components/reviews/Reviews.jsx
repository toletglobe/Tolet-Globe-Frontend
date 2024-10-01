import React, { useEffect, useRef, useState, useCallback } from "react";
import starIcon from "../../../public/star.svg";
import starFillIcon from "../../../public/star-fill.svg";
import ReviewDialog from "../ReviewDialog";
import ReviewPagination from "../ReviewPagination";
import { API } from "../../config/axios";
import toast from "react-hot-toast";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Reviews({ reviewData }) {
  const { userData, status } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState([]);
  const [starCount, setStarCount] = useState(0);
  const [reviewInput, setReviewInput] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const reviewRefs = useRef({});
  const optionRef = useRef(null);
  const navigate = useNavigate();

  // Handling comment overflow
  const characterLimit = 360;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleStarCount = (i) => setStarCount(i + 1);

  const handleSubmission = useCallback(async () => {
    if (!status) {
      return navigate("/login");
    }

    const data = {
      user: userData.userId,
      username: userData.username,
      rating: starCount,
      propertyId: "66c842d064795e82824ab45c",
      comment: reviewInput,
    };

    try {
      await API.post("/property/add-review", data);
      toast.success("Review submitted");
      setReviewInput("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error in sending review: ", err);
      toast.error("Couldn't submit the review");
    }
  }, [status, userData, starCount, reviewInput, navigate]);

  // Pagination details
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const [isExpanded, setIsExpanded] = useState([]);

  // Toggle readmore section
  const toggleReadmore = (index) => {
    setIsExpanded((prev) => {
      const expanded = [...prev];
      expanded[index] = !expanded[index];
      return expanded;
    });
  };

  // Toggle option menu
  const toggleOption = (index) => {
    setIsOptionOpen((prev) => {
      const open = [...prev];
      open[index] = !open[index];
      return open;
    });
  };

  const deleteReview = async (id) => {
    try {
      await API.delete(`/property/reviews/${id}`);
      toast.success("Review deleted");
    } catch (err) {
      console.error("Error in deleting review: ", err);
      toast.error("Couldn't delete review");
    }
  };

  // Calculate average rating on review change
  useEffect(() => {
    const calculateAverageRating = (reviews) => {
      if (reviews.length === 0) return 0;
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      return (totalRating / reviews.length).toFixed(1);
    };

    setAverageRating(parseFloat(calculateAverageRating(reviews)));
  }, [reviews]);

  // Update review state
  useEffect(() => {
    setReviews(reviewData);
  }, [reviewData]);

  // Handle click outside event
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setIsOptionOpen([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-fit flex justify-center items-center font-poppins mb-5">
      <div className="bg-white relative rounded-md w-full h-full flex flex-col items-start p-3">
        <h2 className="font-poppins font-semibold text-xl">Reviews</h2>
        <div className="flex sm:flex-row flex-col sm:justify-between items-center w-full sm:h-[160px] h-fit my-4">
          <div className="sm:w-1/4 w-full h-full border rounded-md flex flex-col sm:p-8 p-3 items-center">
            <div className="w-full flex items-center">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={index < averageRating.toFixed(0) ? starFillIcon : starIcon}
                  alt="star-icon"
                  className="w-8 h-8 mx-2 cursor-pointer"
                />
              ))}
            </div>
            <div className="w-full py-6 flex justify-start pl-2">
              <p className="text-[#0f0f0f] font-poppins font-semibold text-lg">
                {averageRating.toFixed(1)} Out of 5
              </p>
            </div>
          </div>
          <div className="sm:w-3/4 w-full sm:h-full h-fit sm:my-0 my-4 sm:py-0 py-4 border rounded-md sm:ml-6 flex sm:flex-row flex-col justify-around items-center sm:px-10 px-4">
            <div className="flex flex-col justify-center items-start">
              <p className="mx-2 pb-3 font-poppins text-[16px] text-center">
                Rate this property based on <br /> your Experience.
              </p>
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, index) => (
                  <img
                    key={index}
                    src={index < starCount ? starFillIcon : starIcon}
                    alt="star-icon"
                    className="w-8 h-8 mx-2 cursor-pointer"
                    onClick={() => handleStarCount(index)}
                  />
                ))}
              </div>
            </div>
            <div className="sm:w-3/6 w-full sm:py-0 py-6 flex flex-col justify-center sm:items-start items-center">
              <p className="pb-3 font-poppins text-[16px] text-center ">
                Share details of your experience with this property.
              </p>
              <button
                className="w-full bg-[#40B5A8] text-black rounded-md p-2 font-poppins"
                onClick={handleOpenModal}
              >
                Write a review
              </button>
              {/* Review Dialog */}
              <ReviewDialog isOpen={isModalOpen} onClose={handleCloseModal}>
                <p className="py-2">Share your Experience</p>
                <textarea
                  placeholder="Leave your experience"
                  maxLength={150}
                  className="w-full border border-black bg-white rounded-lg p-4 min-h-20 outline-none text-sm"
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                ></textarea>
                <div className="w-full flex justify-end items-center py-4">
                  <button
                    type="submit"
                    onClick={handleSubmission}
                    className="bg-[#40B5A8] px-8 py-1 text-white rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </ReviewDialog>
            </div>
          </div>
        </div>
        {/* Reviews Section */}
        <div className="w-full h-fit flex flex-col justify-between">
          {currentReviews.map((review) => (
            <div
              key={review._id}
              className="w-full border rounded-lg p-4 my-3 flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img
                    src={starFillIcon}
                    alt="star-icon"
                    className="w-6 h-6"
                  />
                  <p className="font-poppins font-semibold ml-2 text-lg">
                    {review.username}
                  </p>
                </div>
                <p className="font-poppins text-[14px]">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p
                className={`font-poppins text-base ${
                  review.comment.length > characterLimit && !isExpanded[review._id]
                    ? "line-clamp-2"
                    : ""
                }`}
              >
                {review.comment.length > characterLimit
                  ? review.comment.substring(0, characterLimit) + "..."
                  : review.comment}
              </p>
              {review.comment.length > characterLimit && (
                <button
                  onClick={() => toggleReadmore(review._id)}
                  className="text-[#40B5A8] font-poppins underline text-sm mt-2"
                >
                  {isExpanded[review._id] ? "Read Less" : "Read More"}
                </button>
              )}
              <div className="relative flex justify-end mt-4">
                <button
                  ref={optionRef}
                  onClick={() => toggleOption(review._id)}
                  className="w-5 h-5"
                >
                  <EllipsisVerticalIcon className="w-full h-full text-gray-400" />
                </button>
                {isOptionOpen[review._id] && (
                  <div className="absolute right-0 top-0 bg-white border rounded-md shadow-lg z-10">
                    <button
                      onClick={() => deleteReview(review._id)}
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                    >
                      <TrashIcon className="w-5 h-5 text-red-600" />
                      <span className="ml-2">Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* Review Pagination */}
          <ReviewPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Reviews;
