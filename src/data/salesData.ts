export const PRODUCTS_DATA = [
  { id: 'kit_1', name: 'O Doce Caminho', price: 240.00, category: 'Entrada', profitMargin: '22%', color: '#E0C9A6' },
  { id: 'kit_2', name: 'Degustando o Cacau', price: 399.00, category: 'Intermediário', profitMargin: '25%', color: '#D4B07B' },
  { id: 'kit_3', name: 'O Sabor do Chocolate', price: 799.00, category: 'Avançado', profitMargin: '28%', color: '#C5A059' },
  { id: 'kit_4', name: 'Do Grão ao Coração', price: 1249.00, category: 'Empreendedor', profitMargin: '33%', color: '#4A3B2A' },
];

export const SALES_BY_KIT_MOCK = [
  { name: 'O Doce Caminho', quantity: 150, value: 36000, color: '#E0C9A6' },
  { name: 'Degustando o Cacau', quantity: 98, value: 39102, color: '#D4B07B' },
  { name: 'O Sabor do Chocolate', quantity: 45, value: 35955, color: '#C5A059' },
  { name: 'Do Grão ao Coração', quantity: 22, value: 27478, color: '#4A3B2A' },
];

export const SALES_KPIS = {
  totalRevenue: 138535,
  bestSeller: 'O Doce Caminho',
  avgTicket: 439.80,
};

export const WEEKLY_APPOINTMENTS_MOCK = [
  { day: 'Seg', scheduled: 12, completed: 10 },
  { day: 'Ter', scheduled: 15, completed: 12 },
  { day: 'Qua', scheduled: 18, completed: 16 },
  { day: 'Qui', scheduled: 25, completed: 22 },
  { day: 'Sex', scheduled: 32, completed: 28 },
  { day: 'Sáb', scheduled: 45, completed: 38 },
  { day: 'Dom', scheduled: 10, completed: 8 },
];

export const FUNNEL_BY_KIT_MOCK = [
  { name: 'Doce Caminho', planned: 450, scheduled: 200, sold: 150 },
  { name: 'Degustando', planned: 300, scheduled: 140, sold: 98 },
  { name: 'Sabor Choc.', planned: 180, scheduled: 80, sold: 45 },
  { name: 'Grão/Coração', planned: 90, scheduled: 40, sold: 22 },
];

export const RECENT_TRANSACTIONS = [
  { id: 1, lead: 'Ana Silva', kit: 'O Doce Caminho', value: 240, date: '10/02/2026', status: 'Confirmado' as const, payment: 'À Vista' },
  { id: 2, lead: 'Carlos Souza', kit: 'Do Grão ao Coração', value: 1249, date: '10/02/2026', status: 'Pendente' as const, payment: 'Pix' },
  { id: 3, lead: 'Mariana Lima', kit: 'Degustando o Cacau', value: 399, date: '09/02/2026', status: 'Confirmado' as const, payment: 'Cartão' },
  { id: 4, lead: 'Roberto Dias', kit: 'O Sabor do Chocolate', value: 799, date: '09/02/2026', status: 'Cancelado' as const, payment: 'Boleto' },
  { id: 5, lead: 'Fernanda Alves', kit: 'O Doce Caminho', value: 240, date: '08/02/2026', status: 'Confirmado' as const, payment: 'À Vista' },
];
