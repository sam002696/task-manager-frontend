const Button = ({ children, onClick, type = "button", isLoading, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
