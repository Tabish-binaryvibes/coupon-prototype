import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/";
import Method1 from "../pages/method1/";
import OutPage from "../pages/Dashboard/out";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/method1" element={<Method1 />} />
      <Route path="/out/:id" element={<OutPage />} />
    </Routes>
  );
};

export default AppRoutes;
