import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, TextField, InputLabel, FormControl, Grid } from '@material-ui/core';
import api from "../../services/api";
import Autocomplete from '@material-ui/lab/Autocomplete';
import conselhos from '../../assets/conselho.json';
import especialidades from '../../assets/especialidade.json';
import uf from '../../assets/uf.json';

export default function CompletarCadastroProfissional(props) {

  const [cpfNumber, setcpfNumber] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [senha, setSenha] = useState('');
  const telefones = [];
  const [telefoneNumero, setTelefoneNumero] = useState('');
  const [telefoneTipo, setTelefoneTipo] = useState('');
  const [registro, setRegistro] = useState('');
  const [conselho, setConselho] = useState('');
  const [ufConselho, setUfconselho] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [ativo, setAtivo] = useState(true);
  const submitFormEdit = async e => {
    e.preventDefault()
    telefones.push({
      numero: telefoneNumero,
      tipo: telefoneTipo,
    })
    try {
      const response = await api.put(`/user`, {
        cpfNumber,
        firstName,
        email,
        telefones,
        familyName,
        senha,
        ativo,
        conselho,
        ufConselho,
        registro,
        especialidade,
        ehMedico: true,
      }, { headers: { _id: props.dados._id } });
      if (response) setTimeout(function () { alert('Atualizado Com sucesso'); window.location.reload() }, 200)
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message.error)
    }
  }

  useEffect(() => {
    if (props.dados) {
      const { firstName, email,familyName ,cpfNumber, telefones,senha,ativo, conselho, ufConselho, registro, especialidade } = props.dados
      setFirstName(firstName);
      setFamilyName(familyName);
      setcpfNumber(cpfNumber)
      setEmail(email);
      setSenha(senha);
      setAtivo(ativo);
      setConselho(conselho);
      setUfconselho(ufConselho);
      setRegistro(registro);
      setEspecialidade(especialidade);
      setTelefoneNumero(telefones[0].numero)
      setTelefoneTipo(telefones[0].tipo)
      
    }
  }, [props.dados])
  return (

    <form onSubmit={submitFormEdit}>
      <TextField
        type="text"
        variant="outlined"
        fullWidth
        label='CPF'
        placeholder='CPF*'
        inputProps={{ minLength: 11, maxLength: 11 }}
        required
        value={cpfNumber}
        onChange={e => setcpfNumber(e.target.value)} autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        type='email'
        required
        fullWidth
        id="email"
        label="E-mail"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="email"
      />
      <TextField
        variant="outlined"
        margin="normal"
        type='text'
        required
        fullWidth
        id="nome"
        label="Nome"
        name="nome"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        type='text'
        required
        fullWidth
        id="sobrenome"
        label="Sobrenome"
        name="sobrenome"
        value={familyName}
        onChange={e => setFamilyName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="senha"
        label="Senha"
        type="password"
        id="senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        autoComplete="current-senha"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="telefone"
        label="Telefone"
        type="tel"
        inputProps={{ maxLength: 15 }}
        id="telefones"
        onChange={e => setTelefoneNumero(e.target.value)}
        value={telefoneNumero}
      />
      <FormControl style={{ minWidth: '100%', margin: 'auto' }}>
        <InputLabel id='telefoneTipoLabel'>Tipo de Telefone</InputLabel>
        <Select variant="outlined" autoWidth labelId='telefoneTipoLabel' id='telefoneTipo' value={telefoneTipo} onChange={e => setTelefoneTipo(e.target.value)}>
          <MenuItem value={'residencial'}>Residencial</MenuItem>
          <MenuItem value={'comercial'}>Comercial</MenuItem>
          <MenuItem value={'celular'}>Celular</MenuItem>
          <MenuItem value={'whatsapp'}>Whatsapp</MenuItem>
        </Select>
      </FormControl>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="registro"
        label="Registro"
        type="text"
        id="registro"
        onChange={e => setRegistro(e.target.value)}
        value={registro} />
      <Grid container spacing={2}>
        <Grid item xs={8}>

          <Autocomplete
            id="conselho"
            options={conselhos.conselho}
            getOptionLabel={(option) => option}
            value={conselho}
            onChange={(event, newValue) => {
              setConselho(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Conselho" variant="outlined" />}
          />
        </Grid>
        <Grid item xs={4}>

          <Autocomplete
            id='ufConselho'
            options={uf.uf}
            getOptionLabel={(option) => option}
            value={ufConselho}
            onChange={(event, newValue) => {
              setUfconselho(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="UF Conselho" variant="outlined" />}
          />
        </Grid>
      </Grid>
      <br />
      <Autocomplete
        id='especialidade'
        options={especialidades.especialidade}
        getOptionLabel={(option) => option}
        value={especialidade}
        onChange={(event, newValue) => {
          setEspecialidade(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Especialidade" variant="outlined" />}
      />

      <br />
      <InputLabel id='status'>Status</InputLabel>
      <Select type="select" name='ativo' id='ativo' variant="outlined" fullWidth value={ativo} onChange={e => setAtivo(e.target.value)}>
        <MenuItem value={true}>Ativo</MenuItem>
        <MenuItem value={false} >Inativar</MenuItem>
      </Select>
      <Button type='submit' color='primary' fullWidth variant="contained" style={{ marginTop: 10 }}>Salvar</Button>
    </form>
  )
}

