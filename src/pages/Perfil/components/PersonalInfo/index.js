import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export default function PersonalInfo({ dados, handleChange }) {
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
      <Grid item sm={6}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="telefoneNumero"
          label="Número do Telefone"
          type="text"
          inputProps={{ maxLength: 15 }}
          id="telefoneNumero"
          onChange={handleChange}
          value={dados.telefoneNumero}
        />
      </Grid>
      <Grid item sm={6}>
          <InputLabel id='telefoneTipoLabel'>Tipo de Telefone</InputLabel>
        <FormControl style={{ minWidth: '100%', margin: 'auto' }}>
          <Select variant="outlined" autoWidth labelId='telefoneTipoLabel' name='telefoneTipo' id='telefoneTipo' value={dados.telefoneTipo} onChange={handleChange}>
            <MenuItem value={'residencial'}>Residencial</MenuItem>
            <MenuItem value={'comercial'}>Comercial</MenuItem>
            <MenuItem value={'celular'}>Celular</MenuItem>
            <MenuItem value={'whatsapp'}>Whatsapp</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}
