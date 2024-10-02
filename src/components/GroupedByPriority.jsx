import React from "react";
import Card from "./Card";
import { getUserName } from "./utils/grouping";

const GroupedByPriority = ({ groupedTasksByPriority, users }) => {
  return (
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
              userName={getUserName(task.userId, users)}
              tag={task.tag[0]} // Fetch user name based on userId
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GroupedByPriority;
