import "./App.css";
import { Route, Routes } from "react-router";
import { MainView } from "./pages/MainView";
import { TodoDetails } from "./pages/TodoDetails";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<MainView />}></Route>
        <Route path="/todoDetails/:id" element={<TodoDetails />} />
      </Routes>
    </>
  );
}

export default App;
