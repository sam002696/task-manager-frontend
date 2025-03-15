import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import InputSelect from "../ui/InputSelect";
import { callApi, selectApi } from "../../store/apiSlice";
import { TASK_API } from "../../constants/apiConstants";

const AddTaskModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { taskResponse = { data: {} } } = useSelector(selectApi);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: "To Do",
      due_date: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Task name is required"),
      description: Yup.string().required("Description is required"),
      status: Yup.string().oneOf(["To Do", "In Progress", "Done"]),
      due_date: Yup.string().required("Due date is required"),
    }),
    onSubmit: (values) => {
      console.log("Submitting Task:", values);

      dispatch(
        callApi({
          operationId: TASK_API.CREATE,
          parameters: {
            method: "POST",
            body: JSON.stringify(values),
          },
          output: "taskResponse",
        })
      );
    },
  });

  // closing modal on successful task creation
  useEffect(() => {
    if (taskResponse.status === "success") {
      onClose();
    }
  }, [taskResponse, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Task"
      primaryAction={{ label: "Add Task", onClick: formik.handleSubmit }}
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

        <Input
          label="Description"
          type="text"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
