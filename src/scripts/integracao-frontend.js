// Script de Integração Frontend - Sistema de Nutrição
// Conecta botões e funcionalidades ao backend

// Aguardar carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando integração frontend...');
    
    // Inicializar API
    initializeApi().then(success => {
        if (success) {
            console.log('✅ API inicializada com sucesso!');
            setupEventListeners();
            loadInitialData();
        } else {
            console.error('❌ Falha ao inicializar API');
            showNotification('Erro ao conectar com o servidor', 'error');
        }
    });
});

// Configurar event listeners para botões
function setupEventListeners() {
    console.log('🔧 Configurando event listeners...');
    
    // Botões de "Nova NFe", "Novo Fornecedor", "Novo Insumo"
    setupModalButtons();
    
    // Botões de ação nas tabelas
    setupTableActions();
    
    // Campos de busca
    setupSearchFields();
    
    // Atualização automática do dashboard
    setupDashboardRefresh();
}

// Configurar botões que abrem modais
function setupModalButtons() {
    // Interceptar cliques em botões "Nova NFe"
    document.addEventListener('click', function(e) {
        if (e.target.textContent.includes('Nova NFe') || e.target.textContent.includes('+ Nova NFe')) {
            e.preventDefault();
            openModal('modalNovaNfe');
        }
        
        if (e.target.textContent.includes('Novo Fornecedor') || e.target.textContent.includes('+ Novo Fornecedor')) {
            e.preventDefault();
            openModal('modalNovoFornecedor');
        }
        
        if (e.target.textContent.includes('Novo Insumo') || e.target.textContent.includes('+ Novo Insumo')) {
            e.preventDefault();
            openModal('modalNovoInsumo');
        }
    });
}

// Configurar ações das tabelas (editar, excluir, visualizar)
function setupTableActions() {
    document.addEventListener('click', function(e) {
        const button = e.target.closest('button');
        if (!button) return;
        
        // Identificar tipo de ação pela cor ou ícone do botão
        const buttonClasses = button.className;
        const buttonStyle = button.style.backgroundColor;
        
        // Botão de visualizar (azul)
        if (buttonStyle.includes('59, 130, 246') || buttonClasses.includes('view')) {
            handleViewAction(button);
        }
        
        // Botão de editar (verde)
        if (buttonStyle.includes('16, 185, 129') || buttonClasses.includes('edit')) {
            handleEditAction(button);
        }
        
        // Botão de excluir (vermelho)
        if (buttonStyle.includes('239, 68, 68') || buttonClasses.includes('delete')) {
            handleDeleteAction(button);
        }
    });
}

// Configurar campos de busca
function setupSearchFields() {
    // Busca em tempo real
    const searchInputs = document.querySelectorAll('input[placeholder*="Buscar"]');
    
    searchInputs.forEach(input => {
        let timeout;
        input.addEventListener('input', function(e) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                performSearch(e.target.value, e.target);
            }, 500); // Aguardar 500ms após parar de digitar
        });
    });
}

// Configurar atualização automática do dashboard
function setupDashboardRefresh() {
    // Atualizar dashboard a cada 5 minutos
    if (window.location.pathname === '/' || window.location.pathname.includes('dashboard')) {
        setInterval(updateDashboard, 5 * 60 * 1000);
    }
}

// Carregar dados iniciais
async function loadInitialData() {
    console.log('📊 Carregando dados iniciais...');
    
    try {
        // Verificar qual página estamos
        const currentPath = window.location.pathname;
        
        if (currentPath === '/' || currentPath.includes('dashboard')) {
            await loadDashboardData();
        }
        
        if (currentPath.includes('cadastro-nfe')) {
            await loadNfeData();
        }
        
        if (currentPath.includes('contratos')) {
            await loadContratosData();
        }
        
    } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
        showNotification('Erro ao carregar dados', 'error');
    }
}

// Carregar dados do dashboard
async function loadDashboardData() {
    try {
        console.log('📈 Carregando dados do dashboard...');
        
        const result = await ApiService.dashboard.getData();
        
        if (result.success && result.data) {
            updateDashboardCards(result.data);
            updateDashboardCharts(result.data);
        } else {
            console.log('ℹ️ Usando dados mock do dashboard');
        }
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
    }
}

// Carregar dados de NFe
async function loadNfeData() {
    try {
        console.log('📄 Carregando dados de NFe...');
        
        const result = await ApiService.nfe.getAll();
        
        if (result.success && result.data) {
            updateNfeTable(result.data);
        } else {
            console.log('ℹ️ Usando dados mock de NFe');
        }
    } catch (error) {
        console.error('Erro ao carregar NFe:', error);
    }
}

// Carregar dados de contratos
async function loadContratosData() {
    try {
        console.log('📋 Carregando dados de contratos...');
        
        const result = await ApiService.contratos.getAll();
        
        if (result.success && result.data) {
            updateContratosTable(result.data);
        } else {
            console.log('ℹ️ Usando dados mock de contratos');
        }
    } catch (error) {
        console.error('Erro ao carregar contratos:', error);
    }
}

