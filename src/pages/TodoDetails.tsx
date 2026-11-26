import React from "react";
import { getAllTodos, todoList } from "../logic/functionality";
import { useNavigate, useParams } from "react-router";
import styles from "./TodoDetails.module.css";

export const TodoDetails = () => {
  const { id } = useParams();

  const list = getAllTodos();

  const index = list.findIndex((todo) => todo.id === id);

  const todo = list[index];

  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles["overall-container"]}>
      <div className={styles["details-container"]}>
        <h1 className={styles["heading"]}>Task Details</h1>

        <div className={styles["detail-container"]}>
          <p className={styles["label"]}>Title</p>
          <h2 className={styles["title"]}>{todo.title}</h2>
        </div>

        <div className={styles["detail-container"]}>
          <p className={styles["label"]}>Description</p>
          <h3 className={styles["description"]}>{todo.description}</h3>
        </div>

        <div className={styles["detail-container"]}>
          <p className={styles["label"]}>Task Status</p>
          <p className={styles["status"]}>
            {todo.isComplete ? "Completed" : "Incomplete"}
          </p>
        </div>
        <div className={styles["detail-container"]}>
          <p className={styles["label"]}>Due Date</p>
          <p className="date">{todo.dueDate}</p>
        </div>

        <button className={styles["back-btn"]} onClick={navigateBack}>
          Back
        </button>
      </div>
    </div>
  );
};
