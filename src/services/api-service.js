// Serviço de API para Sistema de Nutrição
// Integração completa com backend

const API_BASE_URL = 'https://sistema-nutricao-backend.onrender.com';
const API_TIMEOUT = 60000; // 60 segundos para cold start

// Configuração padrão para requisições
const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

// Função utilitária para fazer requisições com retry
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
        method: 'GET',
        headers: defaultHeaders,
        ...options,
    };

    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
        try {
            console.log(`🔄 Requisição para ${endpoint} (tentativa ${retryCount + 1})`);
            
            const response = await fetch(url, config);
            
            if (response.ok) {
                const data = await response.json();
                console.log(`✅ Sucesso: ${endpoint}`, data);
                return { success: true, data };
            } else if (response.status === 502 && retryCount < maxRetries - 1) {
                console.log('⏳ Backend hibernando, aguardando...');
                await new Promise(resolve => setTimeout(resolve, 10000));
                retryCount++;
                continue;
            } else {
                const errorData = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorData}`);
            }
        } catch (error) {
            if (retryCount === maxRetries - 1) {
                console.error(`❌ Erro final em ${endpoint}:`, error);
                return { success: false, error: error.message };
            }
            console.log(`⚠️ Erro na tentativa ${retryCount + 1}:`, error.message);
            await new Promise(resolve => setTimeout(resolve, 5000));
            retryCount++;
        }
    }
}

// Serviços específicos
const ApiService = {
    // ========== NOTAS FISCAIS ==========
    nfe: {
        // Listar todas as NFes
        async getAll() {
            return await apiRequest('/api/nfe');
        },

        // Buscar NFe por ID
        async getById(id) {
            return await apiRequest(`/api/nfe/${id}`);
        },

        // Criar nova NFe
        async create(nfeData) {
            return await apiRequest('/api/nfe', {
                method: 'POST',
                body: JSON.stringify(nfeData)
            });
        },

        // Atualizar NFe
        async update(id, nfeData) {
            return await apiRequest(`/api/nfe/${id}`, {
                method: 'PUT',
                body: JSON.stringify(nfeData)
            });
        },

        // Deletar NFe
        async delete(id) {
            return await apiRequest(`/api/nfe/${id}`, {
                method: 'DELETE'
            });
        }
    },

    // ========== FORNECEDORES ==========
    fornecedores: {
        // Listar todos os fornecedores
        async getAll() {
            return await apiRequest('/api/fornecedores');
        },

        // Buscar fornecedor por ID
        async getById(id) {
            return await apiRequest(`/api/fornecedores/${id}`);
        },

        // Criar novo fornecedor
        async create(fornecedorData) {
            return await apiRequest('/api/fornecedores', {
                method: 'POST',
                body: JSON.stringify(fornecedorData)
            });
        },

        // Atualizar fornecedor
        async update(id, fornecedorData) {
            return await apiRequest(`/api/fornecedores/${id}`, {
                method: 'PUT',
                body: JSON.stringify(fornecedorData)
            });
        },

        // Deletar fornecedor
        async delete(id) {
            return await apiRequest(`/api/fornecedores/${id}`, {
                method: 'DELETE'
            });
        }
    },

    // ========== INSUMOS ==========
    insumos: {
        // Listar todos os insumos
        async getAll() {
            return await apiRequest('/api/insumos');
        },

        // Buscar insumo por ID
        async getById(id) {
            return await apiRequest(`/api/insumos/${id}`);
        },

        // Criar novo insumo
        async create(insumoData) {
            return await apiRequest('/api/insumos', {
                method: 'POST',
                body: JSON.stringify(insumoData)
            });
        },

        // Atualizar insumo
        async update(id, insumoData) {
            return await apiRequest(`/api/insumos/${id}`, {
                method: 'PUT',
                body: JSON.stringify(insumoData)
            });
        },

        // Deletar insumo
        async delete(id) {
            return await apiRequest(`/api/insumos/${id}`, {
                method: 'DELETE'
            });
        }
    },

    // ========== CONTRATOS ==========
    contratos: {
        // Listar todos os contratos
        async getAll() {
            return await apiRequest('/api/contratos');
        },

        // Buscar contrato por ID
        async getById(id) {
            return await apiRequest(`/api/contratos/${id}`);
        },

        // Criar novo contrato
        async create(contratoData) {
            return await apiRequest('/api/contratos', {
                method: 'POST',
                body: JSON.stringify(contratoData)
            });
        },

        // Atualizar contrato
        async update(id, contratoData) {
            return await apiRequest(`/api/contratos/${id}`, {
                method: 'PUT',
                body: JSON.stringify(contratoData)
            });
        },

        // Deletar contrato
        async delete(id) {
            return await apiRequest(`/api/contratos/${id}`, {
                method: 'DELETE'
            });
        }
    },

    // ========== CONTROLE MENSAL ==========
    controleMensal: {
        // Obter dados do mês
        async getByMonth(mes, ano) {
            return await apiRequest(`/api/controle-mensal/${ano}/${mes}`);
        },

        // Criar/atualizar controle mensal
        async save(mes, ano, dados) {
            return await apiRequest(`/api/controle-mensal/${ano}/${mes}`, {
                method: 'POST',
                body: JSON.stringify(dados)
            });
        }
    },

    // ========== FECHAMENTO ==========
    fechamento: {
        // Listar fechamentos
        async getAll() {
            return await apiRequest('/api/fechamento');
        },

        // Realizar fechamento
        async create(tipo, mes, ano) {
            return await apiRequest('/api/fechamento', {
                method: 'POST',
                body: JSON.stringify({ tipo, mes, ano })
            });
        }
    },

    // ========== DASHBOARD ==========
    dashboard: {
        // Obter dados do dashboard
        async getData() {
            return await apiRequest('/api/dashboard');
        },

        // Obter estatísticas
        async getStats() {
            return await apiRequest('/api/dashboard/stats');
        }
    },

    // ========== UTILITÁRIOS ==========
    utils: {
        // Testar conectividade
        async testConnection() {
            return await apiRequest('/api/teste');
        },

        // Verificar status da API
        async getStatus() {
            return await apiRequest('/');
        },

        // Acordar API (para cold start)
        async wakeUp() {
            console.log('🌅 Acordando API...');
            const result = await this.getStatus();
            if (result.success) {
                console.log('✅ API acordada com sucesso!');
            }
            return result;
        }
    }
};

// Função para inicializar a API (acordar se necessário)
async function initializeApi() {
    console.log('🚀 Inicializando conexão com API...');
    
    try {
        const result = await ApiService.utils.getStatus();
        if (result.success) {
            console.log('✅ API já está ativa!');
            return true;
        } else {
            console.log('⏳ Acordando API...');
            await ApiService.utils.wakeUp();
            return true;
        }
    } catch (error) {
        console.error('❌ Erro ao inicializar API:', error);
        return false;
    }
}

// Função para mostrar notificações ao usuário
function showNotification(message, type = 'info') {
    // Implementar notificação visual
    console.log(`${type.toUpperCase()}: ${message}`);
    
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        ${type === 'success' ? 'background-color: #10b981;' : ''}
        ${type === 'error' ? 'background-color: #ef4444;' : ''}
        ${type === 'info' ? 'background-color: #3b82f6;' : ''}
        ${type === 'warning' ? 'background-color: #f59e0b;' : ''}
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.ApiService = ApiService;
    window.initializeApi = initializeApi;
    window.showNotification = showNotification;
}

// Exportar para módulos ES6
export { ApiService, initializeApi, showNotification };
export default ApiService;

