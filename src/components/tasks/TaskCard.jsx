import React, { useState } from "react";
import {
  PaperClipIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import InputSelect from "../ui/InputSelect";

const TaskCard = ({ id, name, description, status }) => {
  const dispatch = useDispatch();

  // State for inline editing
  const [isEditing, setIsEditing] = useState({
    name: false,
    description: false,
    status: false,
  });
  const [editedTask, setEditedTask] = useState({ name, description, status });

  // Handling field edit
  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  // Handling field change
  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  // Handling field update (onBlur or Enter)
  const handleUpdate = (field) => {
    setIsEditing({ ...isEditing, [field]: false });

    // Checking if the field is not changed
    if (
      editedTask[field] === name ||
      editedTask[field] === description ||
      editedTask[field] === status
    ) {
      return;
    }

    // Dispatching update API call via saga
    dispatch({
      type: "updateTask",
      payload: {
        taskId: id,
        taskData: { [field]: editedTask[field] },
      },
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 flex justify-between items-center">
      <div>
        {/* Editable Task name */}
        {isEditing.name ? (
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleChange}
            onBlur={() => handleUpdate("name")}
            onKeyDown={(e) => e.key === "Enter" && handleUpdate("name")}
            className="border p-1 w-full"
            autoFocus
          />
        ) : (
          <p
            className="font-semibold text-gray-900 cursor-pointer"
            onClick={() => handleEdit("name")}
          >
            {name}
          </p>
        )}

        {/* Editable Task Description */}
        {isEditing.description ? (
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            onBlur={() => handleUpdate("description")}
            onKeyDown={(e) => e.key === "Enter" && handleUpdate("description")}
            className="border p-1 w-full mt-1 text-sm"
            autoFocus
          />
        ) : (
          <p
            className="mt-1 text-sm text-gray-600 cursor-pointer"
            onClick={() => handleEdit("description")}
          >
            {description}
          </p>
        )}

        {/* Editable Task Status */}
        {isEditing.status ? (
          <InputSelect
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            onBlur={() => handleUpdate("status")}
            options={[
              { value: "To Do", label: "To Do" },
              { value: "In Progress", label: "In Progress" },
              { value: "Done", label: "Done" },
            ]}
            error={null}
          />
        ) : (
          <p
            className="mt-1 text-sm text-gray-600 cursor-pointer"
            onClick={() => handleEdit("status")}
          >
            {status}
          </p>
        )}

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
