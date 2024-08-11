import React from 'react';
import ModalContainer from './BaseModal/ModalContainer';

function ConfirmationModal({ nomeUsuario, eventoNome, ticketNumber, onClose }) {
  return (
    <ModalContainer onClose={onClose}>
      <h2>Inscrição Confirmada!</h2>
      <p>Nome do Usuário: {nomeUsuario}</p>
      <p>Nome do Evento: {eventoNome}</p>
      <p>Número do Bilhete: {ticketNumber}</p>
      <button onClick={onClose}>Fechar</button>
    </ModalContainer>
  );
}

export default ConfirmationModal;
