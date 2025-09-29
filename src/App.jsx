import "./App.css";
import { Routes } from "react-router-dom";
import AppRoutes from "./Routes";

function App() {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-12 p-4">
            <AppRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
