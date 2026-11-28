import React from "react";

type deleteTaskProps = {
  onDelete: () => void;
  onDisableOverlay: () => void;
};

export const DeleteTask: React.FC<deleteTaskProps> = ({
  onDelete,
  onDisableOverlay,
}) => {
  return (
    <div className="add-todo">
      <div className="todo-modal delete-todo">
        <h2 className="heading">Delete Tasks</h2>
        <p>Delete selected tasks?</p>

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
