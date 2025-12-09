import { useState, useEffect } from 'react';
import apiClient, { setAuthToken } from '../api/apiClient.js';
import { toast } from 'react-hot-toast';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Se existir token, define globalmente
        const token = localStorage.getItem('token');
        if (token) setAuthToken(token);

        const res = await apiClient.get(url, options);

        if (isMounted) setData(res.data);
      } catch (err) {
        if (isMounted) {
          setError(err);

          // Tratamento premium para token expirado
          if (err.response?.status === 401) {
            localStorage.removeItem('token');
            setAuthToken(null);
            toast.error('Sessão expirada. Faça login novamente.');
            window.location.href = '/';
          } else {
            toast.error('Erro ao carregar dados.');
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(options)]); // Reexecuta se URL ou opções mudarem

  return { data, loading, error };
};

export default useFetch;
