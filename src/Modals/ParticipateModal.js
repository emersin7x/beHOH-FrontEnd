import React, { useState } from 'react';
import axios from 'axios';
import ModalContainer from './BaseModal/ModalContainer';
import ConfirmationModal from './ConfirmationModal';

function ParticipateModal({ evento, onClose }) {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [error, setError] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/evento-usuario', {
      usuario: { nome: nomeUsuario },
      evento: { id: evento.id },
      entrada: false
    })
      .then(response => {
        setError(null);
        setTicketNumber(response.data);
        setShowConfirmationModal(true);
      })
      .catch(error => {
        setTicketNumber(null);
        setError(error.response.data);
      });
  };

  return (
    <ModalContainer onClose={onClose}>
      <h2>Participar no Evento</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label>
          Nome de Usuário:
          <input 
            type="text" 
            value={nomeUsuario} 
            onChange={(e) => setNomeUsuario(e.target.value)} 
          />
        </label>
        <button type="submit">Confirmar Participação</button>
      </form>

      {showConfirmationModal && (
        <ConfirmationModal
          nomeUsuario={nomeUsuario}
          eventoNome={evento.nome}
          ticketNumber={ticketNumber}
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
    </ModalContainer>
  );
}

export default ParticipateModal;
