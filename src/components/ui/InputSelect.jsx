import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const InputSelect = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  ref,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="mt-2 grid grid-cols-1 relative">
        <select
          id={name}
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur ? onBlur : undefined}
          className={`col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 absolute right-3 top-1/2 transform -translate-y-1/2"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputSelect;
