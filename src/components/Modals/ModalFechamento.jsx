import React, { useState } from 'react';

const ModalFechamento = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const dados = {
      mes: formData.get('mes'),
      ano: parseInt(formData.get('ano')),
      tipo_fechamento: formData.get('tipo_fechamento'),
      valor_total_entradas: parseFloat(formData.get('valor_total_entradas')),
      valor_total_saidas: parseFloat(formData.get('valor_total_saidas')),
      saldo_final: parseFloat(formData.get('valor_total_entradas')) - parseFloat(formData.get('valor_total_saidas')),
      observacoes: formData.get('observacoes'),
      responsavel: formData.get('responsavel')
    };
    
    try {
      const response = await fetch('https://sistema-nutricao-backend.onrender.com/api/fechamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      
      if (response.ok) {
        alert('✅ Fechamento realizado com sucesso!');
        onClose();
        if (onSuccess) onSuccess();
      } else {
        const error = await response.text();
        alert(`❌ Erro ao realizar fechamento: ${error}`);
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
        width: '600px',
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
          <h2 style={{ margin: 0, color: '#333', fontSize: '24px' }}>📈 Fechamento Mensal</h2>
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
                Mês *
              </label>
              <select 
                name="mes" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="">Selecione o mês</option>
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Ano *
              </label>
              <input 
                name="ano" 
                type="number" 
                required 
                defaultValue={new Date().getFullYear()}
                min="2020"
                max="2030"
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
              Tipo de Fechamento *
            </label>
            <select 
              name="tipo_fechamento" 
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
              <option value="Mensal">Fechamento Mensal</option>
              <option value="Trimestral">Fechamento Trimestral</option>
              <option value="Semestral">Fechamento Semestral</option>
              <option value="Anual">Fechamento Anual</option>
            </select>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Total de Entradas (R$) *
              </label>
              <input 
                name="valor_total_entradas" 
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
                Total de Saídas (R$) *
              </label>
              <input 
                name="valor_total_saidas" 
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
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
              Responsável pelo Fechamento *
            </label>
            <input 
              name="responsavel" 
              type="text" 
              required 
              placeholder="Nome do responsável"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '2px solid #ddd', 
                borderRadius: '6px',
                fontSize: '14px'
              }} 
            />
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
              Observações
            </label>
            <textarea 
              name="observacoes" 
              rows="4"
              placeholder="Observações sobre o fechamento, pendências, ajustes realizados..."
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
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '6px',
            marginTop: '20px',
            border: '1px solid #dee2e6'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>⚠️ Atenção</h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
              O fechamento mensal é uma operação importante. Certifique-se de que todos os lançamentos 
              do período foram registrados antes de prosseguir.
            </p>
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
                backgroundColor: loading ? '#ccc' : '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '14px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ Processando...' : '📊 Realizar Fechamento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFechamento;