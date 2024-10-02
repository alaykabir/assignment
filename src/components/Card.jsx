import React from "react";

const Card = ({ id, title, status, priority, userId, userName }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">
        <p>
          <strong>ID:</strong> {id}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Priority:</strong> {priority}
        </p>
        <p>
          <strong>userId:</strong> {userId}
        </p>
        <p>User: {userName}</p>
      </div>
    </div>
  );
};

export default Card;
