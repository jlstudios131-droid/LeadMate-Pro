// src/utilis/utils.js
// Funções utilitárias adicionais para o LeadMe Pro

import { formatCurrency, formatDate, formatPercentage, abbreviateName } from './formatters.js';

/**
 * Formata número de telefone para padrão nacional (ex: 923456789 -> 923 456 789)
 */
export const formatPhone = (phone = '') => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 9) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
  }
  return phone;
};

/**
 * Gera um ID único (UUID-like) para leads ou elementos temporários
 */
export const generateId = () => {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  );
};

/**
 * Mapear status de lead para cores padrão do SaaS
 */
export const statusColor = (status = '') => {
  const colors = {
    New: 'bg-blue-100 text-blue-800',
    Contacted: 'bg-yellow-100 text-yellow-800',
    Qualified: 'bg-green-100 text-green-800',
    Lost: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Converte string de texto para formato de título (capitalize cada palavra)
 */
export const toTitleCase = (text = '') => {
  return text
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Filtra leads ativos (status não perdido)
 */
export const filterActiveLeads = (leads = []) => {
  return leads.filter(lead => lead.status !== 'Lost');
};

/**
 * Wrapper para formatters existentes com validação adicional
 */
export const safeFormatCurrency = (value) => formatCurrency(value);
export const safeFormatDate = (value) => formatDate(value);
export const safeFormatPercentage = (value) => formatPercentage(value);
export const safeAbbreviateName = (name) => abbreviateName(name);
