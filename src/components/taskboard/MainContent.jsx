import React, { useEffect, useState } from "react";
import Column from "./Column";
import Button from "../ui/Button";
import AddTaskModal from "../tasks/AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import InputSelect from "../ui/InputSelect";

const TaskBoard = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);

  const [filterStatus, setFilterStatus] = useState(""); // Default: Show All
  const [sortOrder, setSortOrder] = useState("newest"); // Default: Newest First

  useEffect(() => {
    dispatch({
      type: "taskLists",
      payload: { status: filterStatus, sort: sortOrder },
    });
  }, [dispatch, filterStatus, sortOrder]);

  const groupedTasks = {
    "To Do": tasks?.filter((task) => task.status === "To Do") || [],
    "In Progress": tasks?.filter((task) => task.status === "In Progress") || [],
    Done: tasks?.filter((task) => task.status === "Done") || [],
  };

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <p className="text-2xl font-bold text-gray-900">Studio board</p>
        </div>

        {/*  Sorting & Filtering Controls */}
        <div className="flex gap-4">
          {/* Filter By Status */}
          <InputSelect
            name="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: "", label: "All" },
              { value: "To Do", label: "To Do" },
              { value: "In Progress", label: "In Progress" },
              { value: "Done", label: "Done" },
            ]}
          />

          {/* Sort By Due Date */}
          <InputSelect
            name="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            options={[
              { value: "newest", label: "Newest First" },
              { value: "oldest", label: "Oldest First" },
            ]}
          />
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
