import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalContainer from './BaseModal/ModalContainer'; // Certifique-se de que o caminho esteja correto

function ConfirmedUsersModal({ evento, onClose }) {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (evento && evento.id) {
            axios.get(`http://localhost:8080/api/evento-usuario/usuarios/${evento.id}`)
                .then(response => {
                    setUsuarios(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Erro ao buscar usuários confirmados:", error);
                    setError(error.response?.data || 'Erro ao buscar usuários');
                    setLoading(false);
                });
        }
    }, [evento]);

    return (
        <ModalContainer onClose={onClose}>
            <h2>Usuários Confirmados no Evento "{evento.nome}"</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : usuarios.length > 0 ? (
                <ul>
                    {usuarios.map(usuario => (
                        <li key={usuario.id}>{usuario.nome}</li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum usuário confirmado para este evento.</p>
            )}
            <button onClick={onClose}>Fechar</button>
        </ModalContainer>
    );
}

export default ConfirmedUsersModal;
