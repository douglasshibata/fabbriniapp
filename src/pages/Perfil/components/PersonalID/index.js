import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import uf from '../../../../assets/uf.json';


export default function PersonalID({ dados, handleChange,handleFileChange }) {
  const [rgExpeditorUf, setRgExpeditorUf] = useState('')
  dados.rgExpeditorUf = rgExpeditorUf;
  return (
    <Grid container spacing={3}>
      <Grid item sm={6}>
        <TextField
          placeholder="CPF"
          label="CPF"
          name="cpfNumber"
          variant="outlined"
          onChange={handleChange}
          defaultValue={dados.cpfNumber}
          margin="normal"
          fullWidth
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Button
          variant="outlined"
          component="label"
          color='inherit'
          startIcon={<InsertPhotoIcon/>}
          fullWidth
        >Imagem do cpf
          <input
            type="file"
            accept="image/*"
            name='cpfImages'
            onChange={handleFileChange}
          />
        </Button>
      </Grid>
      <Grid item sm={6}>
        <TextField
          placeholder="Número do RG"
          label="RG"
          name="rgNumber"
          variant="outlined"
          onChange={handleChange}
          defaultValue={dados.rgNumber}
          margin="normal"
          fullWidth
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          placeholder="Órgão expeditor do RG"
          label="Órgão expeditor do RG"
          name="rgNumber"
          variant="outlined"
          onChange={handleChange}
          defaultValue={dados.rgExpeditor}
          margin="normal"
          fullWidth
        />
      </Grid>
      <Grid item sm={6}>
        <Autocomplete
          id='rgExpeditorUf'
          name='rgExpeditorUf'
          options={uf.uf}
          getOptionLabel={(option) => option}
          value={rgExpeditorUf}
          onChange={(event, newValue) => {
            setRgExpeditorUf(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="UF Expeditor" variant="outlined" />}
        />
      </Grid>
      <Grid item sm={6}>
          <Button
            variant="outlined" component="label"
            startIcon={<InsertPhotoIcon/>}
            fullWidth
          >
            Imagem do RG
  <input
              type="file"
              accept="image/*"
              name='rgImages'
              onChange={handleFileChange}            />
          </Button>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Data de Expedição"
            type='date'
            onChange={handleChange}
            defaultValue={dados.rgExpedition}
            name='rgExpedition'
            margin="normal"
          />
        </Grid>
      </Grid>
  )
}
