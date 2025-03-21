import React from "react";
import Modal from "../ui/Modal";
import { useDispatch, useSelector } from "react-redux";

const DeleteTaskModal = ({ isOpen, onClose, taskId, taskName }) => {
  // Getting loading state from Redux
  const isLoading = useSelector((state) => state.tasks.loading);
  const dispatch = useDispatch();

  // Function to delete the task
  const handleDelete = () => {
    dispatch({
      type: "deleteTask", // Redux action to delete a task
      payload: {
        taskId, // ID of the task to delete
        onSuccess: () => onClose(), // Closing the modal on success
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Task"
      primaryAction={{
        label: "Yes, Delete",
        onClick: handleDelete,
        loading: isLoading,
      }}
      secondaryAction={{ label: "Cancel", onClick: onClose }}
    >
      <p className="text-gray-700">
        Are you sure you want to delete{" "}
        <span className="font-semibold">"{taskName}"</span>? This action cannot
        be undone.
      </p>
    </Modal>
  );
};

export default DeleteTaskModal;
