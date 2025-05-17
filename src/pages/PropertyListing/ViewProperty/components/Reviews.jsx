import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import toast, { Toaster } from "react-hot-toast";
import API from "../api/api";

const Reviews = ({ property }) => {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState([]);
  const [stayDuration, setStayDuration] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [media, setMedia] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setMedia(urls);
  };

  const submitReview = async () => {
    if (!rating) return toast.error("Please select a rating");
    if (!stayDuration) return toast.error("Please select stay duration");

    const newReview = {
      rating,
      comment,
      stayDuration,
      likes,
      dislikes,
      media,
      propertyId: property._id,
    };

    try {
      const response = await API.post("/reviews", newReview);
      toast.success("Review submitted!");
      setRating(0);
      setComment("");
      setStayDuration("");
      setLikes("");
      setDislikes("");
      setMedia([]);
      setReviews((prev) => [response.data.review, ...prev]);
      setTotalReviews((prev) => [response.data.review, ...prev]);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/reviews/${property._id}`);
      setTotalReviews(res.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [property._id]);

  useEffect(() => {
    const indexOfLast = currentPage * reviewsPerPage;
    const indexOfFirst = indexOfLast - reviewsPerPage;
    setReviews(totalReviews.slice(indexOfFirst, indexOfLast));
  }, [currentPage, totalReviews]);

  const averageRating = totalReviews.length
    ? totalReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews.length
    : 0;

  const roundToHalf = (value) => Math.round(value * 2) / 2;

  return (
    <div className="p-4">
      <Toaster />
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Stay Duration</label>
          <select
            value={stayDuration}
            onChange={(e) => setStayDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select duration</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6-12 months">6-12 months</option>
            <option value="1+ year">1+ year</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Likes</label>
          <textarea
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Dislikes</label>
          <textarea
            value={dislikes}
            onChange={(e) => setDislikes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleMediaChange}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <ReactStars
            count={5}
            size={30}
            isHalf={true}
            value={rating}
            onChange={handleRatingChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={submitReview}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">Reviews</h2>
        <div className="flex items-center gap-2 mb-4">
          <ReactStars
            count={5}
            value={roundToHalf(averageRating)}
            size={24}
            isHalf={true}
            edit={false}
          />
          <span className="text-lg font-semibold">
            {averageRating.toFixed(1)} out of 5
          </span>
          <span className="text-sm text-gray-500 ml-2">
            ({totalReviews.length} reviews)
          </span>
        </div>

        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 mb-6 flex flex-col md:flex-row gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-gray-400 text-white flex items-center justify-center text-xl font-bold">
                  {review.firstName?.[0]}
                  {review.lastName?.[0]}
                </div>
                <div>
                  <p className="font-bold">
                    {review.firstName} {review.lastName}
                  </p>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    isHalf={true}
                    edit={false}
                  />
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    Stayed: {review.stayDuration}
                  </p>
                  {review.likes && (
                    <p className="text-green-700">Liked: {review.likes}</p>
                  )}
                  {review.dislikes && (
                    <p className="text-red-700">Disliked: {review.dislikes}</p>
                  )}
                  {review.media && review.media.length > 0 && (
                    <div className="mt-4 flex gap-4 flex-wrap">
                      {review.media.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt="review media"
                          className="w-24 h-24 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>{currentPage}</span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < Math.ceil(totalReviews.length / reviewsPerPage)
                      ? prev + 1
                      : prev
                  )
                }
                disabled={
                  currentPage === Math.ceil(totalReviews.length / reviewsPerPage)
                }
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
