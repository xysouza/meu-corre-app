// Paleta de cores do nosso design
export const COLORS = {
  primary: '#1E1F28',     // Fundo principal mais escuro
  secondary: '#2A2D3A',    // Fundo dos cards
  text: '#FFFFFF',
  placeholder: '#A9A9A9',
  accent: '#4A90E2',      // Azul para botões e destaques
  income: '#2ECC71',      // Verde para receitas
  expense: '#E74C3C',     // Vermelho para despesas
};

// Mapeamento de categorias para ícones
export const CATEGORY_ICONS = {
  // Receitas
  'Uber': 'car-sports',
  '99': 'taxi',
  'iFood': 'moped',
  'Outros (Receita)': 'cash-plus',
  // Despesas
  'Combustível': 'gas-station',
  'Alimentação': 'food-fork-drink',
  'Manutenção': 'build',
  'Outros (Despesa)': 'cash-minus',
};

// Listas de categorias para facilitar a seleção
export const INCOME_CATEGORIES = ['Uber', '99', 'iFood', 'Outros (Receita)'];
export const EXPENSE_CATEGORIES = ['Combustível', 'Alimentação', 'Manutenção', 'Outros (Despesa)'];