import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Layout from './components/Layout.jsx';
import useAuth from './hooks/useAuth.js';
import Notifications from './components/Notifications.jsx';

function App({ darkMode, toggleDarkMode }) {
  // Hook de autenticação global
  const loading = useAuth();

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Carregando...</p>;

  return (
    <>
      {/* Notificações globais */}
      <Notifications darkMode={darkMode} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Rotas protegidas com Layout */}
        <Route
          path="/dashboard"
          element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <DashboardPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Settings />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
