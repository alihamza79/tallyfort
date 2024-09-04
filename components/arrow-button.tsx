import React from "react";
import { BsArrowRight } from "react-icons/bs";

// Define the props type
interface ArrowButtonProps {
  text?: string; // Optional text for the button
  className?: string; // Optional custom class name for additional styling
  onClick?: () => void; // Optional click handler function
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  text,
  className,
  onClick,
}) => {
  return (
    <button
      className={`inline-flex items-center gap-9 ${className}`}
      onClick={onClick}
    >
      <span className="text-base sm:text-lg font-bold text-[#1F1F1F]">
        {text}
      </span>
      <span className="relative  after:absolute after:w-[30px] after:h-[3px] after:bg-black after:-left-7 w-11 h-11 bg-black rounded-full after: inline-flex items-center justify-center">
        <BsArrowRight className="text-3xl text-white" />
      </span>
    </button>
  );
};

export default ArrowButton;
