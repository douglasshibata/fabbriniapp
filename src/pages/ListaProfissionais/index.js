import React, { useState, useEffect } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import Navbar from '../Navbar/index';
import api from '../../services/api';
//import ChatBot from '../Chatbot';
import DataProfissional from './card';


function ListaProfissionais() {

  const [data, setData] = useState('')
  const medico = [];
  useEffect(() => {
    const getDataUsuario = async () => {
        try {
            const response = await api.get('/user');
            setData(response.data.user)
        } catch (error) {
            console.log(error.response);
            alert("Erro em carregar os dados")
        }
    }
    getDataUsuario()
}, []);

if(data){
  data.forEach((value,index)=>{
    if(value.ehMedico){
      medico.push(value)
    }
  })
}
     return (
    <>
      <Navbar />
      <Container>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <h1 style={{ margin: "20px 0", color: "#589303" }}>Profissionais</h1>
            <h3 style={{ margin: "20px 0", color: "#000" }}>Encontre o profissional certo para você</h3>
          </Grid>
          {medico.length > 0 ? 
       <DataProfissional data={medico}/>
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
