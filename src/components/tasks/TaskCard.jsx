import React, { useEffect, useRef, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import InputSelect from "../ui/InputSelect";
import Input from "../ui/Input";
import DeleteTaskModal from "./DeleteTaskModal";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  CalendarDaysIcon,
  CalendarIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/20/solid";
import { formatDate } from "../../utils/dateUtils";

const TaskCard = ({ id, name, description, status, dueDate, createdAt }) => {
  const dispatch = useDispatch();
  const taskCardRef = useRef(null);
  const nameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const statusInputRef = useRef(null);
  // State for inline editing
  const [isEditing, setIsEditing] = useState({
    name: false,
    description: false,
    status: false,
  });
  const [pendingEdit, setPendingEdit] = useState(null);

  const [editedTask, setEditedTask] = useState({ name, description, status });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isAnyFieldEditing = Object.values(isEditing).some((value) => value);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled: isAnyFieldEditing,
    });

  // Handling clicking outside the task card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        taskCardRef.current &&
        !taskCardRef.current.contains(event.target) &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "SELECT"
      ) {
        setIsEditing({ name: false, description: false, status: false });
      }
    };

    if (isAnyFieldEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAnyFieldEditing]);

  const handleClickInsideTaskCard = (event) => {
    if (
      isAnyFieldEditing &&
      event.target.tagName !== "INPUT" &&
      event.target.tagName !== "SELECT"
    ) {
      setIsEditing({ name: false, description: false, status: false });
    }
  };

  // Handling field edit
  const handleEdit = (field) => {
    setIsEditing({ name: false, description: false, status: false }); // Close all fields first
    setPendingEdit(field); // Store the field that should be opened next
  };

  useEffect(() => {
    if (pendingEdit) {
      setIsEditing((prev) => ({ ...prev, [pendingEdit]: true }));
      setPendingEdit(null); // Reset pending edit to avoid looping
    }
  }, [pendingEdit]);

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

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
    transition: isDragging
      ? "none"
      : "transform 150ms ease-in-out, opacity 150ms ease-in-out",
    willChange: "transform, opacity",
    opacity: isDragging ? 0.9 : 1, // Adjust opacity for better visibility
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        taskCardRef.current = node;
      }}
      onClick={handleClickInsideTaskCard}
      className={`bg-white p-4 rounded-lg shadow-md border-l-4 flex items-stretch transition border-gray-300
        ${isDragging ? " scale-105" : "hover:bg-gray-50"}`} // Makes it interactive
      style={style}
    >
      {/* Left Side (Task Details) */}

      {/* Task due date */}

      <div className="">
        <div className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 mb-2">
          <div className="group relative -ml-1 size-3.5 rounded-xs hover:bg-gray-500/20">
            <span className="sr-only">Remove</span>
            <CalendarIcon className="size-3.5" />
            <span className="absolute -inset-1" />
          </div>
          Task created : {formatDate(createdAt)}
        </div>

        <div className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 mb-2">
          <div className="group relative -ml-1 size-3.5 rounded-xs hover:bg-gray-500/20">
            <span className="sr-only">Remove</span>
            <CalendarDaysIcon className="size-3.5" />
            <span className="absolute -inset-1" />
          </div>
          Task due : {formatDate(dueDate)}
        </div>

        {/* Editable Task Name */}
        {isEditing.name ? (
          <Input
            ref={nameInputRef}
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleChange}
            onBlur={() => handleUpdate("name")}
            onKeyDown={(e) => e.key === "Enter" && handleUpdate("name")}
            autoFocus={true}
            className="text-lg font-medium"
          />
        ) : (
          <p
            className="font-medium text-gray-900 cursor-pointer text-lg"
            onClick={() => handleEdit("name")}
          >
            {name}
          </p>
        )}

        {/* Editable Task Description */}
        {isEditing.description ? (
          <Input
            ref={descriptionInputRef}
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            onBlur={() => handleUpdate("description")}
            onKeyDown={(e) => e.key === "Enter" && handleUpdate("description")}
            autoFocus={true}
            className="text-sm"
          />
        ) : (
          <p
            className="mt-2 text-sm text-gray-600 cursor-pointer"
            onClick={() => handleEdit("description")}
          >
            {description}
          </p>
        )}

        {/* Editable Task Status */}
        {isEditing.status ? (
          <InputSelect
            ref={statusInputRef}
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            onBlur={() => handleUpdate("status")}
            options={[
              { value: "To Do", label: "To Do" },
              { value: "In Progress", label: "In Progress" },
              { value: "Done", label: "Done" },
            ]}
            className="text-sm"
          />
        ) : (
          <span
            className={`mt-3 inline-block px-2 py-1 text-xs font-medium rounded ${
              status === "To Do"
                ? "bg-purple-100 text-purple-700"
                : status === "In Progress"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            } cursor-pointer`}
            onClick={(e) => handleEdit("status", e)}
          >
            {status}
          </span>
        )}
      </div>

      {/* Right Side (Actions & Drag Handle) */}
      <div className="flex flex-col justify-between items-end ">
        {/* Menu Button for Actions (Top-Right) */}
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
              <EllipsisVerticalIcon className="h-5 w-5" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5"
            >
              <MenuItem>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Delete task
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>

        {/* Paperclip Icon (Bottom-Right) */}
        {!isAnyFieldEditing && (
          <div className="mt-auto">
            <div
              {...listeners}
              {...attributes}
              className="cursor-grab active:cursor-grabbing"
            >
              <ArrowsPointingOutIcon className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        )}
      </div>

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
