import React, { useState } from 'react';
import ModalControle from './Modals/ModalControle';

const ControleMensal = () => {
  const [modalControleOpen, setModalControleOpen] = useState(false);

  const handleSuccess = () => {
    window.location.reload();
  };

  return (
    <div className="controle-mensal">
      {/* Conteúdo existente */}
      
      <button 
        onClick={() => setModalControleOpen(true)}
        className="btn btn-success"
      >
        + Novo Registro
      </button>

      <ModalControle 
        isOpen={modalControleOpen} 
        onClose={() => setModalControleOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default ControleMensal;