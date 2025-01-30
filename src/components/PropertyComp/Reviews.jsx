import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API } from "../../config/axios";

const Reviews = ({ property }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0); // Changed initial rating to 0
  const [comment, setComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState([]);
  const [stayDuration, setStayDuration] = useState("");
  const [likesAboutLocality, setLikesAboutLocality] = useState("");
  const [dislikesAboutLocality, setDislikesAboutLocality] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("property", property._id);
      formData.append("userId", authState.userData.id);
      formData.append("firstName", authState.userData.firstName);
      formData.append("lastName", authState.userData.lastName);
      formData.append("userRating", rating);
      formData.append("stayDuration", stayDuration);
      formData.append("likesAboutLocality", likesAboutLocality);
      formData.append("dislikesAboutLocality", dislikesAboutLocality);

      selectedFiles.forEach((file) => {
        formData.append("media", file);
      });

      const response = await API.post("reviews", formData);
      if (response.data.message === "Review created successfully") {
        toast.success("Review added successfully!");
      } else {
        toast.error("Review not added!");
      }

      const fetchedReviews = await API.get(`reviews/${property._id}`);
      setRating(0);
      setStayDuration("");
      setLikesAboutLocality("");
      setDislikesAboutLocality("");
      setSelectedFiles([]);
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

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between gap-6 mb-6">
        <div className="flex flex-col items-center justify-center w-1/2 p-4 border border-black rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-bold">
            Average Rating:{" "}
            {totalReviews.length > 0
              ? (
                  totalReviews.reduce((acc, review) => acc + review.userRating, 0) /
                  totalReviews.length
                ).toFixed(1)
              : 0}
            / 5
          </h2>
          <ReactStars
            count={5}
            value={
              totalReviews.length > 0
                ? totalReviews.reduce((acc, review) => acc + review.userRating, 0) /
                  totalReviews.length
                : 0
            }
            size={40}
            edit={false}
            activeColor="#ffd700"
          />
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
          <div className="bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Write a Review</h1>
              <button
                onClick={() => setShowReviewForm(false)}
                className="text-gray-400 hover:text-white"
              >
                ✖
              </button>
            </div>
            
            <p className="text-gray-300 mb-8">
              Help others choose wisely by reviewing your neighborhood!
            </p>

            <form onSubmit={handleAddReview} className="space-y-6">
              <div>
                <h3 className="text-lg mb-2">Rate your experience</h3>
                <div className="p-4 rounded-lg">
                  <ReactStars
                    count={5}
                    onChange={handleRatingChange}
                    size={40}
                    value={rating}
                    activeColor="#ffd700"
                    isHalf={false}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg mb-4">How long have you stayed here?</h3>
                <div className="flex flex-wrap gap-3">
                  {["0-1 year", "2 years", "3 years", "4 years", "+4 years"].map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => setStayDuration(duration)}
                      className={`px-4 py-2 rounded-full border ${
                        stayDuration === duration
                          ? "bg-teal-500 border-teal-500"
                          : "border-gray-600 hover:border-teal-500"
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg text-teal-400 mb-4">
                  Tell Us What You Think About Your Locality!
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">What do you like about your locality?</label>
                    <textarea
                      value={likesAboutLocality}
                      onChange={(e) => setLikesAboutLocality(e.target.value)}
                      className="w-full h-32 bg-black border border-gray-600 rounded-lg p-3 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                      placeholder="Please share your thoughts"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">What do you dislike about your locality?</label>
                    <textarea
                      value={dislikesAboutLocality}
                      onChange={(e) => setDislikesAboutLocality(e.target.value)}
                      className="w-full h-32 bg-black border border-gray-600 rounded-lg p-3 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                      placeholder="Please share your thoughts"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg text-teal-400 mb-4">Upload Media</h3>
                <p className="text-gray-400 mb-2">Images/Videos</p>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <p className="text-gray-400 mb-2">Drop a file here</p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-600"
                    >
                      Browse
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                Submit Review
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