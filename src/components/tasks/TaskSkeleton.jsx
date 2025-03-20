import React from "react";

const TaskSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-gray-300 flex items-stretch animate-pulse">
      {/* Left Side (Skeleton Task Details) */}
      <div className="flex-1">
        {/* Created & Due Dates Skeleton */}
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded mb-3"></div>

        {/* Task Name Skeleton */}
        <div className="w-3/4 h-5 bg-gray-300 rounded mb-2"></div>

        {/* Description Skeleton */}
        <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-5/6 h-4 bg-gray-300 rounded mb-3"></div>

        {/* Status Skeleton */}
        <div className="w-1/4 h-5 bg-gray-300 rounded"></div>
      </div>

      {/* Right Side (Skeleton for Actions & Drag Handle) */}
      <div className="flex flex-col justify-between items-end">
        {/* Menu Icon Skeleton */}
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>

        {/* Drag Handle Skeleton */}
        <div className="w-5 h-5 bg-gray-300 rounded mt-auto"></div>
      </div>
    </div>
  );
};

export default TaskSkeleton;
