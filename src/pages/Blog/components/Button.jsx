import React from "react";

const Button = ({
  children,
  type = "button",
  className = "flex flex-row justify-start items-center rounded-xl mt-3",
  ...props
}) => {
  return (
    <button type={type} className={`${className}  `} {...props}>
      {children}
    </button>
  );
};

export default Button;
