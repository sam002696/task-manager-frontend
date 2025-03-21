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
  const [errors, setErrors] = useState({});

  // Updating local filters when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
      setPrevFilters(filters); // Storing previous filters
      setErrors({});
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
    setErrors({});
  };

  const handleApply = () => {
    const { due_date_from, due_date_to } = localFilters;
    const newErrors = {};

    if (due_date_from && !due_date_to) {
      newErrors.due_date_to = "Due date to needs to be selected";
    }

    if (due_date_to && !due_date_from) {
      newErrors.due_date_from = "Due date from needs to be selected";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const filtersChanged =
      JSON.stringify(localFilters) !== JSON.stringify(prevFilters);

    if (filtersChanged) {
      dispatch(setFilters(localFilters));
    }

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
          onChange={(e) => {
            const value = e.target.value;
            setLocalFilters({ ...localFilters, due_date_from: value });

            if (value && errors.due_date_from) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                due_date_from: null,
              }));
            }
          }}
          placeholder="Due Date From"
          error={errors.due_date_from}
        />

        <Input
          label={"Due date to"}
          type="date"
          value={localFilters.due_date_to || ""}
          onChange={(e) => {
            const value = e.target.value;
            setLocalFilters({ ...localFilters, due_date_to: value });

            if (value && errors.due_date_to) {
              setErrors((prevErrors) => ({ ...prevErrors, due_date_to: null }));
            }
          }}
          placeholder="Due Date To"
          error={errors.due_date_to}
        />
      </div>
    </Modal>
  );
};

export default SortingFilteringModal;
