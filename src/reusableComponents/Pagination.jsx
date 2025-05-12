import React from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  buttonComponent: Button = "button", // Default to a native button if no custom Button is provided
  buttonClassName = "px-2 py-1 rounded-lg hover:text-[#6CC1B6]",
  activeButtonClassName = "px-2 py-1 rounded-lg text-[#6CC1B6] underline",
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center my-5 mx-auto">
      <div className="bg-white/20 rounded-md px-2 py-1 flex justify-center gap-3">
        {/* Previous Button */}
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`hover:text-[#6CC1B6] rounded-lg flex items-center ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaChevronLeft className="mr-2" /> Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-2">
          {currentPage > 2 && (
            <>
              <Button
                onClick={() => handlePageClick(1)}
                className={buttonClassName}
              >
                1
              </Button>
              {currentPage > 3 && <span className="px-2">...</span>}
            </>
          )}
          {currentPage > 1 && (
            <Button
              onClick={() => handlePageClick(currentPage - 1)}
              className={buttonClassName}
            >
              {currentPage - 1}
            </Button>
          )}
          <Button className={activeButtonClassName} aria-current="page">
            {currentPage}
          </Button>
          {currentPage < totalPages && (
            <Button
              onClick={() => handlePageClick(currentPage + 1)}
              className={buttonClassName}
            >
              {currentPage + 1}
            </Button>
          )}
          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && (
                <span className="px-2">...</span>
              )}
              <Button
                onClick={() => handlePageClick(totalPages)}
                className={buttonClassName}
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>

        {/* Next Button */}
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`hover:text-[#6CC1B6] rounded-lg flex items-center ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next <FaChevronRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
