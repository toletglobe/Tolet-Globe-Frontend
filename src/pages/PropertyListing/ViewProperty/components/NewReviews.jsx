import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../../../config/axios";

const Reviews = ({ property }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [existingReviewId, setExistingReviewId] = useState(null);

  const reviewsPerPage = 2;
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const userId = authState?.userData?.id;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const initialReviews = await API.get(`reviews/${property._id}`);
        const allReviews = initialReviews.data.reviews;
        setTotalReviews(allReviews);

        // Check if the user already has a review
        if (authState.status && userId) {
          const existing = allReviews.find((r) => r.userId === userId);
          if (existing) {
            setExistingReviewId(existing._id);
            setRating(existing.userRating);
            setComment(existing.comments);
          }
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [authState.status, userId, property._id]);

  useEffect(() => {
    if (totalReviews.length > 0) {
      const avg =
        totalReviews.reduce((acc, review) => acc + review.userRating, 0) /
        totalReviews.length;
      setAverageRating(Math.round(avg * 2) / 2); // Round to half
    } else {
      setAverageRating(0);
    }
  }, [totalReviews]);

  const handleRatingChange = (newRating) => setRating(newRating);
const handleAddReview = async (e) => {
  e.preventDefault();

  if (rating === 0) {
    toast.error("Please provide a rating");
    return;
  }

  const reviewData = {
    property: property._id,
    userId,
    firstName: authState.userData.firstName,
    lastName: authState.userData.lastName,
    userRating: rating,
    comments: comment,
  };

  try {
    let response;

    if (existingReviewId) {
      response = await API.put(`reviews/${existingReviewId}`, reviewData);
      if (response.data.message === "Review updated successfully") {
        toast.success("Review updated successfully!");
      }
    } else {
      response = await API.post("reviews", reviewData);
      if (response.data.message === "Review created successfully") {
        toast.success("Review added successfully!");
      }
    }

    const fetchedReviews = await API.get(`reviews/${property._id}`);
    setTotalReviews(fetchedReviews.data.reviews);

    //  Re-check and update your own review locally
    const updatedReview = fetchedReviews.data.reviews.find(r => r.userId === userId);
    if (updatedReview) {
      setExistingReviewId(updatedReview._id);
      setRating(updatedReview.userRating);
      setComment(updatedReview.comments);
    }

    setShowReviewForm(false);
  } catch (error) {
    console.error("Error saving review:", error);
    toast.error("Error saving review");
  }
};



  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = totalReviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () =>
    currentPage < Math.ceil(totalReviews.length / reviewsPerPage) &&
    setCurrentPage(currentPage + 1);
  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl text-center my-4 lg:text-left lg:mx-8 lg:my-4 font-bold text-black">Reviews</h1>

      {/* Average Rating */}
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6 mb-6 lg:mx-6">
        <div className="flex flex-col lg:gap-4 items-center w-full lg:w-1/2 px-2 p-12 lg:p-0 lg:px-4 border border-black rounded-lg shadow-md bg-white justify-center">
          <h2 className="block lg:hidden xl:text-5xl lg:text-4xl text-xl font-bold text-black">
            Average Rating: {averageRating} / 5
          </h2>
          <ReactStars
            count={5}
            key={averageRating}
            value={averageRating}
            isHalf={true}
            size={
              window.innerWidth < 640
                ? 20
                : window.innerWidth < 1025
                ? 35
                : window.innerWidth < 1450
                ? 44
                : 50
            }
            edit={false}
            activeColor="#ffd700"
          />
          <h2 className="hidden lg:block xl:text-5xl lg:text-4xl text-2xl font-bold text-[#505050]">
            {averageRating} Out Of 5
          </h2>
        </div>

        {/* Write Review CTA */}
        <div className="flex flex-col sm:flex-row items-start justify-between w-full xl:p-6 p-4 border border-black rounded-lg shadow-md bg-white gap-6">
          <div className="flex-col hidden md:flex lg:flex flex-wrap items-start w-full lg:w-[35%]">
            <h3 className="text-xl mb-2 font-bold text-[#505050]">Rate This Property On Your Experience</h3>
            <ReactStars
              count={5}
              onChange={handleRatingChange}
              size={window.innerWidth < 640 ? 30 : 50}
              value={rating}
              activeColor="#ffd700"
              isHalf={false}
            />
          </div>
          <div className="flex flex-col items-start w-full lg:w-1/2 xl:w-[49%] gap-2">
            <h3 className="text-[0.8rem] lg:text-xl font-bold text-start text-black">
              Share details of your experience with this property.
            </h3>
            <button
              onClick={() => {
                if (authState.status && localStorage.getItem("token")) {
                  setShowReviewForm(!showReviewForm);
                } else {
                  toast.error("Please Log In first");
                  navigate("/login");
                }
              }}
              className="mt-4 w-full bg-teal-500 text-black font-bold lg:text-xl py-2 rounded-lg hover:bg-teal-600 border border-black"
            >
              {showReviewForm ? "Cancel" : existingReviewId ? "Update Your Review" : "Write A Review"}
            </button>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-semibold m-auto">
                {existingReviewId ? "Update Your Review" : "Write a Review"}
              </h1>
              <button onClick={() => setShowReviewForm(false)} className="text-gray-400 hover:text-white">✖</button>
            </div>
            <p className="text-gray-300 mb-10 text-center">
              Help others choose wisely by reviewing your neighborhood!
            </p>
            <form onSubmit={handleAddReview} className="space-y-6">
              <div className="mb-2">
                <h3 className="text-lg text-teal-400">Rate your Locality / Society</h3>
                <ReactStars
                  count={5}
                  onChange={handleRatingChange}
                  size={50}
                  value={rating}
                  activeColor="#ffd700"
                  isHalf={false}
                />
              </div>
              <div>
                <h3 className="text-lg text-teal-400 mb-4">
                  Tell Us What You Think About Your Locality!
                </h3>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full h-32 bg-black border border-gray-600 rounded-lg p-3 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  placeholder="Please share your thoughts"
                />
              </div>
              <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors">
                {existingReviewId ? "Update Review" : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Reviews Display */}
      <ul className="list-none p-0">
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => {
            const initials = `${review.firstName?.[0] || ""}${review.lastName?.[0] || ""}`.toUpperCase() || "U";
            return (
              <li key={review._id} className="bg-gray-100 p-4 mb-4 rounded-xl border border-black lg:mx-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-teal-600 text-white flex items-center justify-center text-lg font-semibold">
                    {initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg lg:text-2xl text-black">
                      {review.firstName !== "NA" ? review.firstName : "Anonymous"}{" "}
                      {review.lastName !== "NA" ? review.lastName : ""}
                    </p>
                    <ReactStars
                      count={5}
                      value={Number(review.userRating)}
                      size={window.innerWidth < 640 ? 20 : window.innerWidth < 1290 ? 24 : 30}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mt-3 text-gray-800 text-base lg:text-lg">{review.comments}</p>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <p className="text-xl text-center lg:text-left lg:text-2xl lg:mx-8">
            Be the first to review this property!
          </p>
        )}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            className="bg-gray-400 text-white py-2 px-4 w-10 rounded-full mr-2"
          >
            &lt;
          </button>
        )}
        {Array.from({ length: Math.ceil(totalReviews.length / reviewsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`py-2 px-2 w-10 rounded-full ${
              currentPage === index + 1 ? "bg-teal-500 text-white" : "bg-gray-300 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < Math.ceil(totalReviews.length / reviewsPerPage) && (
          <button
            onClick={handleNextPage}
            className="bg-gray-400 text-white py-2 px-4 w-10 rounded-full ml-2"
          >
            &gt;
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Reviews;
