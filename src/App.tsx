import "./App.css";
import { Search, Moon, Add, Trash3, Pen } from "reicon-react";

function App() {
  return (
    <>
      <main>
        <div className="add-todo">
          <div className="todo-modal">
            <h1 className="title">New Task</h1>
            <input type="text" placeholder="Input your task..." />
            <div className="btn-cont">
              <button className="cancel-btn">Cancel</button>
              <button className="save-btn">Apply</button>
            </div>
          </div>
        </div>
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
              <div className="todo-item">
                <div className="first-col">
                  <div className="checkbox ">
                    <div className="checkbox-active"></div>
                  </div>
                  <p>TODO #1</p>
                </div>

                <div className="actions">
                  <Pen />
                  <Trash3></Trash3>
                </div>
              </div>

              <button className="add-btn">
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
