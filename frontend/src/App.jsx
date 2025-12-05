import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardPage from "./pages/DashboardPage";

// Componente de rota protegida
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // pode substituir depois por contexto/Zustand

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard protegido */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
