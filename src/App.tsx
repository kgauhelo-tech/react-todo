import "./App.css";
import { Search, Moon, Add, Trash3, Pen } from "reicon-react";
import DetectiveImage from "./assets/seeking-todo.png";
import { useEffect, useRef, useState } from "react";
import { createTodo, getAllTodos, updateTodo } from "./logic/functionality";
import type { todo } from "./types/types";

function App() {
  const [showCreate, setShowCreate] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const checkmarkRef = useRef<HTMLDivElement | null>(null);

  const todoList: todo[] = getAllTodos();
  useEffect(() => {}, [todoList]);

  const saveTodoAndClose = () => {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;

    // Create a due date picture
    const dueDate = new Date();
    const now = new Date();

    if (title === "" || title === null) {
      setErrorMessage("Title is required");
      return;
    } else if (description === "" || description === null) {
      setErrorMessage("Description is required");
      return;
    } else if (dueDate < now || dueDate === null) {
      setErrorMessage("Date is required to be in the future");
      return;
    } else if (
      title !== undefined &&
      title !== null &&
      description !== undefined &&
      description !== null
    ) {
      createTodo(title, description, dueDate);
      setShowCreate(false);
    }
  };

  const handleCheckClick = (
    id: string,
    title: string,
    description: string,
    dueDate: Date,
    isComplete: boolean,
  ) => {
    updateTodo(id, title, description, dueDate, isComplete);

    // checkmarkRef.current?.className = "checkbox-active";

    checkmarkRef.current?.classList.add("checkbox-active")
  };

  return (
    <>
      <main>
        {showCreate && (
          <div className="add-todo">
            <div className="todo-modal">
              <h1 className="title">New Task</h1>
              <input
                ref={titleRef}
                type="text"
                placeholder="Input your task..."
              />
              <div className="btn-cont">
                <button
                  className="cancel-btn"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </button>
                <button className="save-btn" onClick={saveTodoAndClose}>
                  Apply
                </button>
                {errorMessage && <p>{errorMessage}</p>}
              </div>
            </div>
          </div>
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

            <select name="" id="filter">
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
                  <div className="first-col">
                    <div className="checkbox ">
                      <div className="checkbox-active"></div>
                    </div>
                    <p>TODO #1</p>
                    {todoList.map((todo) => (
                      <>
                        <div className="first-col">
                          <div className="checkbox ">
                            <div
                              ref={checkmarkRef}
                              onClick={() =>
                                handleCheckClick(
                                  todo.id,
                                  todo.title,
                                  todo.description,
                                  todo.dueDate,
                                  !todo.isComplete,
                                )
                              }
                            ></div>
                          </div>

                          <p>{todo.title}</p>
                        </div>
                        <div className="actions">
                          <Pen />
                          <Trash3></Trash3>
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
