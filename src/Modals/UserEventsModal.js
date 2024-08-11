import React, { useState } from 'react';
import axios from 'axios';
import ModalContainer from './BaseModal/ModalContainer';

function UserEventsModal({ onClose }) {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchEventos = () => {
    axios.get(`http://localhost:8080/api/evento-usuario/eventos/${nomeUsuario}`)
      .then(response => {
        setEventos(response.data);
        setError(null);
      })
      .catch(error => {
        setEventos([]);
        setError("Usuário não encontrado ou não cadastrado em nenhum evento.");
      });
  };

  return (
    <ModalContainer onClose={onClose}>
      <h2>Em que evento estou?</h2>
      <p>Insira seu nome de usuário para encontrar os eventos em que está cadastrado.</p>
      <input 
        type="text" 
        value={nomeUsuario} 
        onChange={(e) => setNomeUsuario(e.target.value)} 
        placeholder="Nome de usuário" 
      />
      <button onClick={handleFetchEventos}>Buscar Eventos</button>

      {error && <p className="error">{error}</p>}

      <ul>
        {eventos.map(evento => (
          <li key={evento.id}>
            {evento.nome} - {new Date(evento.dataHoraInicio).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </ModalContainer>
  );
}

export default UserEventsModal;
