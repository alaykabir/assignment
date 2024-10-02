export const sortByTitle = (tasks) => {
  return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
};

export const sortByPriority = (tasks) => {
  return [...tasks].sort((a, b) => b.priority - a.priority);
};
