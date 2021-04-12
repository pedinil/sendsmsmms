
import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from 'assets/img/logo.png'
class PagesHeader extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      width: window.innerWidth
    };
  }
  // function that sets the class to active of the active page
  activeRoute(routeName) {
    return window.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // function that shows/hides sidebar on responsive
  mobileSidebarToggle(e) {
    document.documentElement.classList.toggle("nav-open");
  }
  updateWidth() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateWidth.bind(this));
  }
  handleClickSignOut=()=>{
    sessionStorage.clear()
  }
  render() {
    return (
      <Navbar
        collapseOnSelect
        inverse
        className="navbar-primary navbar-transparent navbar-absolute"
      >
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to={"/admin/welcome"} className="nav-link">
            <div className="navauthor">
            <img alt="..." className="avatar" width='100%' src={logo} />
            </div>
              {this.state.width > 429
                ? "KOLAS App React"
                : "KOLAS APP React"}
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <ul className="nav navbar-nav navbar-right">
            
            <li className={this.activeRoute("SMS")}>
              <NavLink to={"/admin/SMS"} className="nav-link">
                <i className="fa fa-comment" />
                <p>SMS</p>
              </NavLink>
            </li>
            
            <li className={this.activeRoute("MMS")}>
              <NavLink to={"/admin/MMS"} className="nav-link">
              <i className="fa fa-file" />
                <p>MMS</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/"} className="nav-link" onClick={this.handleClickSignOut}>
                
                <i className="fa fa-lock" />
                <p>signOut</p>
              </NavLink>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default PagesHeader;
