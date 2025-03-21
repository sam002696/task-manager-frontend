import React from "react";

const DotsLoader = ({ color = "bg-gray-900" }) => {
  return (
    <div className="flex items-center space-x-1">
      <div
        className={`size-2 rounded-full ${color} animate-bounce [animation-delay:0ms]`}
      />
      <div
        className={`size-2 rounded-full ${color} animate-bounce [animation-delay:150ms]`}
      />
      <div
        className={`size-2 rounded-full ${color} animate-bounce [animation-delay:300ms]`}
      />
      <div
        className={`size-2 rounded-full ${color} animate-bounce [animation-delay:450ms]`}
      />
    </div>
  );
};

export default DotsLoader;
