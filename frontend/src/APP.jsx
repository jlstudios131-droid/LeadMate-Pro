import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./páginas/Login";
import Signup from "./páginas/Signup";
import DashboardPage from "./páginas/DashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
