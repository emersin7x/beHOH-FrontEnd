import React, { useState } from 'react';
import ModalContainer from './BaseModal/ModalContainer';
import axios from 'axios';

function CancelarInscricaoModal({ evento, onClose }) {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.delete('http://localhost:8080/api/evento-usuario/cancelarInscricao', {
      params: {
        nomeUsuario,
        idEvento: evento.id
      }
    })
      .then(response => {
        setError(null);
        setSuccess(response.data);
      })
      .catch(error => {
        setSuccess(null);
        setError(error.response.data);
      });
  };

  return (
    <ModalContainer onClose={onClose}>
      <h2>Cancelar Inscrição</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <label>
          <span>Nome de Usuário:</span>
          <input
            type="text"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            required
          />
        </label>
        <button type="submit">Confirmar Cancelamento</button>
      </form>
    </ModalContainer>
  );
}

export default CancelarInscricaoModal;
