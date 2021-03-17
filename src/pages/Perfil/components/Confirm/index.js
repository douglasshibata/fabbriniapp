import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText } from '@material-ui/core/';
import api from '../../../../services/api';
import { Alert } from '@material-ui/lab';
import ReactLoading from 'react-loading';
import { useHistory } from 'react-router-dom';

export default function ConfirmarDados(props) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const dados =  ({
    _id:props.dados._id,
    cpfNumber: props.dados.cpfNumber,
    cpfImages:  props.dados.cpfImages,
    firstName: props.dados.firstName,
    familyName: props.dados.familyName,
    socialName: props.dados.socialName,
    title: props.dados.title,
    email: props.dados.email,
    senha: props.dados.senha,
    rgNumber: props.dados.rgNumber,
    rgExpedition: props.dados.rgExpedition,
    rgExpeditor: props.dados.rgExpeditor,
    rgExpeditorUf: props.dados.rgExpeditorUf,
    rgImages: props.dados.rgImages,
  address: [{
      endZIP:props.dados.endZIP,
      endState:props.dados.endState,
      endCity:props.dados.endCity,
      endDistrict:props.dados.endDistrict,
      endDirection:props.dados.endDirection,
      endComplement: props.dados.endComplement,
      endNumber: props.dados.endNumber,
  }],
 
  telefones: [{
      numero: props.dados.telefoneNumero ,
      tipo: props.dados.telefoneTipo
  }],
  ativo: props.dados.ativo,
  planoSaude:{
      numero:  props.dados.planoSaudeNumero ,
      tipo:  props.dados.planoSaudeTipo  ,
      plano:  props.dados.planoSaudePlano ,
      operadora:  props.dados.planoSaudeOperadora ,
      imagem:  props.dados.planoSaudeImagem,
  },
  responsavel: {
      nome:   props.dados.responsavelNome ,
      contato: props.dados.responsavelContato ,
      grauParentesco:  props.dados.responsavelGrauParentesco ,
  },
    ehMedico: false,
  })
  console.log(dados);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true)
      await api.put(`/user`, dados,{headers:{_id:dados._id}});
      setLoading(false)
      alert('Dados atualizados com sucesso')
      history.push('/perfil')
    } catch (error) {
      setLoading(false)
      console.log(error.response.data);
      console.log(error.response.data.message);
      if (error.response.data.message) {
        let mensagemErro = error.response.data.message.error;
        setError(mensagemErro)
        alert(mensagemErro)
      }
    }

  }
  
  return (
    <>
      {error &&
        <Alert severity="error">
          {error}
        </Alert>}
      {loading ? <ReactLoading type={'spin'} color={'#123'} height={'20%'} width={'20%'} /> : <></>}
      <List>
        {dados.title &&<ListItem><ListItemText primary="Titulo" secondary={dados.title} /></ListItem>}
        <ListItem>
          <ListItemText primary="Nome" secondary={dados.firstName} />
          <ListItemText primary="Sobrenome" secondary={dados.familyName} />
        </ListItem>
        {dados.socialName &&<ListItem><ListItemText primary="Nome Social" secondary={dados.socialName} /></ListItem>}
        <ListItem>
          <ListItemText primary="Email" secondary={dados.email} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Titulo" secondary={dados.title} />
        </ListItem>
        <ListItem>
          <ListItemText primary="CPF" secondary={dados.cpfNumber} />
          <img src={dados.cpfImages} alt='Imagem cpf' width='10%' height='10%' />
        </ListItem>
          {dados.telefones && <ListItem><ListItemText primary="Número de Telefone" secondary={dados.telefones[0].numero} /><ListItemText primary="Tipo do Telefone" secondary={dados.telefones[0].tipo} /></ListItem>}
        <ListItem>
          <ListItemText primary="RG" secondary={dados.rgNumber} />
          <ListItemText primary="Data de expedição" secondary={dados.rgExpedition} />
          <ListItemText primary="Instituição de expedição" secondary={dados.rgExpeditor} />
          <ListItemText primary="UF expedição" secondary={dados.rgExpeditorUf} />
          <img src={dados.rgImages} alt='Imagem do RG' width='10%' height='10%' />
        </ListItem>
        { dados.address &&
        <ListItem>
          {dados.address.map((value)=>(
            <>
            <ListItemText primary="CEP" secondary={value.endZIP} />
            <ListItemText primary="Estado" secondary={value.endComplement} />
            <ListItemText primary="Cidade" secondary={value.endCity} />
            <ListItemText primary="Bairro" secondary={value.endDistrict} />
            <ListItemText primary="Nome da Rua" secondary={value.endDirection} />
            <ListItemText primary="Número" secondary={value.endNumber} />
            <ListItemText primary="Número" secondary={value.endNumber} />
            </>
          ))}
        </ListItem>
        }
        {dados.planoSaude && 
        <ListItem>
            <ListItemText primary="Número do Plano de Saúde" secondary={dados.planoSaude.numero} />
            <ListItemText primary="Estado" secondary={dados.planoSaude.numero} />
            <ListItemText primary="Cidade" secondary={dados.planoSaude.numero} />
            <ListItemText primary="Bairro" secondary={dados.planoSaude.numero} />
        </ListItem>
          }
        {dados.responsavel && 
        <ListItem>
            <ListItemText primary="CEP" secondary={dados.responsavel.contato} />
            <ListItemText primary="Estado" secondary={dados.responsavel.contato} />
            <ListItemText primary="Cidade" secondary={dados.responsavel.contato} />
            <ListItemText primary="Bairro" secondary={dados.responsavel.contato} />
        </ListItem>
          }
      </List>
      <form onSubmit={handleSubmit}>
        <Button color='secondary' variant='contained' fullWidth type='submit'>Confirmar Dados</Button>
      </form>
    </>
  );


}

