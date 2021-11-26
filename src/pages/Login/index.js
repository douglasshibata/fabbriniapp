import React, { useState } from 'react';
import { Grid, Paper, TextField, CssBaseline, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import imagemLateral from '../../assets/lado_inicial.jpeg';
import api from '../../services/api';
import { useHistory, Link } from 'react-router-dom';
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
  },
  paper: {
    margin: theme.spacing(8,4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
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
  loading: {
    position: 'absolute'
  },  
  text_login: {
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

export default function Login() {
  const classes = useStyles();
  const [cpfNumber, setcpfNumber] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  localStorage.setItem('cpfNumber', cpfNumber);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { cpfNumber, senha };
    try {
      setLoading(true);
      const response = await api.post('/sessions', data);
      localStorage.setItem("_idUsuario", response.data.user._id);
      login(response.data.token);
      history.push('/perfil');
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      if (error.response.data.error) {
        setErro(error.response.data.error.message);
      }
    }
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h4" variant="h5" className={classes.text_login}>
            Faça o seu Login

          </Typography>
          {error && <Alert severity='warning' >{error}</Alert>}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            {loading ? <ReactLoading className={classes.loading} type={'spin'} color={'#6BC4EC'} height={'20%'} width={'20%'} /> : <></>}
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
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/cadastrar" variant="body2" className={classes.link}>
                  Cadastrar-se
                </Link>
              </Grid>
              <Grid item xs>
                <Link to="/forgot-password" variant="body2" className={classes.link}>
                  Esqueci a senha
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}