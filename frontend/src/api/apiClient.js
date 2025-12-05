import axios from 'axios';

// URL final do backend com /api
const API_URL = 'https://lead-mate-pro.vercel.app/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // timeout de 10s
});

// Configura token de autenticação
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Interceptor de requisição (opcional: pode adicionar loading global)
apiClient.interceptors.request.use(
  (config) => {
    // Exemplo: log em desenvolvimento
    if (import.meta.env.MODE === 'development') {
      console.log('Requisição enviada:', config);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log de erro global
    console.error('Erro na API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
