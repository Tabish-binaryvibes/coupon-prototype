import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/";
import ViewUser from "../pages/Dashboard/view";
import ViewCompany from "../pages/company/view";
import ViewMember from "../pages/member/view";
import OutPage from "../pages/Dashboard/out";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
         <Route path="/out/:id" element={<OutPage />} />
      <Route path="/member/view/:id" element={<ViewUser />} />
      <Route path="/company/view/:id" element={<ViewCompany />} />
      <Route path="/company-member/view/:id" element={<ViewMember />} />
    </Routes>
  );
};

export default AppRoutes;
