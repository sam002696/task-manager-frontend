import React from "react";
import {
  PaperClipIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

const TaskCard = ({ title, description }) => {
  // const priorityColors = {
  //   High: "bg-red-500",
  //   Medium: "bg-yellow-500",
  //   Low: "bg-green-500",
  // };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 flex justify-between items-center">
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-600">{description}</p>

        {/* Icons */}
        <div className="flex items-center gap-3 mt-2 text-gray-500">
          <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
          <PaperClipIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
