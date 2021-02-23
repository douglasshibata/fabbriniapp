import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import './style.css';

const ehMedico = localStorage.getItem('ehMedico');
export const mainListItems = (
  <div>
    <Link to='/perfil' className='removeLink'>
      <ListItem button>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Meu Perfil" />
      </ListItem>
    </Link>
    {ehMedico === 'true' ?
      <>
        <Link to='/main' className='removeLink'>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to='/pacientes' className='removeLink'>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Pacientes" />
          </ListItem>
        </Link>
      </> : <div></div>}
    <Link to='/listaProfissionais' className='removeLink'>
      <ListItem button>
        <ListItemIcon>
          <LocalHospitalRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Profissionais" />
      </ListItem>
    </Link>
    <Link to='/agenda' className='removeLink'>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Agenda" />
      </ListItem>
    </Link>
    {ehMedico === 'true' ?
      <>
        <Link to='/prontuario' className='removeLink'>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Prontuário" />
          </ListItem>
        </Link>
      </> : <div></div>}
    <Link to='/about' className='removeLink'>
      <ListItem button>
        <ListItemIcon>
          <InfoRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Sobre" />
      </ListItem>
    </Link>
    <Link to='/help' className='removeLink'>
      <ListItem button>
        <ListItemIcon>
          <HelpOutlineRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Ajuda" />
      </ListItem>
    </Link>
  </div>
);