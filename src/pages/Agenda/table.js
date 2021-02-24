import React from 'react'
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DuoIcon from '@material-ui/icons/Duo';
import { format, isBefore } from 'date-fns'
import { ptBR } from "date-fns/locale";
import NomePaciente from './namePaciente';
import DadosProfissional from './nameProfissional';

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});
function DataTable(props) {
  const classes = useStyles();
  const ehMedico = localStorage.getItem('ehMedico');
  const items = props.dados.map((value,index) => {
    const date = Date.parse(value.horario);
    const dataAtual = new Date();
    const formattedDate = format(
      date,
      "'Dia' dd 'de' MMMM' de 'yyyy' às ' HH:mm'h'", { locale: ptBR }
    );
    //const horarioAgendado = isBefore(date, dataAtual);
    return (
      <TableRow key={value._id}>
        <DadosProfissional dados={value}/>
        <NomePaciente dados={value}/>
        <TableCell>{formattedDate}</TableCell>
        <TableCell align='justify'>
          <Button href={`/videochamada/${value._id}`} color='primary'><DuoIcon /></Button> 
        </TableCell>
      
      </TableRow>
    )
  })

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Profissional</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Horario</TableCell>
            <TableCell>Vídeo</TableCell>
            {/* {ehMedico === 'true' ?
              <TableCell>Editar</TableCell> : <TableCell></TableCell>} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {items}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
