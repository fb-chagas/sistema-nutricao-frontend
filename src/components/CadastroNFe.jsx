import React, { useState } from 'react';
import ModalNFe from './Modals/ModalNFe';
import ModalFornecedor from './Modals/ModalFornecedor';
import ModalInsumo from './Modals/ModalInsumo';

const CadastroNFe = () => {
  // Estados para controle dos modais
  const [modalNFeOpen, setModalNFeOpen] = useState(false);
  const [modalFornecedorOpen, setModalFornecedorOpen] = useState(false);
  const [modalInsumoOpen, setModalInsumoOpen] = useState(false);

  // Função para recarregar dados após sucesso
  const handleSuccess = () => {
    window.location.reload(); // Ou implementar reload mais elegante
  };

  return (
    <div className="cadastro-nfe">
      {/* Conteúdo existente da página */}
      
      {/* Botão Nova NFe - modificar o existente */}
      <button 
        onClick={() => setModalNFeOpen(true)}
        className="btn btn-primary"
      >
        + Nova NFe
      </button>
      
      {/* Botão Novo Fornecedor - adicionar na aba Fornecedores */}
      <button 
        onClick={() => setModalFornecedorOpen(true)}
        className="btn btn-success"
      >
        + Novo Fornecedor
      </button>
      
      {/* Botão Novo Insumo - adicionar na aba Insumos */}
      <button 
        onClick={() => setModalInsumoOpen(true)}
        className="btn btn-info"
      >
        + Novo Insumo
      </button>

      {/* Modais */}
      <ModalNFe 
        isOpen={modalNFeOpen} 
        onClose={() => setModalNFeOpen(false)}
        onSuccess={handleSuccess}
      />
      
      <ModalFornecedor 
        isOpen={modalFornecedorOpen} 
        onClose={() => setModalFornecedorOpen(false)}
        onSuccess={handleSuccess}
      />
      
      <ModalInsumo 
        isOpen={modalInsumoOpen} 
        onClose={() => setModalInsumoOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default CadastroNFe;