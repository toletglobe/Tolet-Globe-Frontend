import React from "react";

function Date({ data }) {
  //   const dateValue = new Date(data.date);
  console.log(data.date);
  const date = new Date(data?.date);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return <span className="text-gray-300 font-semibold">{formattedDate}</span>;
}

export default Date;