// Atualizar cards do dashboard
function updateDashboardCards(data) {
    // Atualizar valores dos cards se os dados estiverem disponíveis
    if (data.contratos_ativos !== undefined) {
        updateCardValue('contratos-ativos', data.contratos_ativos);
    }
    
    if (data.custo_medio_mensal !== undefined) {
        updateCardValue('custo-medio', `R$ ${data.custo_medio_mensal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    }
    
    if (data.entregas_pendentes !== undefined) {
        updateCardValue('entregas-pendentes', data.entregas_pendentes);
    }
    
    if (data.fornecedores_ativos !== undefined) {
        updateCardValue('fornecedores-ativos', data.fornecedores_ativos);
    }
}

// Função auxiliar para atualizar valor de um card
function updateCardValue(cardId, value) {
    // Procurar pelo elemento que contém o valor
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        if (el.textContent && el.textContent.trim() === '12' && cardId === 'contratos-ativos') {
            el.textContent = value;
        }
        // Adicionar mais condições conforme necessário
    });
}

// Atualizar tabela de NFe
function updateNfeTable(nfes) {
    // Implementar atualização da tabela com dados reais
    console.log('Atualizando tabela de NFe com', nfes.length, 'registros');
}

// Atualizar tabela de contratos
function updateContratosTable(contratos) {
    // Implementar atualização da tabela com dados reais
    console.log('Atualizando tabela de contratos com', contratos.length, 'registros');
}

// Handlers para ações das tabelas
function handleViewAction(button) {
    // Extrair ID do registro (pode estar em data-id ou no contexto)
    const row = button.closest('tr');
    if (row) {
        const id = extractRecordId(row);
        const type = detectRecordType(row);
        
        console.log(`Visualizar ${type} ID: ${id}`);
        showNotification(`Visualizando ${type} ${id}`, 'info');
        
        // Implementar modal de visualização
    }
}

function handleEditAction(button) {
    const row = button.closest('tr');
    if (row) {
        const id = extractRecordId(row);
        const type = detectRecordType(row);
        
        console.log(`Editar ${type} ID: ${id}`);
        showNotification(`Editando ${type} ${id}`, 'info');
        
        // Implementar modal de edição
    }
}

function handleDeleteAction(button) {
    const row = button.closest('tr');
    if (row) {
        const id = extractRecordId(row);
        const type = detectRecordType(row);
        
        if (confirm(`Tem certeza que deseja excluir este ${type}?`)) {
            deleteRecord(type, id);
        }
    }
}

// Extrair ID do registro da linha da tabela
function extractRecordId(row) {
    // Tentar extrair ID da primeira célula (geralmente é o número/ID)
    const firstCell = row.querySelector('td');
    return firstCell ? firstCell.textContent.trim() : null;
}

// Detectar tipo de registro baseado no contexto
function detectRecordType(row) {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('cadastro-nfe')) {
        return 'NFe';
    }
    if (currentPath.includes('contratos')) {
        return 'contrato';
    }
    
    return 'registro';
}

// Excluir registro
async function deleteRecord(type, id) {
    try {
        let result;
        
        switch (type) {
            case 'NFe':
                result = await ApiService.nfe.delete(id);
                break;
            case 'contrato':
                result = await ApiService.contratos.delete(id);
                break;
            default:
                throw new Error('Tipo de registro não reconhecido');
        }
        
        if (result.success) {
            showNotification(`${type} excluído com sucesso!`, 'success');
            // Recarregar dados
            loadInitialData();
        } else {
            showNotification(`Erro ao excluir ${type}: ${result.error}`, 'error');
        }
    } catch (error) {
        showNotification(`Erro ao excluir ${type}: ${error.message}`, 'error');
    }
}

// Realizar busca
async function performSearch(query, inputElement) {
    if (!query || query.length < 2) return;
    
    console.log('🔍 Buscando:', query);
    
    try {
        // Determinar tipo de busca baseado no placeholder
        const placeholder = inputElement.placeholder.toLowerCase();
        
        if (placeholder.includes('nfe') || placeholder.includes('nota')) {
            await searchNfes(query);
        } else if (placeholder.includes('fornecedor')) {
            await searchFornecedores(query);
        } else if (placeholder.includes('insumo')) {
            await searchInsumos(query);
        }
    } catch (error) {
        console.error('Erro na busca:', error);
    }
}

// Buscar NFes
async function searchNfes(query) {
    // Implementar busca de NFes
    console.log('Buscando NFes:', query);
}

// Buscar fornecedores
async function searchFornecedores(query) {
    // Implementar busca de fornecedores
    console.log('Buscando fornecedores:', query);
}

// Buscar insumos
async function searchInsumos(query) {
    // Implementar busca de insumos
    console.log('Buscando insumos:', query);
}

// Atualizar dashboard periodicamente
async function updateDashboard() {
    console.log('🔄 Atualizando dashboard...');
    await loadDashboardData();
}

// Funções para recarregar dados (chamadas após salvar)
window.recarregarNfes = function() {
    loadNfeData();
};

window.recarregarFornecedores = function() {
    // Recarregar lista de fornecedores
    if (window.location.pathname.includes('cadastro-nfe')) {
        loadNfeData();
    }
};

window.recarregarInsumos = function() {
    // Recarregar lista de insumos
    if (window.location.pathname.includes('cadastro-nfe')) {
        loadNfeData();
    }
};

// Função para injetar os modais na página atual
function injectModals() {
    // Verificar se os modais já existem
    if (document.getElementById('modalNovaNfe')) {
        return; // Modais já foram injetados
    }
    
    // Carregar HTML dos modais
    fetch('/formularios-modais.html')
        .then(response => response.text())
        .then(html => {
            // Extrair apenas os modais do HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const modals = doc.querySelectorAll('.modal');
            const scripts = doc.querySelectorAll('script');
            
            // Adicionar modais ao body
            modals.forEach(modal => {
                document.body.appendChild(modal);
            });
            
            // Adicionar scripts
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                document.head.appendChild(newScript);
            });
            
            console.log('✅ Modais injetados com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao carregar modais:', error);
        });
}

// Injetar modais quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(injectModals, 1000); // Aguardar 1 segundo para garantir que a página carregou
});

console.log('📦 Script de integração carregado!');

