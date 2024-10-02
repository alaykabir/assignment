import React from "react";
import Card from "./Card";
import { getUserName } from "./utils";

const GroupedByStatus = ({ groupedTasksByStatus, users }) => {
  return (
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
              userName={getUserName(task.userId, users)}
              tag={task.tag[0]} // Fetch user name based on userId
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GroupedByStatus;
