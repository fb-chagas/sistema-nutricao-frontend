import React, { useState } from 'react';

const ModalFornecedor = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const dados = {
      nome: formData.get('nome'),
      cnpj: formData.get('cnpj'),
      email: formData.get('email'),
      telefone: formData.get('telefone'),
      endereco: formData.get('endereco'),
      cidade: formData.get('cidade'),
      estado: formData.get('estado'),
      cep: formData.get('cep'),
      categoria: formData.get('categoria'),
      observacoes: formData.get('observacoes')
    };
    
    try {
      const response = await fetch('https://sistema-nutricao-backend.onrender.com/api/fornecedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      
      if (response.ok) {
        alert('✅ Fornecedor cadastrado com sucesso!');
        onClose();
        if (onSuccess) onSuccess();
      } else {
        const error = await response.text();
        alert(`❌ Erro ao cadastrar fornecedor: ${error}`);
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
          <h2 style={{ margin: 0, color: '#333', fontSize: '24px' }}>🏢 Novo Fornecedor</h2>
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
                Nome da Empresa *
              </label>
              <input 
                name="nome" 
                type="text" 
                required 
                placeholder="Ex: Distribuidora Alimentos ABC"
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
                CNPJ *
              </label>
              <input 
                name="cnpj" 
                type="text" 
                required 
                placeholder="00.000.000/0000-00"
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
                Email *
              </label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="contato@empresa.com"
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
                Telefone *
              </label>
              <input 
                name="telefone" 
                type="tel" 
                required 
                placeholder="(11) 99999-9999"
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
              Endereço *
            </label>
            <input 
              name="endereco" 
              type="text" 
              required 
              placeholder="Rua, número, bairro"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '2px solid #ddd', 
                borderRadius: '6px',
                fontSize: '14px'
              }} 
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Cidade *
              </label>
              <input 
                name="cidade" 
                type="text" 
                required 
                placeholder="São Paulo"
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
                Estado *
              </label>
              <select 
                name="estado" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="">UF</option>
                <option value="SP">SP</option>
                <option value="RJ">RJ</option>
                <option value="MG">MG</option>
                <option value="RS">RS</option>
                <option value="PR">PR</option>
                <option value="SC">SC</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                CEP *
              </label>
              <input 
                name="cep" 
                type="text" 
                required 
                placeholder="00000-000"
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
              <option value="">Selecione uma categoria</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Carnes">Carnes</option>
              <option value="Laticínios">Laticínios</option>
              <option value="Hortifruti">Hortifruti</option>
              <option value="Grãos e Cereais">Grãos e Cereais</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
              Observações
            </label>
            <textarea 
              name="observacoes" 
              rows="3"
              placeholder="Informações adicionais sobre o fornecedor..."
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
                backgroundColor: loading ? '#ccc' : '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '14px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ Salvando...' : '💾 Salvar Fornecedor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFornecedor;