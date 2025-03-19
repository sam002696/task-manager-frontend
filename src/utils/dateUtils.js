export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString.replace(" ", "T"));

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};
