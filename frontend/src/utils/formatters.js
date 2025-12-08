// SRC/utilis/formatters.js

// Formata números como moeda (ex: 1000 -> 1.000,00€)
export const formatCurrency = (value) => {
  if (value == null) return '0,00€';
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

// Formata datas (ex: 2025-12-05T08:36 -> 05/12/2025)
export const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('pt-PT');
};

// Formata datas completas com hora (ex: 2025-12-05T08:36 -> 05/12/2025 08:36)
export const formatDateTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString('pt-PT', { hour12: false });
};

// Formata porcentagens (ex: 0.45 -> 45%)
export const formatPercentage = (value) => {
  if (value == null) return '0%';
  return `${(value * 100).toFixed(0)}%`;
};

// Abrevia nomes longos (ex: João Pedro Silva -> João P. Silva)
export const abbreviateName = (fullName) => {
  if (!fullName) return '';
  const parts = fullName.trim().split(' ');
  if (parts.length <= 2) return fullName;
  return `${parts[0]} ${parts.slice(1, -1).map(p => p[0] + '.').join(' ')} ${parts[parts.length - 1]}`;
};

// Calcula idade a partir de data de nascimento
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  const diff = new Date() - new Date(birthDate);
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

// Capitaliza a primeira letra de cada palavra
export const capitalizeWords = (text) => {
  if (!text) return '';
  return text.replace(/\b\w/g, char => char.toUpperCase());
};

// Trunca texto com reticências
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
};

// Converte string para slug (ex: "Lead Me Pro" -> "lead-me-pro")
export const toSlug = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};

// Gera identificador aleatório curto (ex: "a1b2c3")
export const generateId = (length = 6) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

// Valida email (retorna true/false)
export const validateEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Valida número de telefone simples (retorna true/false)
export const validatePhone = (phone) => {
  if (!phone) return false;
  const re = /^[0-9+\-()\s]+$/;
  return re.test(phone);
};
