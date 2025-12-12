import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

import Layout from './components/Layout.jsx';
import useAuth from './hooks/useAuth.js';
import Notifications from './components/Notifications.jsx';

function App({ darkMode, toggleDarkMode }) {
  const { user, loading } = useAuth(); // recomendado retornar user também

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500 animate-pulse">
        Carregando...
      </p>
    );
  }

  // bloqueia o acesso a áreas privadas
  const PrivateRoute = ({ children }) => {
    if (!user) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <>
      <Notifications darkMode={darkMode} />

      <Routes>
        {/* Público */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Privado */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
