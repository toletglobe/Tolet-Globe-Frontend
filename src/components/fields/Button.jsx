/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Button = ({ children, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`${className} flex flex-row justify-start items-center rounded-xl mt-3 `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;