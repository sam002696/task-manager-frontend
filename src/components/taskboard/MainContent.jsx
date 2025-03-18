import React, { useEffect, useState } from "react";
import Column from "./Column";
import Button from "../ui/Button";
import { DndContext } from "@dnd-kit/core";
import AddTaskModal from "../tasks/AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import Input from "../ui/Input";
import { FunnelIcon } from "@heroicons/react/24/outline";
import SortingFilteringModal from "../tasks/SortingFilteringModal";

const MainContent = () => {
  const activeFilterCount = useSelector(
    (state) => state.tasks.activeFilterCount
  );
  const filters = useSelector((state) => state.tasks.filters);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  useEffect(() => {
    dispatch({
      type: "taskLists",
    });
  }, [
    dispatch,
    filters.status,
    filters.sort,
    filters.due_date_from,
    filters.due_date_to,
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch({ type: "searchTasks", payload: e.target.value });
  };

  // Handling Drag & Drop
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id; // The column where the task is dropped

    dispatch({
      type: "updateTask",
      payload: {
        taskId,
        taskData: { status: newStatus },
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
              variant="filter"
              icon={FunnelIcon}
              iconPosition="left"
            >
              Sorting & Filtering ({activeFilterCount})
            </Button>
          </div>

          {/* Center: Search Bar */}
          <div className="w-1/3">
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full" // Ensures search bar takes full width
            />
          </div>

          {/* Right Side: Add Task Button */}
          <div>
            <Button
              type="button"
              variant="primary"
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
