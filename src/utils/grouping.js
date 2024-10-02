export const groupByPriority = (tasks) => {
  return tasks.reduce((acc, task) => {
    const priority = task.priority;
    if (!acc[priority]) {
      acc[priority] = [];
    }
    acc[priority].push(task);
    return acc;
  }, {});
};

// Function to group tasks by status
export const groupByStatus = (tasks) => {
  return tasks.reduce((acc, task) => {
    const status = task.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {});
};

// Function to group tasks by user
export const groupByUser = (tasks, users) => {
  return tasks.reduce((acc, task) => {
    const userName = getUserName(task.userId, users);
    if (!acc[userName]) {
      acc[userName] = [];
    }
    acc[userName].push(task);
    return acc;
  }, {});
};
export const getUserName = (userId, users) => {
  const user = users.find((user) => user.id === userId);
  return user ? user.name : "Unknown User";
};
// Helper function to get user name by userId
