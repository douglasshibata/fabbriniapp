import React, { useState, useEffect } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import Navbar from '../Navbar/index';
import api from '../../services/api';
//import ChatBot from '../Chatbot';
import DataProfissional from './card';


function ListaProfissionais() {

  const [data, setData] = useState([])
  useEffect(() => {
    const getDataUsuario = async () => {
        try {
            const response = await api.get('/doctor/page'
            /* ,{
              params:{
                page: 0,
                limit: 10,
              }
            } */);
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
            <h1 style={{ margin: "20px 0", color: "#589303" }}>Profissionais</h1>
            <h3 style={{ margin: "20px 0", color: "#000" }}>Encontre o profissional certo para você</h3>
          </Grid>
          {data.length > 0 ? 
       <DataProfissional data={data}/>
          :
          <Typography>
            Não Há Profissionais Cadastrados
          </Typography>
          }
        </Grid>
      </Container>
      {/* <ChatBot /> */}
    </>
  )
}

export default ListaProfissionais;
