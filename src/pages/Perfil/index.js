import React, { useState, useEffect } from 'react';
import { Container, FormControlLabel } from '@material-ui/core'
import Navbar from '../Navbar';
import api from '../../services/api'
import Checkbox from '@material-ui/core/Checkbox';
import { Alert } from '@material-ui/lab';
import DataPaciente from './DataPaciente';
import DataProfissional from './DataProfissional';

function Perfil(props) {
    const [dataUsuario, setDataUsuario] = useState()
    const [ehMedico, setEhMedico] = useState(false);
    const [paciente, setPaciente] = useState(true);
    useEffect(() => {
        const idUsuario = localStorage.getItem('_idUsuario')
        const getDataUsuario = async () => {
            try {
                const response = await api.get('/perfil', { headers: { _id: idUsuario } });
                setDataUsuario(response.data.user)
                setEhMedico(response.data.user.ehMedico)
            } catch (error) {
                console.log(error.response);
                alert("Erro em carregar os dados")
            }
        }
        getDataUsuario()
    }, []);
    localStorage.setItem('ehMedico', ehMedico);
    return (
        <>
            <Navbar />
            <Container>
                {/* <ChatBot /> */}


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={paciente}
                            onChange={event => setPaciente(event.target.checked)}
                            name="paciente"
                            color="primary"
                        />
                    }
                    label="Paciente"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={ehMedico}
                            onChange={event => setEhMedico(event.target.checked)}
                            name="ehMedico"
                            color="primary"
                        />
                    }
                    label="Sou profissional da Saúde"
                />
                {dataUsuario && (
                    ehMedico ?
                    <>
                    {!dataUsuario.ehMedico&&  <Alert severity='warning' >Para Ativar o perfil como médico, por favor complete os seus dados e salve</Alert>}
                            <DataProfissional data={dataUsuario} />
                        </> : <>
                            <DataPaciente data={dataUsuario} />
                        </>
                )
                }
            </Container>
        </>
    )
}

export default Perfil;