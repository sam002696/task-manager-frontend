import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import {
  PaperClipIcon,
  ChatBubbleBottomCenterTextIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import InputSelect from "../ui/InputSelect";
import Input from "../ui/Input";
import DeleteTaskModal from "./DeleteTaskModal";

const TaskCard = ({ id, name, description, status }) => {
  // State for inline editing
  const [isEditing, setIsEditing] = useState({
    name: false,
    description: false,
    status: false,
  });

  const [editedTask, setEditedTask] = useState({ name, description, status });
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isAnyFieldEditing = Object.values(isEditing).some((value) => value);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: isAnyFieldEditing,
  });
  const dispatch = useDispatch();

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

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className="bg-white p-4 rounded-lg shadow-md border-l-4 flex justify-between items-center hover:bg-gray-100 
    cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
    >
      {!isAnyFieldEditing && (
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing pr-2"
        >
          <PaperClipIcon className="h-5 w-5 text-gray-500" />
        </div>
      )}

      <div className="flex-1">
        {/* Editable Task Name */}
        {isEditing.name ? (
          <Input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleChange}
            onBlur={() => handleUpdate("name")}
            onKeyDown={(e) => e.key === "Enter" && handleUpdate("name")}
            autoFocus={true}
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
          <Input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            onBlur={() => handleUpdate("description")}
            onKeyDown={(e) => e.key === "Enter" && handleUpdate("description")}
            autoFocus={true}
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
        </div>
      </div>

      {/* Delete Icon (Show on Hover) */}
      {isHovered && (
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="text-gray-500 hover:text-red-600 cursor-pointer"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteTaskModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          taskId={id}
          taskName={name}
        />
      )}
    </div>
  );
};

export default TaskCard;
