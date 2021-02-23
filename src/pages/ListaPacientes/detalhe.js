import { Container, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import api from '../../services/api';
import Navbar from '../Navbar'

function DetalhePaciente(props) {

    const [detalhePaciente, setDetalhePaciente] = useState([])

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await api.get(`/perfil`,{headers:{_id: props.match.params.id}});
                setDetalhePaciente(response.data.user)
            } catch (error) {
                console.log(error);
            }
        };
        getItems()
    }, [props.match.params.id]);
    console.log(detalhePaciente)
    return (
        <>
            <Navbar />
            <Container>
                <Grid container spacing={3}>
                            <Grid item xs={6} key={detalhePaciente._id}>
                                <h2>Perfil</h2>
                                <Grid item xs={6}>
                                    {detalhePaciente.nome}
                                </Grid>
                                <Grid item xs={6}>
                                    {detalhePaciente.conselho}
                                </Grid>
                            </Grid>

                </Grid> 
            </Container>
        </>
    )
}

export default DetalhePaciente
