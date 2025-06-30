import React, { useState } from 'react';

const ModalInsumo = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const dados = {
      nome: formData.get('nome'),
      categoria: formData.get('categoria'),
      unidade: formData.get('unidade'),
      preco_unitario: parseFloat(formData.get('preco_unitario')),
      estoque_minimo: parseInt(formData.get('estoque_minimo')),
      fornecedor_principal: formData.get('fornecedor_principal'),
      descricao: formData.get('descricao'),
      codigo_interno: formData.get('codigo_interno')
    };
    
    try {
      const response = await fetch('https://sistema-nutricao-backend.onrender.com/api/insumos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      
      if (response.ok) {
        alert('✅ Insumo cadastrado com sucesso!');
        onClose();
        if (onSuccess) onSuccess();
      } else {
        const error = await response.text();
        alert(`❌ Erro ao cadastrar insumo: ${error}`);
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
        width: '650px',
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
          <h2 style={{ margin: 0, color: '#333', fontSize: '24px' }}>📦 Novo Insumo</h2>
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
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Nome do Insumo *
              </label>
              <input 
                name="nome" 
                type="text" 
                required 
                placeholder="Ex: Arroz Branco Tipo 1"
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
                Código Interno
              </label>
              <input 
                name="codigo_interno" 
                type="text" 
                placeholder="Ex: ARR001"
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
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Categoria *
              </label>
              <select 
                name="categoria" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="">Selecione</option>
                <option value="Grãos e Cereais">Grãos e Cereais</option>
                <option value="Carnes">Carnes</option>
                <option value="Laticínios">Laticínios</option>
                <option value="Hortifruti">Hortifruti</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Temperos">Temperos</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Unidade *
              </label>
              <select 
                name="unidade" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="">Selecione</option>
                <option value="kg">Quilograma (kg)</option>
                <option value="g">Grama (g)</option>
                <option value="l">Litro (l)</option>
                <option value="ml">Mililitro (ml)</option>
                <option value="un">Unidade (un)</option>
                <option value="cx">Caixa (cx)</option>
                <option value="pct">Pacote (pct)</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Preço Unitário (R$) *
              </label>
              <input 
                name="preco_unitario" 
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
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginTop: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Estoque Mínimo *
              </label>
              <input 
                name="estoque_minimo" 
                type="number" 
                required 
                placeholder="0"
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
                Fornecedor Principal
              </label>
              <select 
                name="fornecedor_principal" 
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
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
              Descrição
            </label>
            <textarea 
              name="descricao" 
              rows="3"
              placeholder="Descrição detalhada do insumo, especificações, etc..."
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
                backgroundColor: loading ? '#ccc' : '#17a2b8', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '14px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ Salvando...' : '💾 Salvar Insumo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalInsumo;