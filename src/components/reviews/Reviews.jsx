import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API } from "../../config/axios";

const Reviews = ({ property }) => {
  // const [currentReviews, setCurrentReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState([])
  const reviewsPerPage = 2;
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const initialReviews = await API.get(`reviews/${property._id}`);
        if (initialReviews.data.reviews.length > 0) {
          setTotalReviews(initialReviews.data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Error fetching reviews");
      }
    };

    fetchReviews();
  }, []);

  const handleRatingChange = (newRating) => {
    setRating(Math.max(1, newRating));
    // setRating(newRating);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();

    try {
      const newReview = {
        property: property._id,
        userId: authState.userData.id,
        firstName: authState.userData.firstName,
        lastName: authState.userData.lastName,
        userRating: rating,
        userComment: comment,
      };

      const response = await API.post("reviews", newReview);
      if (response.data.message === "Review created successfully") {
        toast.success("Review added successfully!");
      } else {
        toast.error("Review not added!");
      }

      const fetchedReviews = await API.get(`reviews/${property._id}`);
      setRating(0);
      setComment("");
      setShowReviewForm(false);
      setTotalReviews(fetchedReviews.data.reviews);
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Error adding review");
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

  console.log(
    totalReviews.reduce((acc, review) => acc + review.userRating, 0) /
      totalReviews.length
  );

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between gap-6 mb-6">
        <div className="flex flex-col items-center justify-center w-1/2 p-4 border border-black rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-bold">
            Average Rating :
            {totalReviews.length > 0
              ? totalReviews.reduce(
                  (acc, review) => acc + review.userRating,
                  0
                ) / totalReviews.length
              : 0}
            / 5
          </h2>
          {
            <ReactStars
              count={5}
              value={
                totalReviews.length > 0
                  ? totalReviews.reduce(
                      (acc, review) => acc + review.userRating,
                      0
                    ) / totalReviews.length
                  : 0
              }
              size={40}
              edit={false}
              activeColor="#ffd700"
            />
          }
        </div>

        <div className="flex flex-col items-center justify-center w-1/2 p-4 border border-black rounded-lg shadow-md bg-gray-100">
          <h3 className="text-lg font-semibold">
            Share details of your experience with this property.
          </h3>
          <button
            onClick={() => {
              if (authState.status === true && localStorage.getItem("token")) {
                setShowReviewForm(!showReviewForm);
              } else {
                toast.error("Please Log In first");
                navigate("/login");
              }
            }}
            className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 border border-black"
          >
            {showReviewForm ? "Cancel" : "Write Review"}
          </button>
        </div>
      </div>

      {showReviewForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg border border-black max-w-md w-full relative">
            <button
              onClick={() => setShowReviewForm(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-4">Add Review</h2>
            <form onSubmit={handleAddReview}>
              <div className="mb-4">
                <label htmlFor="rating" className="block font-bold mb-1">
                  Rate the property :
                </label>
                <ReactStars
                  count={5}
                  value={rating}
                  onChange={handleRatingChange}
                  size={60}
                  activeColor="#ffd700"
                  className="flex justify-center"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="comment" className="block font-bold mb-1">
                  Tell us more!
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded h-24 resize-none bg-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 border border-black"
              >
                Add Review
              </button>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">All Reviews</h2>
      <ul className="list-none p-0">
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <li
              key={review.userId}
              className="bg-gray-100 p-4 mb-2 rounded-lg border border-black"
            >
              <div className="flex items-center">
                <div className="inline-block w-20 h-20 rounded-full bg-gray-500 text-white text-center leading-8 font-bold mr-2"></div>
                <div className="ml-2">
                  <p className="font-bold">
                    {review.firstName !== "NA" ? review.firstName : "Anonymous"}
                    {review.lastName !== "NA" ? " " + review.lastName : ""}
                  </p>

                  <ReactStars
                    count={5}
                    value={Number(review.userRating)}
                    size={24}
                    edit={false}
                    activeColor="#ffd700"
                    className="border border-black rounded-lg p-1"
                  />
                </div>
              </div>

              <p className="mt-5 ml-2">{review.userComment}</p>
            </li>
          ))
        ) : (
          <p className="text-2xl">Be the first to review this property!</p>
        )}
      </ul>

      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-400 text-white py-2 px-4 w-10 rounded-full mr-2"
        >
          &lt;
        </button>
        {Array.from(
          { length: Math.ceil(totalReviews.length / reviewsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`py-2 px-2 w-10 rounded-full ${
                currentPage === index + 1
                  ? "bg-teal-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(totalReviews.length / reviewsPerPage)
          }
          className="bg-gray-400 text-white py-2 px-4 w-10 rounded-full ml-2"
        >
          &gt;
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Reviews;
