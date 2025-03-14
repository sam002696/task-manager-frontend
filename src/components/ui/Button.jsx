const Button = ({ children, onClick, type = "button", variant = "primary", isLoading }) => {
    const baseStyles = "px-4 py-2 rounded-md font-semibold transition-all duration-300";
    const variants = {
      primary: "bg-primary text-white hover:bg-blue-700",
      secondary: "bg-secondary text-white hover:bg-purple-700",
      success: "bg-success text-white hover:bg-green-700",
      warning: "bg-warning text-white hover:bg-yellow-700",
      danger: "bg-danger text-white hover:bg-red-700",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={isLoading}
        className={`${baseStyles} ${variants[variant]} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  };
  
  export default Button;
  