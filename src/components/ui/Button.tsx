import React from "react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "maroon" | "darkred" | "accent" | "highlight" | "soft" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<CustomButtonProps> = ({
  children,
  variant = "maroon",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    maroon: "bg-maroon text-white hover:bg-maroon/90 dark:bg-maroon dark:hover:bg-maroon/80",
    darkred: "bg-darkred text-white hover:bg-darkred/90 dark:bg-darkred dark:hover:bg-darkred/80",
    accent: "bg-accent text-white hover:bg-accent/90 dark:bg-accent dark:hover:bg-accent/80",
    highlight: "bg-highlight text-white hover:bg-highlight/90 dark:bg-highlight dark:hover:bg-highlight/80",
    soft: "bg-soft text-black hover:bg-soft/90 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    outline: "border border-gray-300 dark:border-gray-600 bg-transparent dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white",
    link: "text-maroon dark:text-blue-400 underline hover:text-darkred dark:hover:text-blue-300",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
