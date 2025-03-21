import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import InputSelect from "../ui/InputSelect";
import Textarea from "../ui/Textarea";

const AddTaskModal = ({ isOpen, onClose, status }) => {
  // Getting loading state from Redux
  const isLoading = useSelector((state) => state.tasks.loading);
  const dispatch = useDispatch();

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: status || "",
      due_date: "",
    },
    // Form validation schema
    validationSchema: Yup.object({
      name: Yup.string().required("Task name is required"),
      description: Yup.string()
        .required("Description is required")
        .max(200, "Description cannot exceed 200 characters"),
      status: Yup.string()
        .oneOf(["To Do", "In Progress", "Done"], "Please select a valid status")
        .required("Status is required"),
      due_date: Yup.string().required("Due date is required"),
    }),
    // Form submission handler
    onSubmit: (values) => {
      dispatch({
        type: "taskAdd", // Redux action to add a new task
        payload: {
          taskData: values, // Task data from the form
          onSuccess: () => {
            // Resetting the form and closing the modal
            formik.resetForm(); // Resetting the form
            onClose(); // Closing the modal
          },
        },
      });
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Task"
      primaryAction={{
        label: "Add Task",
        onClick: formik.handleSubmit,
        loading: isLoading,
      }}
      secondaryAction={{ label: "Cancel", onClick: onClose }}
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          label="Task Name"
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
        />

        <Textarea
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={200} // Enforce max length
          error={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : ""
          }
        />

        <InputSelect
          label="Status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          options={[
            { value: "", label: "Select Status" },
            { value: "To Do", label: "To Do" },
            { value: "In Progress", label: "In Progress" },
            { value: "Done", label: "Done" },
          ]}
          error={
            formik.touched.status && formik.errors.status
              ? formik.errors.status
              : ""
          }
        />

        <Input
          label="Due Date"
          name="due_date"
          type="datetime-local"
          value={formik.values.due_date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.due_date && formik.errors.due_date
              ? formik.errors.due_date
              : ""
          }
        />
      </form>
    </Modal>
  );
};

export default AddTaskModal;
