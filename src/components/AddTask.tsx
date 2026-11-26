import React, { type RefObject } from "react";

type addTaskProps = {
  titleRef: RefObject<HTMLInputElement | null>;
  descriptionRef: RefObject<HTMLTextAreaElement | null>;
  dueDateRef: RefObject<HTMLInputElement | null>;
  errorMessage: string | null;
  onDisableOverlay: () => void;

  onSave: () => void;
};

export const AddTask: React.FC<addTaskProps> = ({
  titleRef,
  descriptionRef,
  dueDateRef,
  errorMessage,
  onDisableOverlay,
  onSave,
}) => {
  return (
    <div className="add-todo">
      <div className="todo-modal">
        <h1 className="title">New Task</h1>
        <input ref={titleRef} type="text" placeholder="Input your task..." />

        <textarea
          ref={descriptionRef}
          name="description"
          id="description"
          placeholder="Describe your task here..."
        ></textarea>

        <input ref={dueDateRef} type="date" name="" id="" />
        <div className="btn-cont">
          <button className="cancel-btn" onClick={onDisableOverlay}>
            Cancel
          </button>
          <button className="save-btn" onClick={onSave}>
            Save
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};
