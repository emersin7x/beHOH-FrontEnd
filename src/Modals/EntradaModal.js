import React, { useState } from 'react';
import axios from 'axios';
import ModalContainer from './BaseModal/ModalContainer';

function EntradaModal({ evento, onClose }) {
  const [bilhete, setBilhete] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEntry = async () => {
    try {
      await axios.patch(`http://localhost:8080/api/evento-usuario/entrada/${evento.id}/${bilhete}`);
      setSuccess('Entrada realizada com sucesso!');
      setError('');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError('Erro ao realizar a entrada: ' + (error.response?.data || 'Erro desconhecido'));
      setSuccess('');
    }
  };

  return (
    <ModalContainer onClose={onClose}>
      <h2>Realizar Entrada no Evento</h2>
      <p>Insira o bilhete para o evento "{evento.nome}" para confirmar a entrada:</p>
      <input
        type="text"
        value={bilhete}
        onChange={(e) => setBilhete(e.target.value)}
        placeholder="Digite o bilhete"
      />
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
      <div>
        <button onClick={handleEntry}>Confirmar Entrada</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </ModalContainer>
  );
}

export default EntradaModal;
