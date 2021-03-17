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
  const steps = getSteps();
  const [activeStep, setActiveStep] = useState(0);
  const [dados, setDados] = useState({
    _id: props.dados._id,
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
    endZIP: props.dados.address.length !==0 ? props.dados.address[0].endZIP : "",
    endState: props.dados.address.length !==0 ? props.dados.address[0].endState : "",
    endCity: props.dados.address.length !==0 ? props.dados.address[0].endCity : "",
    endDistrict: props.dados.address.length !==0 ? props.dados.address[0].endDistrict : "",
    endDirection: props.dados.address.length !==0 ? props.dados.address[0].endDirection : "",
    endComplement: props.dados.address.length !==0 ? props.dados.address[0].endComplement : "",
    endNumber: props.dados.address.length !==0 ? props.dados.address[0].endNumber : "",
    telefoneNumero:  props.dados.telefones.length !==0 ? props.dados.telefones[0].numero : "",
    telefoneTipo: props.dados.telefones.length !==0 ?  props.dados.telefones[0].tipo : "",
    ehMedico: false,
    ativo: props.dados.ativo,
    planoSaudeNumero:  props.dados.planoSaude.length !==0 ? props.dados.planoSaude[0].numero : "",
    planoSaudeTipo:   props.dados.planoSaude.length !==0 ? props.dados.planoSaude[0].tipo : "",
    planoSaudePlano:   props.dados.planoSaude.length !==0 ? props.dados.planoSaude[0].plano : "",
    planoSaudeOperadora:   props.dados.planoSaude.length !==0 ? props.dados.planoSaude[0].operadora : "",
    planoSaudeImagem:  props.dados.planoSaude.length !==0 ? props.dados.planoSaude[0].imagem : "",
    responsavelNome:  props.dados.responsavel.length !==0 ? props.dados.responsavel[0].nome : "",
    responsavelContato:  props.dados.responsavel.length !==0 ? props.dados.responsavel[0].contato : "",
    responsavelGrauParentesco:  props.dados.responsavel.length !==0 ? props.dados.responsavel[0].grauParentesco : "",
  })
  const handleChange = e => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value
    })
  }
  const handleFileChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if(file){
      reader.readAsDataURL(file);
      reader.onload = () =>{
        var base64 = reader.result;
        setDados({
          ...dados,
          [e.target.name]:base64
        })
      }
      reader.onerror = (erro)=>{
        console.log(erro)
      }
    }
    
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <PersonalInfo dados={dados} handleChange={handleChange} />;
      case 1:
        return <PersonalID dados={dados} handleChange={handleChange} handleFileChange={handleFileChange} />;
      case 2:
        return <Address dados={dados} handleChange={handleChange} />;
      case 3:
        return <HealthInfo dados={dados} handleChange={handleChange}  handleFileChange={handleFileChange} />;
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
