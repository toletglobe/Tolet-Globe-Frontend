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
      const response = await axios.post('http://localhost:5000/api/reviews', newReview);
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
      {/* Average Rating and Write Review Sections */}
      <div className="flex justify-between gap-6 mb-6">
        {/* Average Rating Section */}
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

        {/* Write Review Section */}
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

      {/* Review Form */}
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
              className="w-full p-2 border border-gray-300 rounded bg-white" // Set white background
            />
          </div>

          {/* Rating Section */}
          <div className="mb-4 text-center">
            <label htmlFor="rating" className="block font-bold mb-1">Rating:</label>
            <ReactStars
              count={5}
              value={rating}
              onChange={handleRatingChange}
              size={30}
              activeColor="#ffd700"
              className="flex justify-center" // Center the stars
            />
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block font-bold mb-1">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded h-24 resize-none bg-white" // White background for comment
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 border border-black">
            Add Review
          </button>
        </form>
      )}

      {/* All Reviews Section */}
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

      {/* Pagination */}
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

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
