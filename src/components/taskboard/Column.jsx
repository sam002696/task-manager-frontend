import React, { useState } from "react";
import TaskCard from "../tasks/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import TaskSkeleton from "../tasks/TaskSkeleton";
import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import AddTaskModal from "../tasks/AddTaskModal";

const Column = ({ title, tasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const taskCounts = useSelector((state) => state.tasks.taskCounts);
  const loading = useSelector((state) => state.tasks.loading);
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
      <div
        className={`flex justify-between items-center p-2 mb-4 rounded shadow-sm ${
          title === "To Do"
            ? "bg-purple-100 text-purple-700"
            : title === "In Progress"
            ? "bg-blue-100 text-blue-700"
            : "bg-green-100 text-green-700"
        }  `}
      >
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 6 6"
            aria-hidden="true"
            className={`size-1.5  ${
              title === "To Do"
                ? "fill-pink-500"
                : title === "In Progress"
                ? "fill-blue-500"
                : "fill-green-500"
            }  `}
          >
            <circle r={3} cx={3} cy={3} />
          </svg>
          <h3 className="text-lg font-semibold ">{title}</h3>
        </div>

        <p
          className={` font-semibold ${
            title === "To Do"
              ? "text-pink-600"
              : title === "In Progress"
              ? "text-blue-600"
              : "text-green-600"
          }`}
        >
          {taskCounts[title]}
        </p>
      </div>

      {/* Add Task Button */}
      <div className="mt-2 mb-4">
        <Button
          type="button"
          variant="filter"
          onClick={() => setIsModalOpen(true)}
          icon={PlusIcon}
          iconPosition="left"
        >
          Add Task
        </Button>
      </div>

      {/* Tasks Placeholder */}
      <div className="space-y-4">
        {loading
          ? [...Array(tasks.length)].map((_, index) => (
              <TaskSkeleton key={index} />
            ))
          : tasks.length > 0
          ? tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                name={task.name}
                description={task.description}
                status={task.status}
                dueDate={task.due_date}
                createdAt={task.created_at}
              />
            ))
          : null}
      </div>
      {/* Task Modal */}
      {isModalOpen && (
        <AddTaskModal
          status={title}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Column;
