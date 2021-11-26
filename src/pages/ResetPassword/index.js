import React, { useState } from 'react';
import { Grid, Paper, TextField, CssBaseline, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { Alert } from '@material-ui/lab';
import logo from '../../assets/logo.png'
import imagemLateral from '../../assets/lado_inicial.jpeg';


const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        width: '100%',
        height: '100%',
        margin: 'auto'
    },
    link: {
        width: '191px',
        height: '21px',
        left: '859px',
        top: '509px',
        fontSamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: '18px',
        lineHeight: '21px',
        color: '#0071BC',
        textDecoration: 'none'
    },
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
    loading: {
        position: 'absolute'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

export default function ResetPassword(props) {
    const classes = useStyles();
    const [tokenResetSenha, setToken] = useState(props.match.params.token);
    const [senha, setsenha] = useState('');
    const [email, setEmail] = useState('');
    const [confirmsenha, setConfirmsenha] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        setToken(props.match.params.token)
        const data = { tokenResetSenha, senha,email }
        try {
            setLoading(true)

            if (senha === confirmsenha) {
                await api.post('/reset-password', data);
                setLoading(false)
                alert('Senha Atualizada com sucesso')
                history.push('/')
            } else {
                setLoading(false)
                setError('Senhas Não conferem')
                alert('Senhas Não conferem')
            }
        } catch (error) {
            setLoading(false)
            console.log(error.response.data);
            setError(error.response.data.error)
            alert(error.response.data.error)
        }

    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />

            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>


                    <img src={logo} alt="logo" className={classes.logo} />
                    <Typography component="h1" variant="h5">
                        Redefinir a senha
        </Typography>
                    {error &&
                        <Alert severity="error">
                            {error}
                        </Alert>}
                    {loading ? <ReactLoading type={'spin'} color={'#123'} height={'20%'} width={'20%'} /> : <></>}
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Confirme o seu email"
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
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
                            Atualizar
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




