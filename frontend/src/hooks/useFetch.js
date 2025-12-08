import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient.js';

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
        const res = await apiClient.get(url, options);
        if (isMounted) setData(res.data);
      } catch (err) {
        if (isMounted) setError(err);
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
