
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "assets/css/light-bootstrap-dashboard-pro-react.css";

import "assets/css/pe-icon-7-stroke.css";

import AuthLayout from "layouts/Auth.jsx";
import MainLayout from "layouts/Main";
// import AdminLayout from "layouts/Admin.jsx";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/admin" render={props => <MainLayout {...props} />} />
      <Redirect from="/" to="/auth" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
