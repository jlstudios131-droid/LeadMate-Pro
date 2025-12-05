import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Layout from './components/Layout.jsx';
import useAuth from './hooks/useAuth.js';
import Notifications from './components/Notifications.jsx';

function App() {
  // Hook de autenticação global
  const loading = useAuth();

  if (loading) return <p className="text-center mt-20 text-gray-500">Carregando...</p>;

  return (
    <>
      <Notifications /> {/* Notificações globais */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Rotas protegidas com Layout */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <DashboardPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
