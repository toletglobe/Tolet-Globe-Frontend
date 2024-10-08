<<<<<<< HEAD
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactStars from 'react-rating-stars-component';
import { useEffect, useState } from 'react';

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        if (response.data.reviews) {
          setReviews(response.data.reviews);
          calculateAverageRating(response.data.reviews);
        } else {
          toast.error('No reviews found');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Error fetching reviews');
      }
    };
    fetchReviews();
  }, []);

  const calculateAverageRating = (reviewsArray) => {
    if (reviewsArray.length === 0) {
      setAverageRating(0);
      return;
    }
    const totalRating = reviewsArray.reduce((acc, review) => acc + review.rating, 0);
    const avgRating = totalRating / reviewsArray.length;
    setAverageRating(avgRating);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const newReview = {
        property: '60c72b2f9b1d8e001c8c8a5e',
        user: '60c72b2f9b1d8e001c8c8a5f',
        username,
        rating,
        comment,
      };
      await axios.post('http://localhost:5000/api/reviews', newReview);
      toast.success('Review added successfully');

      const updatedResponse = await axios.get('http://localhost:5000/api/reviews');
      setReviews(updatedResponse.data.reviews);
      calculateAverageRating(updatedResponse.data.reviews);

      setUsername('');
      setComment('');
      setRating(1);
      setShowReviewForm(false);
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Error adding review');
    }
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () => currentPage < Math.ceil(reviews.length / reviewsPerPage) && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between gap-6 mb-6">
        <div className="flex flex-col items-center justify-center w-1/2 p-4 border border-black rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-bold">Average Rating: {averageRating.toFixed(2)} / 5</h2>
          {averageRating > 0 && (
            <ReactStars
              count={5}
              value={Math.min(Math.max(averageRating, 0), 5)}
              size={40}
              edit={false}
              activeColor="#ffd700"
            />
          )}
        </div>

        <div className="flex flex-col items-center justify-center w-1/2 p-4 border border-black rounded-lg shadow-md bg-gray-100">
          <h3 className="text-lg font-semibold">Share your experience with this property.</h3>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 border border-black"
          >
            {showReviewForm ? 'Cancel' : 'Write Review'}
          </button>
        </div>
      </div>

      {showReviewForm && (
        <form onSubmit={handleAddReview} className="bg-gray-50 p-4 rounded-lg shadow border border-black">
          <h2 className="text-lg font-semibold mb-4">Add Review</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block font-bold mb-1">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white"
            />
          </div>

          <div className="mb-4 text-center">
            <label htmlFor="rating" className="block font-bold mb-1">Rating:</label>
            <ReactStars
              count={5}
              value={rating}
              onChange={handleRatingChange}
              size={30}
              activeColor="#ffd700"
              className="flex justify-center"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block font-bold mb-1">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded h-24 resize-none bg-white"
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 border border-black">
            Add Review
          </button>
        </form>
      )}

      <h2 className="text-2xl font-bold mb-4">All Reviews</h2>
      <ul className="list-none p-0">
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <li key={review._id} className="bg-gray-100 p-4 mb-2 rounded-lg border border-black">
              <div className="inline-block w-8 h-8 rounded-full bg-gray-500 text-white text-center leading-8 font-bold mr-2">
                {review.username.charAt(0).toUpperCase()}
              </div>
              <strong>{review.username}</strong> ({review.rating} stars):
              <p>{review.comment}</p>
              <ReactStars
                count={5}
                value={Number(review.rating)}
                size={24}
                edit={false}
                activeColor="#ffd700"
                className="border border-black rounded-lg p-1"
              />
              <small className="block mt-2 text-gray-600">Posted on: {new Date(review.createdAt).toLocaleDateString()}</small>
            </li>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </ul>

      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-400 text-white py-2 px-4 rounded mr-2"
        >
          &lt;
        </button>
        {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`py-2 px-4 rounded-lg ${currentPage === index + 1 ? 'bg-teal-500 text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(reviews.length / reviewsPerPage)}
          className="bg-gray-400 text-white py-2 px-4 rounded ml-2"
        >
          &gt;
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
=======
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

                <div className="w-full py-4">
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
>>>>>>> 1575a0a5e69fe016721cb3b26dc39733bb41e760
