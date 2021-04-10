
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";


import AuthNavbar from "components/Navbars/AuthNavbar.jsx";

// dinamically create pages routes
import routes from "routes.js";

import bgImage from "assets/img/full-screen-image-3.jpg";

class MainLayout extends Component {
  componentWillMount() {
      if(!sessionStorage.getItem('isLogged')){
        window.location.replace('/')
      }
    if (document.documentElement.className.indexOf("nav-open") !== -1) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  getPageClass() {
    var pageClass = "";
    switch (this.props.location.pathname) {
      case "/auth/login-page":
        pageClass = " login-page";
        break;
      case "/admin/MMS":
        pageClass = " login-page";
        break;
        case "/admin/SMS":
          pageClass = " login-page";
          break;
      case "/admin/welcome":
        pageClass = " lock-page";
        break;
      default:
        pageClass = "";
        break;
    }
    return pageClass;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <div>
        <AuthNavbar />
        <div className="wrapper wrapper-full-page">
          <div
            className={"full-page" + this.getPageClass()}
            data-color="black"
            data-image={bgImage}
          >
            <div className="content">
              <Switch>{this.getRoutes(routes)}</Switch>
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

export default MainLayout;
