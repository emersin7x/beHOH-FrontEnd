import React, { useState } from 'react';
import axios from 'axios';
import ModalContainer from './BaseModal/ModalContainer';

function UserModal({ onClose }) {
  const [nome, setNome] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/usuarios', { nome })
      .then(() => {
        onClose();
      })
      .catch(error => {
        setError(error.response.data);
      });
  };

  return (
    <ModalContainer onClose={onClose}>
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label>Nome de Usuário:
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Criar Conta</button>
      </form>
    </ModalContainer>
  );
}

export default UserModal;
