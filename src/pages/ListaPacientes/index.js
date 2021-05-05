import React, { useState, useEffect } from 'react'
import { Container, Grid } from '@material-ui/core'
import Navbar from '../Navbar/index';
import api from '../../services/api';
//import ChatBot from '../Chatbot';
import DataPaciente from './card';


function ListaDePacientes() {

  const [data, setData] = useState('')
  useEffect(() => {
    const getDataUsuario = async () => {
        try {
            const response = await api.get('/user/page');
            setData(response.data.results)
        } catch (error) {
            console.log(error.response);
            alert("Erro em carregar os dados")
        }
    }
    getDataUsuario()
}, []);


     return (
    <>
      <Navbar />
      <Container>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <h1 style={{ margin: "20px 0", color: "#589303" }}>Pacientes</h1>
            <h3 style={{ margin: "20px 0", color: "#000" }}>Lista de Pacientes</h3>
          </Grid>
          {data&&
       <DataPaciente data={data}/>
          }
        </Grid>
      </Container>
      {/* <ChatBot /> */}
    </>
  )
}

export default ListaDePacientes;
