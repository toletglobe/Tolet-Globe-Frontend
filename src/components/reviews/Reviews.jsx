import React, { useEffect, useRef, useState } from "react";
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
  const authState = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState([]);
  const [starCount, setStarCount] = useState(0);
  const [reviewInput, setReviewInput] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const reviewRefs = useRef({});
  const optionRef = useRef(null);
  const navigate = useNavigate();

  // for handling comment overflow
  const characterLimit = 360;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStarCount = (i) => {
    setStarCount(i + 1);
  };

  const handleSubmission = async () => {
    try {
      // if no user loggedin
      if (authState.status === false) {
        return navigate("/login");
      }

      const data = {
        user: authState.userData.userId,
        username: authState.userData.username,
        rating: starCount,
        propertyId: "66c842d064795e82824ab45c",
        comment: reviewInput,
      };
      const res = await API.post("/property/add-review", data);
      toast.success("Review submitted");
      setReviewInput("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error in sending review: ", err);
      toast.error("Couldn't submit the review");
    }
  };

  // pagination details
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const currentReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const [isExpanded, setIsExpanded] = useState([]);

  // toggle readmore section
  const toggleReadmore = (index) => {
    setIsExpanded((prev) => {
      const expanded = [...prev];
      expanded[index] = !expanded[index];
      return expanded;
    });
  };
// toggle option menu
  const toggleOption = (index) => {
    setIsOptionOpen((prev) => {
      const open = [...prev];
      open[index] = !open[index];
      return open;
    });
  };

  const deleteReview = async (id) => {
    try {
      const res = await API.delete(`/property/reviews/${id}`);
      toast.success("Review deleted");
    } catch (err) {
      console.error("Error in deleting review: ", err);
      toast.error("Couldn't delete review");
    }
  };

  // calculate average rating on review change
  useEffect(() => {
    const calculateAverageRating = (reviews) => {
      if (reviews.length === 0) return 0;

      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const average = totalRating / reviews.length;
      return average.toFixed(1);
    };

    setAverageRating(parseFloat(calculateAverageRating(reviews)));
  }, [reviews]);

  // for updating review state
  useEffect(() => {
    setReviews(reviewData);
  }, [reviewData]);

  // for handling click outside event
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setIsOptionOpen([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionRef]);

  return (
    <div className="w-full h-fit flex justify-center items-center font-poppins mb-5">
      <div className="bg-white relative rounded-md w-full h-full flex flex-col items-start p-3">
        <p className="font-poppins font-semibold text-xl">Reviews</p>
        <div className="flex sm:flex-row flex-col sm:justify-between items-center w-full sm:h-[160px] h-fit my-4">
          <div className="sm:w-1/4 w-full h-full border-[1px] border-[#0f0f0f] rounded-md flex flex-col sm:p-8 p-3 items-center">
            <div className="w-full flex items-center">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={
                    index < averageRating.toFixed(0) ? starFillIcon : starIcon
                  }
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
          <div className="sm:w-3/4 w-full sm:h-full h-fit sm:my-0 my-4  sm:py-0 py-4  border-[1px] border-[#0f0f0f] sm:ml-6 rounded-md flex sm:flex-row flex-col justify-around items-center sm:px-10 px-4">
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
                write a review
              </button>
              {/* review Dialog */}
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
        {/* reviews section */}
        <div className="w-full  h-fit flex flex-col justify-between">
          {currentReviews.map((review, index) => {
            return (
              <div
                key={index}
                className="w-full h-fit flex flex-col p-3  border border-[#0f0f0f] rounded-md my-3"
              >
                <div className="flex w-full justify-between items-start">
                  <div className="flex items-center">
                    <p className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-400">
                      {review.username.charAt(0)}
                    </p>
                    <div className="flex flex-col mx-4 items-start justify-center h-full">
                      <p className="text-lg mx-2 font-semibold text-[#0f0f0f]">
                        {review.username}
                      </p>
                      <div className="flex items-center justify-center py-1">
                        {[...Array(5)].map((_, index) => (
                          <img
                            key={index}
                            src={
                              index < review.rating ? starFillIcon : starIcon
                            }
                            alt="star-icon"
                            className="w-4 h-4 mx-1"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      className="p-1 hover:bg-gray-200 rounded-lg"
                      onClick={() => toggleOption(index)}
                    >
                      <EllipsisVerticalIcon className="w-5 h-5" />
                    </button>
                    {isOptionOpen[index] && (
                      <div
                        ref={optionRef}
                        className="absolute top-8 right-2 w-fit h-fit flex flex-col  justify-center items-center text-[#0f0f0f] bg-gray-300 rounded-lg"
                      >
                        <ul className="w-ful flex flex-col items-start">
                          <li
                            onClick={() => deleteReview(review._id)}
                            className="w-full cursor-pointer flex items-center p-3 hover:bg-gray-200 rounded-lg"
                          >
                            <TrashIcon className="w-[18px] h-[18px] mr-2" />{" "}
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div class="w-full py-4">
                  <p
                    id="text"
                    ref={(el) => (reviewRefs.current[index] = el)}
                    className={`w-full font-poppins text-sm ${
                      !isExpanded[index] ? "line-clamp-2" : ""
                    }`}
                  >
                    {review.comment}
                  </p>
                  {review.comment.length > characterLimit && (
                    <button
                      id="toggleButton"
                      className="text-[#40B5A8] text-sm bg-white mt-1"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleReadmore(index);
                      }}
                    >
                      {isExpanded[index] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {reviews.length !== 0 && (
          <div className="w-full flex justify-center items-center mt-6  py-5">
            <ReviewPagination
              totalPages={totalPages}
              currentPage={currentPage}
              setPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;
