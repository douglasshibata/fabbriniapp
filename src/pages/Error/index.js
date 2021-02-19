import React from 'react';
import { Grid,Paper,CssBaseline,Typography }from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import imagemLateral from '../../assets/error.jpg'

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
paper: {
    margin: theme.spacing(8, 4),
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
  },
  ref:{
    marginTop:'20%',
  }
}));

export default function ErrorPage() {
  const classes = useStyles();
 
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
          <Typography component="h4" variant="h5" className={classes.text_login}>
            ERRO, Página não Encontrada.
            
          </Typography>
            <Link to="/" className={classes.link} >Voltar para o Login</Link> 
            
            <a className={classes.ref} href='https://br.freepik.com/vetores/negocio'>
          Negócio vetor criado por freepik - br.freepik.com
          </a>
            </div>
          
      </Grid>
    </Grid>
  );
}