import React, { useState } from 'react';
import{ Grid,Paper,TextField ,CssBaseline,Button,Typography, FormControl, InputLabel, Select, MenuItem }from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import imagemLateral from '../../assets/lado_inicial.jpeg';
import api from '../../services/api';
import { useHistory,Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { Alert } from '@material-ui/lab';
import { login } from '../../services/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${imagemLateral})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }, paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
},
link: {
    textDecoration:'none',
    fontSamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#0071BC',
},
form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
},
submit: {
    margin: theme.spacing(3, 0, 2),
},
loading:{
    position:'absolute'
},
paper: {
    margin: theme.spacing(0, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text_login:{
    fontFamily: 'Roboto',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '28px',
    letterSpacing: '0em',
    textAlign: 'left',
    left: '876px',
    marginTop: '103px',
    marginBottom: '23px',
    color: '#000000',
  }
}));

export default function Cadastrar() {
  const classes = useStyles();
  const [cpfNumber, setcpfNumber] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [senha, setsenha] = useState('');
  const [confirmsenha, setConfirmsenha] = useState('');
  const [telefones, setTelefones] = useState([]);
  const [telefoneNumero, setTelefoneNumero] = useState('');
  const [telefoneTipo, setTelefoneTipo] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [ehMedico, setEhMedico] = useState(false)
  const [ativo, setAtivo] = useState(false)
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    setTelefones({
        numero:telefoneNumero,
        tipo:telefoneTipo,
    })
      setAtivo(true)
      const data = { cpfNumber, email, senha, firstName,telefones,ehMedico,ativo }
      try {
          setLoading(true)
          setEhMedico(false)
          if (senha === confirmsenha) {
              const response = await api.post('/user', data);
              login(response.data.token);
              setLoading(false)
              alert('Cadastro Realizado com sucesso')
              history.push('/')
          } else {
              setLoading(false)
              setError('Senhas Não conferem')
              alert('Senhas Não conferem')
          }
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      {error&&<Alert  severity='warning' >{error}</Alert>}
      <div className={classes.paper}>
      <Typography component="h4" variant="h5" className={classes.text_login}>
            Faça o seu Cadastro
          </Typography>
                {error &&
                    <Alert severity="error">
                        {error}
                    </Alert>}
                {loading ? <ReactLoading type={'spin'} color={'#123'}  height={'20%'} width={'20%'} /> : <></>}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        label='CPF'
                        placeholder='CPF*'
                        inputProps={{ minLength:11 ,maxLength:11 }}
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
                        required
                        fullWidth
                        name="telefone"
                        label="Telefone"
                        type="text"
                        inputProps={{ maxLength:15 }}
                        id="telefones"
                        onChange={e => setTelefoneNumero(e.target.value)}
                        value={telefoneNumero}
                    />
                    <FormControl style={{ minWidth:'100%',margin:'auto'}}>
                    <InputLabel id='telefoneTipoLabel'>Tipo de Telefone</InputLabel>
                    <Select  variant="outlined" autoWidth  labelId='telefoneTipoLabel' id='telefoneTipo' value={telefoneTipo} onChange={e=>setTelefoneTipo(e.target.value)}>
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
                        name="senha"
                        label="Senha"
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={e => setsenha(e.target.value)}
                        autoComplete="current-senha"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Confirmsenha"
                        label="Confirme a Senha"
                        type="password"
                        id="Confirmsenha"
                        value={confirmsenha}
                        onChange={e => setConfirmsenha(e.target.value)}
                        autoComplete="current-senha"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Cadastre-se
          </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/" variant="body2" className={classes.link}>
                                Faça o seu login
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
      </Grid>
    </Grid>
  );
}