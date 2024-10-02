import React from "react";
import Card from "./Card";
import { getUserName } from "./utils";

const GroupedByUser = ({ groupedTasksByUser, users }) => {
  return (
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
              userName={getUserName(task.userId, users)}
              tag={task.tag[0]} // Fetch user name based on userId
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GroupedByUser;
