import React from "react";
import Modal from "../ui/Modal";
import { useDispatch, useSelector } from "react-redux";

const DeleteTaskModal = ({ isOpen, onClose, taskId, taskName }) => {
  const isLoading = useSelector((state) => state.tasks.loading);
  const dispatch = useDispatch();

  // Handle task deletion
  const handleDelete = () => {
    dispatch({
      type: "deleteTask",
      payload: {
        taskId,
        onSuccess: () => onClose(),
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
