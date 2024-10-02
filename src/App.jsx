import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  Navbar,
  GroupedByPriority,
  GroupedByStatus,
  GroupedByUser,
} from "./components";
import { sortByTitle, sortByPriority } from "./utils/ordering";
import {
  groupByPriority,
  groupByStatus,
  groupByUser,
  getUserName,
} from "./utils/grouping";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupedByPriority, setGroupedByPriority] = useState(false);
  const [groupedByStatus, setGroupedByStatus] = useState(false);
  const [groupedByUser, setGroupedByUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setTasks(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, []);

  const handleSortByTitle = () => {
    setTasks(sortByTitle(tasks));
  };

  const handleSortByPriority = () => {
    setTasks(sortByPriority(tasks));
  };

  const handleGroupByPriority = () => {
    setGroupedByPriority(!groupedByPriority);
    setGroupedByStatus(false);
    setGroupedByUser(false);
  };

  const handleGroupByStatus = () => {
    setGroupedByStatus(!groupedByStatus);
    setGroupedByPriority(false);
    setGroupedByUser(false);
  };

  const handleGroupByUser = () => {
    setGroupedByUser(!groupedByUser);
    setGroupedByPriority(false);
    setGroupedByStatus(false);
  };

  const groupedTasksByPriority = groupByPriority(tasks);
  const groupedTasksByStatus = groupByStatus(tasks);
  const groupedTasksByUser = groupByUser(tasks, users);

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <Navbar
        onSortByTitle={handleSortByTitle}
        onSortByPriority={handleSortByPriority}
        onGroupByPriority={handleGroupByPriority}
        onGroupByStatus={handleGroupByStatus}
        onGroupByUser={handleGroupByUser}
        isGroupedByPriority={groupedByPriority}
        isGroupedByStatus={groupedByStatus}
        isGroupedByUser={groupedByUser}
      />

      {groupedByPriority ? (
        <GroupedByPriority
          groupedTasksByPriority={groupedTasksByPriority}
          users={users}
        />
      ) : groupedByStatus ? (
        <GroupedByStatus
          groupedTasksByStatus={groupedTasksByStatus}
          users={users}
        />
      ) : groupedByUser ? (
        <GroupedByUser groupedTasksByUser={groupedTasksByUser} users={users} />
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {tasks.map((task) => (
            <Card
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              priority={task.priority}
              userName={getUserName(task.userId, users)}
              tag={task.tag[0]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
