import React, { useRef, useEffect } from "react";

const OldReview = ({ onClose }) => {
  const modelRef = useRef();

  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };

  // Close the popup when the Esc key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={modelRef}
      onClick={closeModel}
      className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      role="dialog"
      aria-labelledby="modal-heading"
      aria-modal="true"
    >
      <div className="bg-black w-3/5 p-4 rounded-lg">
        <h2 id="modal-heading" className="text-left pl-4 text-white">
          Share your experience
        </h2>
        <textarea
          name="message"
          placeholder="Leave your comment..."
          className="resize-none w-full border p-2 border-gray-300 rounded-lg"
          aria-label="Comment"
        ></textarea>
        <div
          className="rounded-lg mt-3 w-1/5"
          style={{ backgroundColor: "#40B5A8" }}
        >
          <button
            className="flex justify-center w-full p-2 font-semibold text-white"
            onClick={onClose}
            aria-label="Submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OldReview;
