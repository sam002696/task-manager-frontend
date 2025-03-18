const Button = ({
  children,
  onClick,
  type = "button",
  isLoading,
  variant = "primary",
  icon: Icon = null,
  iconPosition = "left",
  className = "",
}) => {
  const baseStyles =
    "flex justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer w-full";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-400",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus-visible:outline-red-700",
    filter:
      "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus-visible:outline-indigo-600",
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
      {Icon && iconPosition === "left" && <Icon className="size-5 mr-2" />}
      {isLoading ? "Loading..." : children}
      {Icon && iconPosition === "right" && <Icon className="size-5" />}
    </button>
  );
};

export default Button;
