import React, { useState } from 'react';

const ModalContrato = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const dados = {
      numero: formData.get('numero'),
      fornecedor: formData.get('fornecedor'),
      tipo: formData.get('tipo'),
      data_inicio: formData.get('data_inicio'),
      data_fim: formData.get('data_fim'),
      valor_total: parseFloat(formData.get('valor_total')),
      valor_mensal: parseFloat(formData.get('valor_mensal')),
      descricao: formData.get('descricao'),
      observacoes: formData.get('observacoes')
    };
    
    try {
      const response = await fetch('https://sistema-nutricao-backend.onrender.com/api/contratos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      
      if (response.ok) {
        alert('✅ Contrato cadastrado com sucesso!');
        onClose();
        if (onSuccess) onSuccess();
      } else {
        const error = await response.text();
        alert(`❌ Erro ao cadastrar contrato: ${error}`);
      }
    } catch (error) {
      alert('❌ Erro de conexão. Verifique se o backend está ativo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        width: '700px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '25px',
          borderBottom: '2px solid #f0f0f0',
          paddingBottom: '15px'
        }}>
          <h2 style={{ margin: 0, color: '#333', fontSize: '24px' }}>📋 Novo Contrato</h2>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '28px', 
              cursor: 'pointer',
              color: '#999',
              padding: '5px'
            }}
          >×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Número do Contrato *
              </label>
              <input 
                name="numero" 
                type="text" 
                required 
                placeholder="Ex: CONT-2025-001"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Tipo de Contrato *
              </label>
              <select 
                name="tipo" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="">Selecione o tipo</option>
                <option value="Fornecimento">Fornecimento</option>
                <option value="Prestação de Serviços">Prestação de Serviços</option>
                <option value="Locação">Locação</option>
                <option value="Manutenção">Manutenção</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
              Fornecedor/Contratado *
            </label>
            <select 
              name="fornecedor" 
              required 
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '2px solid #ddd', 
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="">Selecione um fornecedor</option>
              <option value="Distribuidora Alimentos ABC">Distribuidora Alimentos ABC</option>
              <option value="Hortifruti Express">Hortifruti Express</option>
              <option value="Laticínios Qualidade">Laticínios Qualidade</option>
              <option value="Carnes Premium">Carnes Premium</option>
              <option value="Grãos & Cereais Ltda">Grãos & Cereais Ltda</option>
            </select>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Data de Início *
              </label>
              <input 
                name="data_inicio" 
                type="date" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Data de Término *
              </label>
              <input 
                name="data_fim" 
                type="date" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }} 
              />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Valor Total (R$) *
              </label>
              <input 
                name="valor_total" 
                type="number" 
                step="0.01" 
                required 
                placeholder="0,00"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Valor Mensal (R$)
              </label>
              <input 
                name="valor_mensal" 
                type="number" 
                step="0.01" 
                placeholder="0,00"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }} 
              />
            </div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
              Descrição do Contrato *
            </label>
            <textarea 
              name="descricao" 
              rows="3"
              required
              placeholder="Descreva o objeto do contrato, produtos/serviços incluídos..."
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '2px solid #ddd', 
                borderRadius: '6px',
                fontSize: '14px',
                resize: 'vertical'
              }} 
            />
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
              Observações
            </label>
            <textarea 
              name="observacoes" 
              rows="2"
              placeholder="Cláusulas especiais, condições de pagamento, etc..."
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '2px solid #ddd', 
                borderRadius: '6px',
                fontSize: '14px',
                resize: 'vertical'
              }} 
            />
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            justifyContent: 'flex-end',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '2px solid #f0f0f0'
          }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ 
                padding: '12px 25px', 
                backgroundColor: '#6c757d', 
                color: 'white',
                border: 'none', 
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                padding: '12px 25px', 
                backgroundColor: loading ? '#ccc' : '#ffc107', 
                color: loading ? '#666' : '#212529', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '14px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ Salvando...' : '💾 Salvar Contrato'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalContrato;