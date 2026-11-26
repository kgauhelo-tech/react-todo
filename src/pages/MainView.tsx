import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Search, Moon, Add } from "reicon-react";
import { AddTask } from "../components/AddTask";
import { DeleteTask } from "../components/DeleteTask";
import { EditTask } from "../components/EditTask";
import { ListItems } from "../components/todoListView/ListView";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
} from "../logic/functionality";
import type { todo } from "../types/types";
import DetectiveImage from "../assets/seeking-todo.png";

export const MainView = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const dueDateRef = useRef<HTMLInputElement | null>(null);

  const [todo, setTodo] = useState<todo>();
  const [todoList, setTodoList] = useState<todo[]>(() => getAllTodos());

  const navigate = useNavigate();

  const saveTodoAndClose = () => {
    setErrorMessage(null);
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const dueDate = dueDateRef.current?.value;

    if (title === "" || title === null) {
      setErrorMessage("Title is required");
      return;
    } else if (description === "" || description === null) {
      setErrorMessage("Description is required");
      return;
    } else if (dueDate === undefined || dueDate === null || dueDate === "") {
      setErrorMessage("Date is required to be in the future");
      return;
    } else if (
      title !== undefined &&
      title !== null &&
      description !== undefined &&
      description !== null &&
      dueDate !== undefined
    ) {
      createTodo(title, description, dueDate);
      setTodoList(getAllTodos());
      setShowCreate(false);
    }
  };

  const updateTodoAndClose = (id: string, isComplete: boolean) => {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const dueDate = dueDateRef.current?.value;

    if (title === "" || title === null) {
      setErrorMessage("Title is required");
      return;
    } else if (description === "" || description === null) {
      setErrorMessage("Description is required");
      return;
    } else if (dueDate === undefined || dueDate === null || dueDate === "") {
      setErrorMessage("Date is required to be in the future");
      return;
    } else if (
      title !== undefined &&
      title !== null &&
      description !== undefined &&
      description !== null &&
      dueDate !== undefined
    ) {
      updateTodo(id, title, description, dueDate, isComplete);
      setTodoList(getAllTodos());
      setShowEdit(false);
    }
  };

  const updateStatus = (id: string, currentStatus: boolean) => {
    const updatedStatus = !currentStatus;
    updateTodoStatus(id, updatedStatus);
    setTodoList(getAllTodos());
  };

  const deleteTask = (id: string) => {
    deleteTodo(id);
    setTodo(undefined);
    setShowDelete(false);
    setTodoList(getAllTodos());
  };

  const currentTodo = (id: string) => {
    const index = todoList?.findIndex((todo) => todo.id === id);

    if (todoList && index > -1) return todoList[index];
  };

  const handleNaviattion = (id: string) => {
    navigate(`/todoDetails/${id}`);
  };

  return (
    <main>
      {showCreate && (
        <AddTask
          titleRef={titleRef}
          descriptionRef={descriptionRef}
          dueDateRef={dueDateRef}
          errorMessage={errorMessage}
          onDisableOverlay={() => setShowCreate(false)}
          onSave={saveTodoAndClose}
        />
      )}

      {showEdit && (
        <EditTask
          titleRef={titleRef}
          descriptionRef={descriptionRef}
          dueDateRef={dueDateRef}
          todo={
            todo !== undefined
              ? todo
              : {
                  id: "",
                  title: "",
                  description: "",
                  dueDate: "",
                  isComplete: false,
                }
          }
          errorMessage={errorMessage}
          onDisableOverlay={() => setShowEdit(false)}
          onSave={() =>
            todo !== undefined
              ? updateTodoAndClose(todo.id, todo.isComplete)
              : {}
          }
        />
      )}

      {showDelete && (
        <DeleteTask
          onDelete={() => deleteTask(todo ? todo.id : "")}
          onDisableOverlay={() => setShowDelete(false)}
          todoTitle={todo ? todo.title : ""}
        />
      )}

      <div className="main">
        <div className="title-container">
          <h1 className="inter-bold title" style={{ textAlign: "center" }}>
            TODO LIST
          </h1>
        </div>

        <div className="top-row-container">
          <div className="search-container">
            <input type="text" placeholder="Search todo..." />
            <div className="search-icon-container">
              <Search />
            </div>
          </div>

          <select name="filter" id="filter">
            <option>All</option>
            <option>Complete</option>
            <option>Incomplete</option>
          </select>

          <button className="theme-switcher">
            <Moon />
          </button>
        </div>

        <div className="content-container">
          <div className="todo-display">
            {todoList && todoList.length > 0 ? (
              <div className="todo-item-cont">
                {todoList.map((todo) => (
                  <ListItems
                    onEdit={() => {
                      const currentTask = currentTodo(todo ? todo.id : "");
                      setTodo(currentTask);
                      setShowEdit(!showEdit);
                    }}
                    onCheck={
                      todo
                        ? () => updateStatus(todo.id, todo.isComplete)
                        : () => {}
                    }
                    onDelete={() => setShowDelete(true)}
                    onNavigateToDetails={() => {
                      const currentTask = currentTodo(todo ? todo.id : "");
                      setTodo(currentTask);
                      handleNaviattion(currentTask ? currentTask.id : "");
                    }}
                    todo={todo}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-img-cont">
                <img src={DetectiveImage} alt="" />
                <p>Empty...</p>
              </div>
            )}

            <button className="add-btn" onClick={() => setShowCreate(true)}>
              <Add></Add>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
