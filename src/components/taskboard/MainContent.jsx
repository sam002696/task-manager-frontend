import React, { useEffect, useState } from "react";
import Column from "./Column";
import Button from "../ui/Button";
import AddTaskModal from "../tasks/AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../store/apiSlice";
import { TASK_API } from "../../constants/apiConstants";
import { addTaskLocal, setTasks } from "../../store/taskSlice";

const TaskBoard = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks } = useSelector((state) => state.tasks);
  const {
    taskList = {
      data: {},
    },
  } = useSelector(selectApi);

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(callApi({ operationId: TASK_API.FETCH, output: "taskList" }));
  }, [dispatch]);

  // Adding task response handler
  useEffect(() => {
    if (taskList?.status === "success" && Array.isArray(taskList?.data)) {
      dispatch(setTasks(taskList.data));
    }
  }, [taskList, dispatch]);

  // Add a new task without duplicates
  useEffect(() => {
    if (
      taskList?.status === "success" &&
      taskList?.data &&
      !Array.isArray(taskList.data)
    ) {
      dispatch(addTaskLocal(taskList.data)); // Uses slice logic to prevent duplicates
      setIsModalOpen(false);
    }
  }, [taskList, dispatch]);

  const groupedTasks = {
    "To Do": tasks?.filter((task) => task.status === "To Do") || [],
    "In Progress": tasks?.filter((task) => task.status === "In Progress") || [],
    Done: tasks?.filter((task) => task.status === "Done") || [],
  };

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
      {/* Header Section */}
      <div className="flex justify-between mb-10">
        <div>
          <p className="text-2xl font-bold text-gray-900">Studio board</p>
        </div>
        <div>
          <Button
            type="submit"
            variant="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add task
          </Button>
        </div>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(groupedTasks).map(([title, tasks]) => (
          <Column key={title} title={title} tasks={tasks} />
        ))}
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
};

export default TaskBoard;
