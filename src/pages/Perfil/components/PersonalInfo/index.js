import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export default function PersonalInfo({dados,handleChange}){
  return (
    <Grid container spacing={2}>
            <Grid item sm={6}>
        <TextField
              placeholder="Nome"
              label="Nome"
              name="firstName"
              variant="outlined"
              onChange={handleChange}
              defaultValue={dados.firstName}
              margin="normal"
              fullWidth
              required
            />
            </Grid>
            <Grid item sm={6}>
            <TextField
              placeholder="Sobrenome"
              label="Sobrenome"
              variant="outlined"
              onChange={handleChange}
              defaultValue={dados.familyName}
              name='familyName'
              margin="normal"
              fullWidth
              required
            />
            </Grid>
            <Grid item sm={6}>
        <TextField
              placeholder="Nome Social"
              label="Nome Social"
              name="socialName"
              variant="outlined"
              onChange={handleChange}
              defaultValue={dados.socialName}
              margin="normal"
              fullWidth
            />
            </Grid>
            <Grid item sm={6}>
            <TextField
              placeholder="Título de tratamento a ser utilizado antes do nome do paciente."
              label="Título"
              name='title'
              variant="outlined"
              onChange={handleChange}
              defaultValue={dados.title}
              margin="normal"
              fullWidth
            />
            </Grid>
            <Grid item sm={6}>
            <TextField
              placeholder="E-mail"
              label="E-mail"
              name='email'
              type='email'
              variant="outlined"
              onChange={handleChange}
              defaultValue={dados.email}
              margin="normal"
              fullWidth
            />
            </Grid>
            <Grid item sm={6}>
            <TextField
              placeholder="Senha"
              label="Senha"
              name='senha'
              type='password'
              variant="outlined"
              onChange={handleChange}
              defaultValue={dados.senha}
              margin="normal"
              fullWidth
            />
            </Grid>
    </Grid>
  )
}
