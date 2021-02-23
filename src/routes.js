import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import About from "./pages/About";
import Cadastrar from "./pages/Cadastro";
import ErrorPage from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import Help from "./pages/Help";
import ListaProfissionais from "./pages/ListaProfissionais";
import DetalheProfissional from "./pages/ListaProfissionais/detalhe";
import ListaDePacientes from "./pages/ListaPacientes";
import DetalhePaciente from "./pages/ListaPacientes/detalhe";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import ResetPassword from "./pages/ResetPassword";
import VideoChamada from "./pages/VideoChamada";
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path='/cadastrar' component={Cadastrar} />
      <Route path='/reset-password/:token' component={ResetPassword} />
      <Route path='/forgot-password' component={ForgotPassword} />
      <PrivateRoute path='/perfil' component={Perfil}/>
      <PrivateRoute path='/listaProfissionais' component={ListaProfissionais}/>
      <PrivateRoute path='/pacientes' component={ListaDePacientes}/>
      <PrivateRoute path='/detalhes/:id' component={DetalheProfissional}/>
      <PrivateRoute path='/detalhesPacientes/:id' component={DetalhePaciente}/>
      <PrivateRoute path='/about' component={About}/>
      <PrivateRoute path='/help' component={Help}/>
      <PrivateRoute path='/videochamada/:id' component={VideoChamada}/>
      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
