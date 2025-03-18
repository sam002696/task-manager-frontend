import React, { useEffect, useState } from "react";
import Column from "./Column";
import Button from "../ui/Button";
import { DndContext } from "@dnd-kit/core";
import AddTaskModal from "../tasks/AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import InputSelect from "../ui/InputSelect";
import { setFilters } from "../../store/taskSlice";
import Input from "../ui/Input";

const MainContent = () => {
  const filters = useSelector((state) => state.tasks.filters);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const clearFilters = () => {
    dispatch(
      setFilters({
        status: "All",
        sort: "newest",
        search: "",
        due_date_from: "",
        due_date_to: "",
      })
    );
    setSearchTerm("");
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-2xl font-bold text-gray-900">Studio board</p>
          </div>

          {/*  Sorting & Filtering Controls */}
          <div className="flex gap-4 items-center">
            {/*  Search Bar */}
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
            />

            {/* Filter By Status */}
            <InputSelect
              name="filterStatus"
              value={filters.status}
              onChange={(e) =>
                dispatch(setFilters({ ...filters, status: e.target.value }))
              }
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
              value={filters.sort}
              onChange={(e) =>
                dispatch(setFilters({ ...filters, sort: e.target.value }))
              }
              options={[
                { value: "newest", label: "Newest First" },
                { value: "oldest", label: "Oldest First" },
              ]}
            />

            {/* Date Range Filters */}
            <Input
              type="date"
              value={filters.due_date_from || ""}
              onChange={(e) =>
                dispatch(
                  setFilters({ ...filters, due_date_from: e.target.value })
                )
              }
              placeholder="Due Date From"
            />

            <Input
              type="date"
              value={filters.due_date_to || ""}
              onChange={(e) =>
                dispatch(
                  setFilters({ ...filters, due_date_to: e.target.value })
                )
              }
              placeholder="Due Date To"
            />

            <Button type="button" variant="secondary" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>

          <div>
            <Button
              type="button"
              variant="primary"
              onClick={() => setIsModalOpen(true)}
            >
              Add task
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
