import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { setAuthToken } from '../api/apiClient.js';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          // Sem token: redireciona para login
          navigate('/', { replace: true });
          return;
        }

        // Define token globalmente
        setAuthToken(token);

        // Valida token no backend
        await apiClient.get('/auth/validate-token');

      } catch (err) {
        console.warn('Token inválido ou expirado. Redirecionando para login.', err);

        // Remove token inválido
        localStorage.removeItem('token');
        setAuthToken(null);

        // Redireciona para login
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return loading;
};

export default useAuth;
