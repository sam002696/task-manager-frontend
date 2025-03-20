import React from "react";

const Textarea = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  rows = 3,
  maxLength = 200,
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            onChange(e);
          }
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border mt-2 
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-600"
          } 
          placeholder:text-gray-400 focus:outline-none focus:ring-2 sm:text-sm resize-none`}
      />
      <div className="text-xs text-gray-500 mt-1">
        {value.length}/{maxLength} characters
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Textarea;
