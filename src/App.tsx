import "./App.css";
import { Search, Moon, Add, Trash3, Pen } from "reicon-react";

function App() {
  return (
    <>
      <main>
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
                <input type="checkbox" name="" id="" />
                <p>TODO #1</p>
              </div>

              <div className="actions">
                <Pen></Pen>
                <Trash3></Trash3>
              </div>
            </div>

            <button className="add-btn">
              <Add></Add>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
