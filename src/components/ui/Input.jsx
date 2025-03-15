const Input = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
  onBlur,
  onKeyDown,
  autofocus = false,
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="block text-sm/6 font-medium text-gray-900">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value || ""}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown ? (e) => onKeyDown(e) : undefined}
        placeholder={placeholder}
        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border mt-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-600"
        } placeholder:text-gray-400 focus:outline-none focus:ring-2 sm:text-sm`}
        autoFocus={autofocus}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Input;
