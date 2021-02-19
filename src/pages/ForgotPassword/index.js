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
    link: {
        textDecoration: 'none',
        fontSamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: '18px',
        lineHeight: '21px',
        color: '#0071BC',
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
    },
    loading: {
        position: 'absolute',
    }
}));

export default function ForgotPassword() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        const data = { email }
        try {
            setLoading(true)
            await api.post('/forgot-password', data);
            alert('Email para recuperação de senha enviado com sucesso')
            history.push('/')
        } catch (error) {
            setLoading(false)
            console.log(error.response);
            if (error.response.data.error) {
                let mensagemErro = error.response.data.error.message;
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
                <div className={classes.paper}>


                    <img src={logo} alt="logo" className={classes.logo} />
                    <Typography component="h1" variant="h5">
                        Recuperar a senha
</Typography>
                    {error &&
                        <Alert severity="error">
                            {error}
                        </Alert>}
                    {loading && <ReactLoading className={classes.loading} type={'spin'} color={'#00BCD4'} height={'20%'} width={'20%'} />}
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="Email"
                            label="Email"
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Solicitar Redefinição de senha
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