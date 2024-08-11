import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import EventModal from './Modals/EventModal';
import UserModal from './Modals/UserModal';
import ParticipateModal from './Modals/ParticipateModal';
import EntryModal from './Modals/EntradaModal';
import ConfirmedUsersModal from './Modals/ConfirmedUsersModal';
import UserEventsModal from './Modals/UserEventsModal';
import CancelarInscricaoModal from './Modals/CancelarInscricaoModal';

function App() {
  const [eventos, setEventos] = useState([]);
  const [selectedEvento, setSelectedEvento] = useState(null);

  const [modals, setModals] = useState({
    showEventModal: false,
    showUserModal: false,
    showParticipateModal: false,
    showEntryModal: false,
    showConfirmedUsersModal: false,
    showUserEventsModal: false,
    showCancelarInscricaoModal: false,
  });

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/eventos');
      setEventos(response.data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  const openModal = (modalName, evento = null) => {
    setSelectedEvento(evento);
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    fetchEventos();
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="header-buttons">
            <button onClick={() => openModal('showEventModal')}>Criar Novo Evento</button>
            <button onClick={() => openModal('showUserModal')}>Criar Conta</button>
          </div>
          <h1>BeHOH</h1>
          <button className="evento-estou-btn" onClick={() => openModal('showUserEventsModal')}>Em que evento estou?</button>
        </div>
      </header>

      <main className="main-content">
        <section className="event-list">
          <h2>Eventos mais vistos nas últimas 24h 👀</h2>
          <div className="event-cards">
            {eventos.map(evento => (
              <div key={evento.id} className="event-card">
                <img src="https://files.tecnoblog.net/wp-content/uploads/2022/09/stable-diffusion-imagem.jpg" alt={evento.nome} className="event-image" />
                <h3>{evento.nome}</h3>
                <p>{new Date(evento.dataHoraInicio).toLocaleDateString()}</p>
                <div className="event-buttons">
                  <button onClick={() => openModal('showParticipateModal', evento)}>Participar desse Evento</button>
                  <button onClick={() => openModal('showEntryModal', evento)}>Realizar Entrada</button>
                  <button onClick={() => openModal('showConfirmedUsersModal', evento)}>Usuários confirmados</button>
                  <button className="cancelar-inscricao-btn" onClick={() => openModal('showCancelarInscricaoModal', evento)}>Cancelar Inscrição</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modais */}
      {modals.showEventModal && <EventModal onClose={() => closeModal('showEventModal')} />}
      {modals.showUserModal && <UserModal onClose={() => closeModal('showUserModal')} />}
      {modals.showParticipateModal && <ParticipateModal evento={selectedEvento} onClose={() => closeModal('showParticipateModal')} />}
      {modals.showEntryModal && <EntryModal evento={selectedEvento} onClose={() => closeModal('showEntryModal')} />}
      {modals.showConfirmedUsersModal && <ConfirmedUsersModal evento={selectedEvento} onClose={() => closeModal('showConfirmedUsersModal')} />}
      {modals.showUserEventsModal && <UserEventsModal onClose={() => closeModal('showUserEventsModal')} />}
      {modals.showCancelarInscricaoModal && <CancelarInscricaoModal evento={selectedEvento} onClose={() => closeModal('showCancelarInscricaoModal')} />}
    </div>
  );
}

export default App;
