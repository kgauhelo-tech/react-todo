import React, { type RefObject } from "react";
import type { todo } from "../types/types";

type editTaskProps = {
  titleRef: RefObject<HTMLInputElement | null>;
  descriptionRef: RefObject<HTMLTextAreaElement | null>;
  dueDateRef: RefObject<HTMLInputElement | null>;
  errorMessage: string | null;
  todo: todo;
  onDisableOverlay: () => void;

  onSave: () => void;
};

export const EditTask: React.FC<editTaskProps> = ({
  todo,
  titleRef,
  descriptionRef,
  dueDateRef,
  onSave,
  onDisableOverlay,
  errorMessage,
}) => {
  return (
    <div className="add-todo">
      <div className="todo-modal">
        <h1 className="title">Edit Task</h1>
        <input ref={titleRef} type="text" value={todo.title} />

        <textarea
          ref={descriptionRef}
          name="description"
          id="description"
          value={todo.description}
        ></textarea>

        <input
          ref={dueDateRef}
          type="date"
          name=""
          id=""
          value={todo.dueDate}
        />
        <div className="btn-cont">
          <button className="cancel-btn" onClick={onDisableOverlay}>
            Cancel
          </button>
          <button className="save-btn" onClick={onSave}>
            Apply Chnages
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};
