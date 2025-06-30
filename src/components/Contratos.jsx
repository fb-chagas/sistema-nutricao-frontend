import React, { useState } from 'react';
import ModalContrato from './Modals/ModalContrato';

const Contratos = () => {
  const [modalContratoOpen, setModalContratoOpen] = useState(false);

  const handleSuccess = () => {
    window.location.reload();
  };

  return (
    <div className="contratos">
      {/* Conteúdo existente */}
      
      <button 
        onClick={() => setModalContratoOpen(true)}
        className="btn btn-warning"
      >
        + Novo Contrato
      </button>

      <ModalContrato 
        isOpen={modalContratoOpen} 
        onClose={() => setModalContratoOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Contratos;