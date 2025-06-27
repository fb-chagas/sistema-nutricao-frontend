import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição API:', error);
    return Promise.reject(error);
  }
);

// Serviços para cada módulo
export const fornecedoresService = {
  listar: () => api.get('/fornecedores'),
  obterPorId: (id) => api.get(`/fornecedores/${id}`),
  criar: (dados) => api.post('/fornecedores', dados),
  atualizar: (id, dados) => api.put(`/fornecedores/${id}`, dados),
  excluir: (id) => api.delete(`/fornecedores/${id}`),
};

export const insumosService = {
  listar: () => api.get('/insumos'),
  obterPorId: (id) => api.get(`/insumos/${id}`),
  criar: (dados) => api.post('/insumos', dados),
  atualizar: (id, dados) => api.put(`/insumos/${id}`, dados),
  excluir: (id) => api.delete(`/insumos/${id}`),
};

export const nfeService = {
  listar: () => api.get('/nfe'),
  obterPorId: (id) => api.get(`/nfe/${id}`),
  obterItens: (id) => api.get(`/nfe/${id}/itens`),
  criar: (dados) => api.post('/nfe', dados),
  atualizar: (id, dados) => api.put(`/nfe/${id}`, dados),
  excluir: (id) => api.delete(`/nfe/${id}`),
};

export const contratosService = {
  listar: () => api.get('/contratos'),
  obterPorId: (id) => api.get(`/contratos/${id}`),
  obterItens: (id) => api.get(`/contratos/${id}/itens`),
  criar: (dados) => api.post('/contratos', dados),
  atualizar: (id, dados) => api.put(`/contratos/${id}`, dados),
  excluir: (id) => api.delete(`/contratos/${id}`),
};

export const cotacoesService = {
  listar: () => api.get('/cotacoes'),
  obterPorId: (id) => api.get(`/cotacoes/${id}`),
  criar: (dados) => api.post('/cotacoes', dados),
  atualizar: (id, dados) => api.put(`/cotacoes/${id}`, dados),
  excluir: (id) => api.delete(`/cotacoes/${id}`),
  obterComparativo: () => api.get('/cotacoes/comparativo'),
};

export const controleMensalService = {
  listarRegistros: (mes, ano) => api.get(`/controle-mensal/registros?mes=${mes}&ano=${ano}`),
  obterRegistroPorId: (id) => api.get(`/controle-mensal/registros/${id}`),
  criarRegistro: (dados) => api.post('/controle-mensal/registros', dados),
  atualizarRegistro: (id, dados) => api.put(`/controle-mensal/registros/${id}`, dados),
  excluirRegistro: (id) => api.delete(`/controle-mensal/registros/${id}`),
  
  listarEntregas: (registroId) => api.get(`/controle-mensal/entregas?registro_id=${registroId}`),
  obterEntregaPorId: (id) => api.get(`/controle-mensal/entregas/${id}`),
  criarEntrega: (dados) => api.post('/controle-mensal/entregas', dados),
  atualizarEntrega: (id, dados) => api.put(`/controle-mensal/entregas/${id}`, dados),
  excluirEntrega: (id) => api.delete(`/controle-mensal/entregas/${id}`),
  
  obterEstoque: (mes, ano) => api.get(`/controle-mensal/estoque?mes=${mes}&ano=${ano}`),
};

export const fechamentoService = {
  obterCustoMedio: (mes, ano) => api.get(`/fechamento/custo-medio?mes=${mes}&ano=${ano}`),
  realizarFechamento: (mes, ano, dados) => api.post(`/fechamento/mensal?mes=${mes}&ano=${ano}`, dados),
  obterRelatorios: (mes, ano) => api.get(`/fechamento/relatorios?mes=${mes}&ano=${ano}`),
  obterTendencias: () => api.get('/fechamento/tendencias'),
  exportarRelatorio: (tipo, mes, ano) => api.get(`/fechamento/exportar?tipo=${tipo}&mes=${mes}&ano=${ano}`, { responseType: 'blob' }),
};

export const dashboardService = {
  obterResumo: () => api.get('/dashboard/resumo'),
  obterIndicadores: () => api.get('/dashboard/indicadores'),
  obterGraficos: () => api.get('/dashboard/graficos'),
};

export default api;
