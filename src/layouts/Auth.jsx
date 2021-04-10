import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import bgImage from "assets/img/full-screen-image-3.jpg";
import LoginPage from "views/Pages/LoginPage";


class Auth extends Component {
  render() {
    return (
      <div>
        <div className="wrapper wrapper-full-page">
          <div
            className="full-page login-page"
            data-color="black"
            data-image={bgImage}
          >
            <div className="content">
              <Switch>
                <Route component={LoginPage} />
              </Switch>
            </div>

            <div
              className="full-page-background"
              style={{ backgroundImage: "url(" + bgImage + ")" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
