import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import uf from '../../../../assets/uf.json';

export default function Address({ dados, handleChange }) {
  return (
    <Grid container spacing={3}>
      <Grid item sm={6}>
      <TextField
        placeholder="CEP"
        label="CEP"
        name=" endZIP"
        variant="outlined"
        onChange={handleChange}
        defaultValue={dados.endZIP}
        margin="normal"
        fullWidth
        required
      />
         </Grid>
         <Grid item sm={6}>
          <Autocomplete
            id='endState'
            name='endState'
            fullWidth
            options={uf.uf}
            getOptionLabel={(option) => option}
            value={dados.endState}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Estado" variant="outlined" />}
          />
        </Grid>
      <Grid item sm={6}>
      <TextField
        variant="outlined"
        label="Cidade"
        type='text'
        onChange={handleChange}
        defaultValue={dados.endCity}
        name='endCity'
        margin="normal"
        fullWidth
      />
         </Grid>
      <Grid item sm={6}>
      <TextField
        placeholder="Nome da Rua, Av."
        label="Nome da Rua"
        name="endDirection"
        variant="outlined"
        onChange={handleChange}
        defaultValue={dados.endDirection}
        margin="normal"
        fullWidth
        />
      </Grid>
      <Grid item sm={4}>
      <TextField
        placeholder="Bairro"
        label="Bairro"
        name="endDistrict"
        variant="outlined"
        onChange={handleChange}
        defaultValue={dados.endDistrict}
        margin="normal"
        fullWidth
        />
      </Grid>    
        <Grid item sm={4}>
        <TextField
        placeholder="Complemento"
        label="Complemento"
        name="endComplement"
        variant="outlined"
        onChange={handleChange}
        defaultValue={dados.endComplement}
        margin="normal"
        fullWidth
        />
         </Grid>
        <Grid item sm={4}>
        <TextField
        placeholder="Número"
        label="Número"
        name="endNumber"
        variant="outlined"
        onChange={handleChange}
        defaultValue={dados.endNumber}
        margin="normal"
        fullWidth
        />
         </Grid>
      
    </Grid>
  )
}
