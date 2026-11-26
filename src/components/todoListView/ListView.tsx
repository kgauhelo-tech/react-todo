import React from "react";
import type { todo } from "../../types/types";
import { Pen, Trash3, Add } from "reicon-react";

type listItemProps = {
  onCheck: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onNavigateToDetails: () => void;
  todo: todo
};

export const ListItems: React.FC<listItemProps> = ({
  onCheck,
  onEdit,
  onDelete,
  onNavigateToDetails,
  todo
}) => {
  return (
    <div className="todo-item" key={todo.id}>
      <div className="first-col">
        <div className="checkbox" onClick={onCheck}>
          <div className={todo.isComplete ? "checkbox-active" : ""}></div>
        </div>

        <p
          onClick={onNavigateToDetails}
          className={todo.isComplete ? "strikethrough" : ""}
        >
          {todo.title}
        </p>
      </div>

      <div className="actions">
        <Pen onClick={onEdit} />
        <Trash3 onClick={onDelete} />
      </div>
    </div>
  );
};
