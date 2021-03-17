import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';


export default function HealthInfo({ dados, handleChange, handleFileChange }) {
  return (
    <>
      <TextField
        placeholder="Número do Plano de Saúde"
        label="Número do Plano de Saúde"
        name="planoSaudeNumero"
        variant="outlined"
        onChange={handleChange}
        defaultValue={dados.planoSaudeNumero}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        placeholder="Tipo do Plano"
        label="Tipo do Plano"
        variant="outlined"
        onChange={handleChange}
        defaultValue={dados.planoSaudeTipo}
        name='planoSaudeTipo'
        margin="normal"
        fullWidth
        required
      />
      <TextField
        placeholder="Plano"
        label="Plano"
        name="planoSaudePlano"
        variant="outlined"
        onChange={handleChange}
        defaultValue={dados.planoSaudePlano}
        margin="normal"
        fullWidth
      />
      <TextField
        placeholder="Operadora"
        label="Operadora"
        name='planoSaudeOperadora'
        variant="outlined"
        onChange={handleChange}
        defaultValue={dados.planoSaudeOperadora}
        margin="normal"
        fullWidth
      />

      <label>Imagem do Plano</label>
      <Button
        variant="outlined"
        component="label"
        color='inherit'
        startIcon={<InsertPhotoIcon />}
        fullWidth
      ><input
          type="file"
          accept="image/*"
          name='planoSaudeImagem'
          onChange={handleFileChange}
        />
      </Button>
    </>
  )
}
