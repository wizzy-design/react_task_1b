import React from "react";
import { AuthContext } from "./authContext";
import { Routes, Route } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function renderRoutes(role) {
  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      );
    // break;
    default:
      return (
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      );
    // break;
  }
}

function Main() {
  const { state, loading } = React.useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-5xl text center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="w-full h-full">
            {/* px-5 py-10 page-wrapper */}
            {console.log("Auth State: ", state)}
            {/* Log state values for debugging */}
            {!state.isAuthenticated
              ? renderRoutes("none")
              : renderRoutes(state.role)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
