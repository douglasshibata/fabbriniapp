import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cadastrar from "./pages/Cadastro";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
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
      <PrivateRoute path='/about' component={()=><h1>teste</h1>}/>
      <Route path="*" component={()=><h1>teste</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
