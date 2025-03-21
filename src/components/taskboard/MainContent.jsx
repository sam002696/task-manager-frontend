import React, { useEffect, useState } from "react";
import Column from "./Column";
import Button from "../ui/Button";
import { DndContext } from "@dnd-kit/core";
import AddTaskModal from "../tasks/AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import Input from "../ui/Input";
import { FunnelIcon, PlusIcon } from "@heroicons/react/24/outline";
import SortingFilteringModal from "../tasks/SortingFilteringModal";

const MainContent = () => {
  // Getting Redux state and dispatch function
  const activeFilterCount = useSelector(
    (state) => state.tasks.activeFilterCount // Number of active filters
  );
  const filters = useSelector((state) => state.tasks.filters); // Currently applied filters
  const tasks = useSelector((state) => state.tasks.tasks); // List of tasks
  const dispatch = useDispatch(); // Function to dispatch Redux actions

  // State for modals and search
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls "Add Task" modal
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // Controls "Sorting & Filtering" modal
  const [searchTerm, setSearchTerm] = useState(filters.search || ""); // Search input state

  // Fetching tasks whenever filters change
  useEffect(() => {
    dispatch({
      type: "taskLists", // Redux action to fetch tasks
    });
  }, [
    dispatch,
    // Re-fetching tasks when any filter changes
    filters.status,
    filters.sort,
    filters.due_date_from,
    filters.due_date_to,
  ]);

  // Handling search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Updating local state
    dispatch({ type: "searchTasks", payload: e.target.value }); // Dispatching search action to Redux
  };

  // Handling Drag & Drop functionality
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return; // If the task isn't dropped in a valid column, doing nothing

    const taskId = active.id; // The ID of the dragged task
    const newStatus = over.id; // The ID of the column where the task was dropped

    dispatch({
      type: "updateTask", // Redux action to update task status
      payload: {
        taskId,
        taskData: { status: newStatus }, // Updating the task's status
      },
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-14">
          {/* Left Side: Title & Sorting Button */}
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-gray-900 whitespace-nowrap">
              Task board
            </p>

            {/* Sorting & Filtering Button */}
            <Button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              variant="yellowFilter"
              icon={FunnelIcon}
              iconPosition="left"
            >
              Sorting & Filtering ({" "}
              <span className="text-yellow-700">{activeFilterCount}</span> )
            </Button>
          </div>

          {/* Center: Search Bar */}
          <div className="w-1/3">
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          {/* Right Side: Add Task Button */}
          <div>
            <Button
              type="button"
              variant="primary"
              icon={PlusIcon}
              iconPosition="left"
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2"
            >
              Add Task
            </Button>
          </div>
        </div>

        {/* Task Columns */}
        <div className="grid grid-cols-3 gap-6">
          {["To Do", "In Progress", "Done"].map((status) => (
            <Column
              key={status}
              title={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>

        {/* Sorting & Filtering Modal */}

        {/* Sorting filtering Modal */}
        {isFilterModalOpen && (
          <SortingFilteringModal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
          />
        )}

        {/* Task Modal */}
        {isModalOpen && (
          <AddTaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </main>
    </DndContext>
  );
};

export default MainContent;
