"use client";

import { CustomButtonsProps } from "@/types/components/custom-button/custom-button.type";

const CustomButton = ({
  title,
  onClick,
  type,
  className,
  icon,
  image,
  disabled = false,
  animated = false,
}: CustomButtonsProps) => {
  const buttonText = title || "Text Here";

  const buttonIcon = icon;

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
            className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-2xl duration-100 -translate-x-full bg-indigo-600 dark:bg-indigo-500 group-hover:translate-x-0 ease"
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
          <span
            className="flex items-center justify-center text-white text-2xl"
            style={buttonStyle}
          >
            {buttonIcon}
          </span>
          <span className="ml-2">{buttonText}</span>
        </>
      )}
    </button>
  );
};

export default CustomButton;
