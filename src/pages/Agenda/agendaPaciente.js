import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import Navbar from '../Navbar';
import api from '../../services/api';
import DataTable from './table';

function AgendaPaciente() {
    const [agenda, setAgenda] = useState([]);
    useEffect(() => {
        const idUsuario = localStorage.getItem('_idUsuario');
        const getAgenda = async () => {
            try {
                const response = await api.get('/agendaPaciente', { headers: { _id: idUsuario } });
                setAgenda(response.data.agenda);
            } catch (error) {
                console.log(error.response);
                alert("Erro em carregar os dados");
            }
        };
        getAgenda();
    }, []);

    return (
        <>
            <Navbar />
            <Container>
                <h1 style={{ margin: 20 }}>Agenda</h1>
                {agenda && <DataTable dados={agenda} />}
            </Container>
        </>
    );
}

export default AgendaPaciente;