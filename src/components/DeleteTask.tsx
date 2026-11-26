import React from "react";

type deleteTaskProps = {
  onDelete: () => void;
  todoTitle: string;
  onDisableOverlay: () => void;
};

export const DeleteTask: React.FC<deleteTaskProps> = ({
  todoTitle,
  onDelete,
  onDisableOverlay,
}) => {
  return (
    <div className="add-todo">
      <div className="todo-modal">
        <h2 className="heading">Delete Task</h2>
        <p>Are you sure you want to delete: {todoTitle}</p>

        <div className="btn-cont">
          <button className="cancel-btn" onClick={onDisableOverlay}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
