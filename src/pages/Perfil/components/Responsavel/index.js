import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Responsavel({ dados, handleChange }) {
  return (
    <>
      <TextField
        placeholder="Nome do responsável"
        label="Nome do responsável"
        name="responsavelNome"
        variant="outlined"
        onChange={handleChange}
        defaultValue={dados.responsavelNome}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        placeholder="Contato do responsável"
        label="Contato do responsável"
        variant="outlined"
        onChange={handleChange}
        defaultValue={dados.responsavelContato}
        name='responsavelContato'
        margin="normal"
        fullWidth
        required
      />
      <TextField
        placeholder="Grau de Parentesco"
        label="Grau de Parentesco"
        name="responsavelGrauParentesco"
        variant="outlined"
        onChange={handleChange}
        defaultValue={dados.responsavelGrauParentesco}
        margin="normal"
        fullWidth
      />
    </>
  )
}
