import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function ReviewPagination({ totalPages, currentPage, setPage }) {
  const next = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <button
        variant="text"
        className={`flex items-center rounded-full mx-5 bg-gray-300 p-2 hover:bg-gray-400 cursor-pointer ${
          currentPage === 1 && "hidden"
        }`}
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" />
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <IconButton
            key={index + 1}
            onClick={() => setPage(index + 1)}
            variant={currentPage === index + 1 ? "filled" : "text"}
            color="gray"
            size="sm"
            className={`rounded-full flex justify-center items-center ${
              currentPage === index + 1 ? " bg-[#40B5A8]" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <button
        className="flex items-center rounded-full mx-5 bg-gray-300 p-2 hover:bg-gray-400 cursor-pointer"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        {" "}
        <ChevronRightIcon strokeWidth={2} className="h-4 w-4" />
      </button>
    </div>
  );
}

export default ReviewPagination;
