import "./App.css";
import { Search, Moon, Add, Trash3, Pen } from "reicon-react";
import DetectiveImage from "./assets/seeking-todo.png";
import { useEffect, useRef, useState } from "react";
import { createTodo, getAllTodos, updateTodo } from "./logic/functionality";
import type { todo } from "./types/types";
import { EditTask } from "./components/EditTask";
import { AddTask } from "./components/AddTask";

function App() {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const dueDateRef = useRef<HTMLInputElement | null>(null);

  const [isComplete, setIsComplete] = useState(false);

  const todoList: todo[] = getAllTodos();

  useEffect(() => {}, [todoList]);

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
      createTodo(title, description, dueDate);
      setShowCreate(false);
    }

    updateTodo(id, title, description, dueDate, isComplete);
    setShowEdit(false);
  };

  const handleCheckClick = (
    id: string,
    title: string,
    description: string,
    dueDate: string,
    isComplete: boolean,
  ) => {
    setIsComplete(!isComplete);
    updateTodo(id, title, description, dueDate, isComplete);
  };

  const currentTodo = (id: string) => {
    const index = todoList.findIndex((todo) => todo.id === id);

    return todoList[index];
  };

  return (
    <>
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
            todo={currentTodo}
            errorMessage={errorMessage}
            onDisableOverlay={() => setShowCreate(false)}
            onSave={() => updateTodoAndClose( isComplete)}
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
              {todoList.length > 0 ? (
                <div className="todo-item">
                  <div className="todo-list">
                    {todoList.map((todo) => (
                      <>
                        <div
                          key={todo.id}
                          className="first-col"
                          onClick={() =>
                            handleCheckClick(
                              todo.id,
                              todo.title,
                              todo.description,
                              todo.dueDate,
                              isComplete,
                            )
                          }
                        >
                          <div className="checkbox ">
                            <div
                              className={isComplete ? "checkbox-active" : ""}
                            ></div>
                          </div>

                          <p className={isComplete ? "strikethrough" : ""}>
                            {todo.title}
                          </p>
                        </div>

                        <div className="actions">
                          <Pen
                            onClick={() => {
                              currentTodo(todo.id);
                              setShowEdit(!showEdit);
                            }}
                          />
                          <Trash3 />
                        </div>
                      </>
                    ))}
                  </div>
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
    </>
  );
}

export default App;
