import React from "react";
import TaskCard from "../tasks/TaskCard";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ title, tasks }) => {
  const columnStyles = {
    "To Do": "border-purple-400",
    "In Progress": "border-blue-400",
    Done: "border-green-400",
  };

  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-white rounded-lg shadow-md p-4 border-t-4 ${columnStyles[title]}`}
    >
      {/* Column Header */}
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      {/* Tasks Placeholder */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            name={task.name}
            description={task.description}
            status={task.status}
          />
        ))}
      </div>

      {/* Add Task Button */}
      <button className="mt-4 w-full text-indigo-500 font-semibold">
        + Add Task
      </button>
    </div>
  );
};

export default Column;
