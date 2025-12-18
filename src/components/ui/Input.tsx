import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<CustomInputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${className}`}
      {...props}
    />
  );
};

export default Input;
