import React from "react";
import Modal from "../ui/Modal";

import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/taskSlice";
import InputSelect from "../ui/InputSelect";
import Input from "../ui/Input";

const SortingFilteringModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.tasks.filters);

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
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sorting & Filtering"
      primaryAction={{
        label: "Close",
        onClick: onClose,
      }}
      secondaryAction={{
        label: "Clear Filters",
        onClick: clearFilters,
      }}
    >
      <div className="flex flex-col gap-4">
        {/* Filter By Status */}
        <InputSelect
          label={"Status"}
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
          label={"Sort order"}
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
          label={"Due date from"}
          type="date"
          value={filters.due_date_from || ""}
          onChange={(e) =>
            dispatch(setFilters({ ...filters, due_date_from: e.target.value }))
          }
          placeholder="Due Date From"
        />

        <Input
          label={"Due date to"}
          type="date"
          value={filters.due_date_to || ""}
          onChange={(e) =>
            dispatch(setFilters({ ...filters, due_date_to: e.target.value }))
          }
          placeholder="Due Date To"
        />
      </div>
    </Modal>
  );
};

export default SortingFilteringModal;
