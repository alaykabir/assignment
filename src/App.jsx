import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card"; // Assuming Card component is in the same directory

const App = () => {
  const [tasks, setTasks] = useState([]); // State to store the tasks
  const [users, setUsers] = useState([]);
  const [sortOption, setSortOption] = useState(null); // State for sorting option
  const [groupedByPriority, setGroupedByPriority] = useState(false); // State to toggle grouping by priority
  const [groupedByStatus, setGroupedByStatus] = useState(false); // State for grouping by status
  const [groupedByUser, setGroupedByUser] = useState(false); // State for grouping by user
  // Fetch data from the API using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setTasks(response.data.tickets); // Store the fetched data in the state
        setUsers(response.data.users);
        // console.log(response.data.users);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData(); // Call the fetch function on component mount
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to sort tasks by title
  const sortByTitle = () => {
    const sortedTasks = [...tasks].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setTasks(sortedTasks); // Update tasks with sorted array
    setSortOption("title");
  };

  // Function to sort tasks by priority (assuming priority is a number, higher is more important)
  const sortByPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => b.priority - a.priority);
    setTasks(sortedTasks); // Update tasks with sorted array
    setSortOption("priority");
  };

  const groupByPriority = () => {
    setGroupedByPriority(!groupedByPriority); // Toggle the grouping state
    setGroupedByStatus(false); // Ensure we're not grouping by status at the same time
    setGroupedByUser(false); // Ensure we're not grouping by user at the same time
  };
  const groupByStatus = () => {
    setGroupedByStatus(!groupedByStatus); // Toggle the grouping state
    setGroupedByPriority(false); // Ensure we're not grouping by priority at the same time
    setGroupedByUser(false); // Ensure we're not grouping by user at the same time
  };
  const groupByUser = () => {
    setGroupedByUser(!groupedByUser); // Toggle the grouping state
    setGroupedByPriority(false); // Ensure we're not grouping by priority at the same time
    setGroupedByStatus(false); // Ensure we're not grouping by status at the same time
  };

  const groupedTasksByPriority = tasks.reduce((acc, task) => {
    const priority = task.priority;
    if (!acc[priority]) {
      acc[priority] = [];
    }
    acc[priority].push(task);
    return acc;
  }, {});
  const groupedTasksByStatus = tasks.reduce((acc, task) => {
    const status = task.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {});

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User"; // Return the user's name or 'Unknown User' if not found
  };

  const groupedTasksByUser = tasks.reduce((acc, task) => {
    const userName = getUserName(task.userId); // Get the user's name
    if (!acc[userName]) {
      acc[userName] = [];
    }
    acc[userName].push(task);
    return acc;
  }, {});

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {/* Buttons for sorting */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={sortByTitle}
          style={{ marginRight: "10px", padding: "10px", cursor: "pointer" }}
        >
          Sort by Title
        </button>
        <button
          onClick={sortByPriority}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          Sort by Priority
        </button>
        <p>Current Sort: {sortOption || "None"}</p>
        <button
          onClick={groupByPriority}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          {groupedByPriority ? "Ungroup by Priority" : "Group by Priority"}
        </button>
        <button
          onClick={groupByStatus}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          {groupedByStatus ? "Ungroup by Status" : "Group by Status"}
        </button>
        <button
          onClick={groupByUser}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          {groupedByUser ? "Ungroup by User" : "Group by User"}
        </button>
      </div>

      {/* If grouped by priority, display in columns by priority */}
      {groupedByPriority ? (
        <div style={{ display: "flex", gap: "20px" }}>
          {Object.keys(groupedTasksByPriority).map((priority) => (
            <div key={priority} style={{ width: "200px" }}>
              <h3>Priority: {priority}</h3>
              {groupedTasksByPriority[priority].map((task) => (
                <Card
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  status={task.status}
                  priority={task.priority}
                  userName={getUserName(task.userId)} // Fetch user name based on userId
                />
              ))}
            </div>
          ))}
        </div>
      ) : groupedByStatus ? (
        // If grouped by status, display in columns by status
        <div style={{ display: "flex", gap: "20px" }}>
          {Object.keys(groupedTasksByStatus).map((status) => (
            <div key={status} style={{ width: "200px" }}>
              <h3>Status: {status}</h3>
              {groupedTasksByStatus[status].map((task) => (
                <Card
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  status={task.status}
                  priority={task.priority}
                  userName={getUserName(task.userId)} // Fetch user name based on userId
                />
              ))}
            </div>
          ))}
        </div>
      ) : groupedByUser ? (
        // If grouped by user, display in columns by user
        <div style={{ display: "flex", gap: "20px" }}>
          {Object.keys(groupedTasksByUser).map((userName) => (
            <div key={userName} style={{ width: "200px" }}>
              <h3>User: {userName}</h3>
              {groupedTasksByUser[userName].map((task) => (
                <Card
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  status={task.status}
                  priority={task.priority}
                  userName={userName} // Directly use user name
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        // Default view: display all tasks in a single row
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {tasks.map((task) => (
            <Card
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              priority={task.priority}
              userName={getUserName(task.userId)} // Fetch user name based on userId
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
