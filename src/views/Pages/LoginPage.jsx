import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import { login } from "variables/config";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      userName: "",
      password: "",
      error: null,
    };
  }
  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ cardHidden: false });
      }.bind(this),
      700
    );
  }
  handleChange = (name, value) => {
    this.setState({
      [name]: value,
      error: null,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < login.length; i++) {
      if (
        login[i].userName === this.state.userName &&
        login[i].password === this.state.password
      ) {
        sessionStorage.setItem("username", this.state.userName);
        sessionStorage.setItem("isLogged", true);
        window.location = "/#/admin/welcome";
      } else {
        this.setState({
          error: (
            <small className="text-danger">
              Username or Password is not Correct!
            </small>
          ),
          userName: "",
          password: "",
        });
      }
    }

    //  if(this.state.userName===userName && this.state.password===password){
    //   sessionStorage.setItem('username',this.state.userName)
    //   sessionStorage.setItem('isLogged',true)
    //   window.location='/#/admin/welcome'
    //  }else{
    //    this.setState({
    //      error:<small className="text-danger">
    //       Username or Password is not Correct!
    //    </small>,
    //    userName:'',
    //    password:''
    //    })
    //  }
  };
  render() {
    return (
      <Grid>
        <Row>
          <Col md={4} sm={6} mdOffset={4} smOffset={3}>
            <form onSubmit={this.handleSubmit}>
              <Card
                hidden={this.state.cardHidden}
                textCenter
                title="Login"
                content={
                  <div>
                    <FormGroup>
                      <ControlLabel>Username</ControlLabel>
                      <FormControl
                        placeholder="Enter Username"
                        type="text"
                        name="userName"
                        onChange={(e) =>
                          this.handleChange(e.target.name, e.target.value)
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        name="password"
                        onChange={(e) =>
                          this.handleChange(e.target.name, e.target.value)
                        }
                      />
                    </FormGroup>
                    <FormGroup>{this.state.error}</FormGroup>
                  </div>
                }
                legend={
                  <Button bsStyle="info" fill wd type="submit">
                    Login
                  </Button>
                }
                ftTextCenter
              />
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LoginPage;
