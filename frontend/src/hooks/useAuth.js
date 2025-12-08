import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../api/apiClient.js';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        // Redireciona para login se não houver token
        navigate('/', { replace: true });
      } else {
        // Define o token no axios
        setAuthToken(token);
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  return loading;
};

export default useAuth;
