// Funções utilitárias para formatar dados no SaaS

// Formata números como moeda (ex: 1000 -> 1.000,00€)
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

// Formata datas (ex: 2025-12-05T08:36 -> 05/12/2025)
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('pt-PT');
};

// Formata porcentagens (ex: 0.45 -> 45%)
export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(0)}%`;
};

// Abrevia nomes longos (ex: João Pedro Silva -> João P. Silva)
export const abbreviateName = (fullName) => {
  const parts = fullName.split(' ');
  if (parts.length <= 2) return fullName;
  return `${parts[0]} ${parts.slice(1, -1).map(p => p[0] + '.').join(' ')} ${parts[parts.length - 1]}`;
};
