import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./Todo/index.tsx";
import { IBanking } from "./IBanking/index.tsx";
import List from "./List/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/Todo" element={<Todo />}/>
      <Route path="/Login" element={<IBanking />}/>
      <Route path="/List" element={<List />}/>
    </Routes>
  </Router>
);
