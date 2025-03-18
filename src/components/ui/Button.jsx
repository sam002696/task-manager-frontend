const Button = ({
  children,
  onClick,
  type = "button",
  isLoading,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "flex justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-400",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus-visible:outline-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseStyles} ${variants[variant]} ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
