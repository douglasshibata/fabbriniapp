import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core'
import Navbar from '../Navbar';
import api from '../../services/api'
import DataTable from './table';
import AdicionarAgenda from './DialogoParaAdicionar';
function AgendaProfissional() {
    const [agenda, setAgenda] = useState([]);
    const ehMedico = localStorage.getItem('ehMedico');

    useEffect(() => {
        const idUsuario = localStorage.getItem('_idUsuario')
        const getAgenda = async () => {
            try {
                const response = await api.get('/agendaProfissional',{headers:{_id:idUsuario}});
                setAgenda(response.data.agenda)
            } catch (error) {
                console.log(error.response);
                alert("Erro em carregar os dados")
            }
        }
        getAgenda()
    }, []);
 

    return (
        <>
            <Navbar />
            <Container>
                <h1 style={{ margin: 20 }}>Agenda</h1>
                {ehMedico === 'true'&&<AdicionarAgenda />}
              {agenda&&<DataTable dados={agenda}/>}
            </Container>
        </>
    )
}

export default AgendaProfissional;