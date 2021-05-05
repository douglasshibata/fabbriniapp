import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from "date-fns/locale";
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'; //https://material-ui-pickers.dev/
import { InputLabel, TextField,Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import api from '../../services/api';

export default function FormAdicionarAgenda() {
  const [horario, setHorario] = useState(new Date());
  const [cpfNumberPaciente, setCpfPaciente] = useState('');
  const [cpfNumber, setcpfProfissional] = useState('');
  const [dados, setDados] = useState([]);
  const profissional = [];
  const pacientes = [];

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await api.get('/user');
        setDados(response.data.user)
      } catch (error) {
        console.log(error);
        alert("Erro em carregar os dados")
      }
    }
    getItems()
  }, []);
  if(dados){
    dados.forEach((value)=>{
      if(value.ehMedico){
        profissional.push(value)
      }
        pacientes.push(value)
      
    })
  }
  async function fazerAgendamento(e){
    e.preventDefault();
    const data = {cpfNumber, cpfNumberPaciente,horario};
    try {
      const response = await api.post('/agenda',data)
      if (response) setTimeout(function () { alert('Agendado Com sucesso'); window.location.reload() }, 100)

    } catch (error) {
      alert(error.response.data.message.error);
      console.log(error.response);
    }
  }

  return (
    <form onSubmit={fazerAgendamento}>
      {dados&&
      <Autocomplete
        id="lista_profissionais"
        options={profissional}
        getOptionLabel={(option) => option.firstName}
         renderOption={(option) => (
           <React.Fragment>
              {option.firstName} {option.familyName} <br /> {option.especialidade} <br />
           </React.Fragment>
         )}
        onChange={(event, value) => setcpfProfissional(value.cpfNumber)}

        renderInput={(params) => <TextField {...params} label="Profissionais" variant="outlined" />}
      />}
      <br/>
      {dados&&
        <Autocomplete
              id="lista_pacientes"
              options={pacientes}
              getOptionLabel={(option) => option.firstName}
              renderOption={(option) => (
                <React.Fragment>
                  <p>
                  {option.firstName} {option.familyName} 
                  </p>
                </React.Fragment>
              )}
              onChange={(event, value) => setCpfPaciente(value.cpfNumber)}
              renderInput={(params) => <TextField {...params} label="Pacientes" variant="outlined" />}
            />

      }
          <br/>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
        <InputLabel>Horário</InputLabel>
        <DateTimePicker inputVariant='outlined' variant='static' disablePast format="dd-MM-yyyy HH:mm" value={horario} onChange={setHorario} />
      </MuiPickersUtilsProvider>
      <Button type='submit' fullWidth color='primary' variant='contained' >Salvar</Button>
    </form>
  );
}