import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { format } from 'date-fns';
import ModalContainer from './BaseModal/ModalContainer';

function EventModal({ onClose }) {
  const [nome, setNome] = useState('');
  const [dataHoraInicio, setDataHoraInicio] = useState(new Date());
  const [dataHoraFim, setDataHoraFim] = useState(new Date());
  const [vagas, setVagas] = useState('');
  const [error, setError] = useState('');

  const formatDateISO = (date) => {
    if (!date) return '';
    return format(date, "yyyy-MM-dd'T'HH:mm:ss");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const FormattedDataHoraInicio = (formatDateISO(dataHoraInicio));
    const FormattedDataHoraFim =(formatDateISO(dataHoraFim));
    console.log(FormattedDataHoraInicio)

    try {
      await axios.post('http://localhost:8080/api/eventos', {
        nome,
        dataHoraInicio: FormattedDataHoraInicio,
        dataHoraFim: FormattedDataHoraFim,
        vagas
      });
      onClose();
    } catch (error) {
      const errorMessage = error.response?.data || 'Ocorreu um erro ao criar o evento.';
      setError(errorMessage);
    }
  };

  return (
    <ModalContainer onClose={onClose}>
      <h2>Criar Novo Evento</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label>
          <span>Nome do Evento:</span>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          <span>Data e Hora Início:</span>
          <DatePicker
            selected={dataHoraInicio}
            onChange={(date) => setDataHoraInicio(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </label>
        <label>
          <span>Data e Hora Fim:</span>
          <DatePicker
            selected={dataHoraFim}
            onChange={(date) => setDataHoraFim(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </label>
        <label>
          <span>Quantidade de Vagas:</span>
          <input type="number" value={vagas} onChange={(e) => setVagas(e.target.value)} />
        </label>
        <button type="submit">Criar Evento</button>
      </form>
    </ModalContainer>
  );
}

export default EventModal;
