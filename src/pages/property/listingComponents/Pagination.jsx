import React, { useState } from "react";
import { Button } from "../../../components/index.js";
import { FaChevronLeft, FaChevronRight, FaLocationDot } from "react-icons/fa6";
const Pagination = ({ properties, currentPage, setCurrentPage, totalPages }) => {
  const [propertiesPerPage, setPropertiesPerPage] = useState(9);

  // Change page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div>
      <div className="flex justify-center mt-5 mx-auto">
        <div className="bg-white/20 rounded-md px-2 py-1 flex justify-center gap-3">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="hover:text-[#6CC1B6] rounded-lg  flex items-center"
          >
            <FaChevronLeft className="mr-2" /> Previous
          </Button>
          <div className="flex items-center space-x-2">
            {currentPage > 2 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="px-2 py-1 rounded-lg  hover:text-[#6CC1B6]"
                >
                  1
                </button>
                {currentPage > 3 && <span className="px-2">...</span>}
              </>
            )}
            {currentPage > 1 && (
              <button
                onClick={() => onPageChange(currentPage - 1)}
                className="px-2 py-1 rounded-lg  hover:text-[#6CC1B6]"
              >
                {currentPage - 1}
              </button>
            )}
            <button
              className="px-2 py-1 rounded-lg text-[#6CC1B6] underline"
              aria-current="page"
            >
              {currentPage}
            </button>
            {currentPage < totalPages && (
              <button
                onClick={() => onPageChange(currentPage + 1)}
                className="px-2 py-1 rounded-lg hover:text-[#6CC1B6]"
              >
                {currentPage + 1}
              </button>
            )}
            {currentPage < totalPages - 1 && (
              <>
                {currentPage < totalPages - 2 && (
                  <span className="px-2">...</span>
                )}
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="px-2 py-1 rounded-lg hover:text-[#6CC1B6]"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          <div className="flex gap-1">
            <span className="pt-0.5">|</span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="hover:text-[#6CC1B6] rounded-lg flex items-center"
            >
              Next <FaChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
