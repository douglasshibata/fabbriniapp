import React from 'react'
import { red } from '@material-ui/core/colors';
import { Card, Avatar, CardHeader, CardContent, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditProfissional from './EditProfissional';

const useStyles = makeStyles((theme) => ({
  root: {
      maxWidth: '100%',
      paddingTop: '56',
      marginTop: 50,
  },
  bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
  },
  title: {
      fontSize: 15,
  },
  avatar: {
      backgroundColor: red[500],
  },
}));
function DataProfissional(props) {
  const classes = useStyles();
  const pacientes = props.data
  const telefone = pacientes.telefones.map((value,index)=>(
      <ul key={value._id}>
          <li>Número: {value.numero}</li>
          <li>Tipo: {value.tipo}</li>
      </ul>
  ))
  return (
    <Container>
       <Card className={classes.root} key={pacientes._id}>
    <CardHeader
        avatar={<Avatar aria-label={pacientes.firstName} className={classes.avatar} />}
        title={pacientes.firstName}
        subheader={pacientes.email}
        action={
            <EditProfissional dados={pacientes}/>
        }
    />
    <CardContent>
        <Typography variant="h6" component="h3">
            <p>CPF: {pacientes.cpfNumber}</p>
        </Typography>
        <Typography variant="h6" component="h3">
            <p>Nome: {pacientes.firstName}</p>
        </Typography>
        <Typography variant="h6" component="h3">
            TELEFONE: {telefone}
        </Typography>
        <Typography variant="h6" component="h3">
            <p>{pacientes.conselho} - {pacientes.ufConselho}</p>
        </Typography>
        <Typography variant="h6" component="h3">
            <p>Especialidade: {pacientes.especialidade}</p>
        </Typography>
        <Typography variant="h6" component="h3">
            <p>Registro: {pacientes.registro}</p>
        </Typography>
        <Typography variant="h6" component="h3">
            <p>STATUS: {pacientes.ativo ? `ATIVO` : `INATIVO`}</p>
        </Typography>
    </CardContent>
</Card>
    </Container>
  )
}

export default DataProfissional
