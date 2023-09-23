"use client"

import { CustomButtonsProps } from "@/app/components/CustomButton/custombutton.type";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CustomButton = ({
  title,
  onClick,
  type,
  className,
  icon,
  image,
  rightArrow,
  disabled = false,
  animated = false,
}: CustomButtonsProps) => {
  // Use the title prop as the button text
  const buttonText = title || "Log in";

  // Use the icon prop as the button icon, or use the default arrows
  const buttonIcon = icon || (rightArrow ? <FaArrowRight /> : <FaArrowLeft />);

  // Use the image prop as the button background image, or use a solid color
  const buttonStyle = image
    ? { backgroundImage: `url(${image})` }
    : { backgroundColor: "indigo-600 dark:bg-indigo-500" };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative group flex items-center justify-center ${className}`}
      disabled={disabled}
    >
      {animated ? (
        <>
          <span
            className="absolute inset-0 flex items-center justify-center text-white text-2xl duration-100 -translate-x-full group-hover:translate-x-0 ease"
            style={buttonStyle}
          >
            {buttonIcon}
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-indigo-500 dark:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-full ease">
            {buttonText}
          </span>
          <span className="relative invisible">{buttonText}</span>
        </>
      ) : (
        <>
          <span className="flex items-center justify-center text-white text-2xl" style={buttonStyle}>
            {buttonIcon}
          </span>
          <span className="ml-2">{buttonText}</span>
        </>
      )}
    </button>
  );
};

export default CustomButton;
