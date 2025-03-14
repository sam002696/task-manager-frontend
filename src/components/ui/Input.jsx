const Input = ({ label, type = "text", placeholder, value, onChange, error, fullWidth = true }) => {
    return (
      <div className={`flex flex-col ${fullWidth ? "w-full" : ""}`}>
        {label && <label className="text-gray-700 font-medium">{label}</label>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {error && <span className="text-danger text-sm mt-1">{error}</span>}
      </div>
    );
  };
  
  export default Input;
  