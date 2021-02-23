import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import PersonalInfo from './components/PersonalInfo';
import PersonalID from './components/PersonalID';
import Address from './components/Address';
import { Grid } from '@material-ui/core';
import ConfirmarDados from './components/Confirm';
import HealthInfo from './components/HealthInfo';
import Responsavel from './components/Responsavel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Dados Pessoais', 'Identidade', 'Endereço', 'Plano de Saúde', 'Responsável', 'Confirmar Dados'];
}



export default function CompletarCadastro(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [dados, setDados] = useState({
    _id:props.dados._id,
    cpfNumber: props.dados.cpfNumber,
    cpfImages: "",
    firstName: "",
    familyName: "",
    socialName: "",
    title: "",
    email: "",
    senha: "",
    rgNumber: "",
    rgExpedition: "",
    rgExpeditor: "",
    rgExpeditorUf: "",
    rgImages: "",
    endZIP: "",
    endState: "",
    endCity: "",
    endDistrict: "",
    endDirection: "",
    endComplement: "",
    telefoneNumero: props.dados.telefones[0].numero,
    telefoneTipo: props.dados.telefones[0].tipo,
    ehMedico: false,
  })
  const handleChange = e => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value
    })
  }
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <PersonalInfo dados={dados} handleChange={handleChange} />;
      case 1:
        return <PersonalID dados={dados} handleChange={handleChange} />;
      case 2:
        return <Address dados={dados} handleChange={handleChange} />;
      case 3:
        return <HealthInfo dados={dados} handleChange={handleChange} />;
      case 4:
        return <Responsavel dados={dados} handleChange={handleChange} />;
      case 5:
        return <ConfirmarDados dados={dados} />;
      default:
        return 'Unknown stepIndex';
    }
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

 
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {getStepContent(activeStep)}
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Voltar
              </Button>
          </Grid>
          <Grid item sm={6}>
            {activeStep === steps.length - 1 ? '' :
              <Button variant="contained" color="primary" onClick={handleNext}>
                Continuar
                  </Button>
            }
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
