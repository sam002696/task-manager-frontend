// Date utils
// This file contains utility functions for formatting dates in the application.
//  - formatDate: Formats a date string to a human-readable format.
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString.replace(" ", "T"));

  // Formatting the date in the form "DD MMM YYYY, HH:MM"
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};
