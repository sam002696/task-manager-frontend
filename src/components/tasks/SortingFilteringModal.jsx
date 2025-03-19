import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal";

import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/taskSlice";
import InputSelect from "../ui/InputSelect";
import Input from "../ui/Input";

const SortingFilteringModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.tasks.filters);
  const [localFilters, setLocalFilters] = useState(filters);
  const [prevFilters, setPrevFilters] = useState(filters);

  // Update local filters when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
      setPrevFilters(filters); // Store previous filters
    }
  }, [isOpen, filters]);

  const clearFilters = () => {
    setLocalFilters({
      status: "All",
      sort: "newest",
      search: "",
      due_date_from: null,
      due_date_to: null,
    });
  };

  const handleApply = () => {
    // Check if any filter has changed
    const filtersChanged =
      JSON.stringify(localFilters) !== JSON.stringify(prevFilters);

    if (filtersChanged) {
      dispatch(setFilters(localFilters));
    }

    // Close modal after applying filters
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sorting & Filtering"
      primaryAction={{
        label: "Apply",
        onClick: handleApply,
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
          value={localFilters.status}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, status: e.target.value })
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
          value={localFilters.sort}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, sort: e.target.value })
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
          value={localFilters.due_date_from || ""}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, due_date_from: e.target.value })
          }
          placeholder="Due Date From"
        />

        <Input
          label={"Due date to"}
          type="date"
          value={localFilters.due_date_to || ""}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, due_date_to: e.target.value })
          }
          placeholder="Due Date To"
        />
      </div>
    </Modal>
  );
};

export default SortingFilteringModal;
