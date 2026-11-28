import React from "react";
import type { todo } from "../../types/types";
import { Pen } from "reicon-react";

type resultsProps = {
  onCheck: () => void;
  onEdit: () => void;
  onNavigateToDetails: () => void;
  todo: todo;
  selectionState: boolean;
  onSelectItem: () => void;
  isSelected: boolean;
};

export const SearchResults: React.FC<resultsProps> = ({
  onCheck,
  onEdit,
  onNavigateToDetails,
  todo,
  selectionState,
  onSelectItem,
  isSelected,
}) => {
  return (
    <div className="todo-item">
      <div className="first-col">
        <div
          className={selectionState ? "hidden" : "checkbox"}
          onClick={onCheck}
        >
          <div
            className={`${todo.isComplete ? "checkbox-active" : ""} ${selectionState ? "selection-active" : ""}`}
          ></div>
        </div>

        <p
          onClick={onNavigateToDetails}
          className={todo.isComplete ? "strikethrough" : ""}
        >
          {todo.title}
        </p>
      </div>

      <div className="actions">
        <Pen className={selectionState ? "hidden" : ""} onClick={onEdit} />

        <div
          className={selectionState ? "checkbox" : "hidden"}
          onClick={() => {
            onSelectItem();
          }}
        >
          <div className={isSelected ? "selection-active" : ""}></div>
        </div>
      </div>
    </div>
  );
};
