import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import Radio from "components/CustomRadio/CustomRadio";
import Reader from "components/CSVReader/CSVReader";
import { MMSCall } from "service/MMSService";
import SweetAlert from "react-bootstrap-sweetalert/lib/dist/SweetAlert";

class MMS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      type_number: "",
      textArea: "",
      subject: "",
      radio: "1",
      url:'',
      alert: null,
      isLoading: false,
      type_numberError: null,
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
  handleRadio = (event) => {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  };
  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.radio === "1") {
      if (this.state.type_numberError) {
        this.setState({
          alert: (
            <SweetAlert danger title="Failed!" onConfirm={this.hideAlert}>
              WMSISDN Must be Only Number!
            </SweetAlert>
          ),
        });
      }
       else {
        this.setState({
          isLoading: true,
        });
        MMSCall(this.state.type_number, this.state.textArea, this.state.subject,this.state.url)
          .then((response) => {
            if (response.ok) {
              this.setState({
                textArea: "",
                type_number: "",
                subject: "",
                url:'',
                isLoading: false,
                alert: (
                  <SweetAlert success title="Sent!" onConfirm={this.hideAlert}>
                    Message Sent Successfully
                  </SweetAlert>
                ),
              });
            } else {
              response.json().then((rep) => {
                this.setState({
                  isLoading: false,
                  alert: (
                    <SweetAlert
                      danger
                      title="Failed!"
                      onConfirm={this.hideAlert}
                    >
                      {rep.errors[0].detail}
                    </SweetAlert>
                  ),
                });
              });
            }
          })
          .catch((error) => {
            this.setState({
              isLoading: false,
              alert: (
                <SweetAlert danger title="Failed!" onConfirm={this.hideAlert}>
                  {error}
                </SweetAlert>
              ),
            });
          });
      }
    } else {
    }
  };

  
  render() {
    return (
      <Grid>
        {this.state.alert}
        <Row>
          <Col md={8} sm={8} mdOffset={2} smOffset={2}>
            <form onSubmit={this.handleSubmit}>
              <Card
                hidden={this.state.cardHidden}
                textCenter
                title="MMS"
                content={
                  <div>
                    <FormGroup>
                      <Radio
                        name="radio"
                        number="1"
                        option="1"
                        onChange={this.handleRadio}
                        checked={this.state.radio === "1"}
                        label="Single Contact"
                      />
                      <Radio
                        name="radio"
                        number="2"
                        option="2"
                        onChange={this.handleRadio}
                        checked={this.state.radio === "2"}
                        label="Multiple Contacts"
                      />
                    </FormGroup>
                   
                      <FormGroup
                      >
                        <ControlLabel>
                        MMS File URL
                        </ControlLabel>
                        <FormControl type="url" required value={this.state.url}  placeholder="MMS File URL ..."
                         onChange={(event) => {
                          this.setState({
                            url: event.target.value,
                          });
                        }}
                        />
                       
                      </FormGroup>
                      {/* <FormControl
                        required
                        type="url"
                        value={this.state.url}
                        placeholder="MMS File URL ..."
                        onChange={(event) => {
                          this.setState({
                            url: event.target.value,
                          });
                        }}
                      /> */}
                   
                    {this.state.radio === "1" ? (
                      <FormGroup>
                        <ControlLabel>MSISDN</ControlLabel>
                        <InputGroup>
                          <InputGroup.Addon>+</InputGroup.Addon>
                          <FormControl
                            type="text"
                            value={this.state.type_number}
                            name="type_number"
                            required
                            onChange={(event) => {
                              var digitRex = /^\d+$/;
                              if (event.target.value.length) {
                                if (digitRex.test(event.target.value)) {
                                  this.setState({
                                    type_number: event.target.value,
                                  });
                                }
                              } else {
                                this.setState({
                                  type_number: "",
                                });
                              }
                            }}
                          />
                        </InputGroup>
                        {this.state.type_numberError}
                      </FormGroup>
                    ) : (
                      <FormGroup>
                        <ControlLabel>CSV Upload</ControlLabel>
                        <Reader />
                      </FormGroup>
                    )}
                    <FormGroup>
                      <ControlLabel>Subject</ControlLabel>
                      <FormControl
                        required
                        value={this.state.subject}
                        placeholder="MMS Subject ..."
                        onChange={(event) => {
                          this.setState({
                            subject: event.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Text To Send</ControlLabel>
                      <FormControl
                        componentClass="textarea"
                        required
                        value={this.state.textArea}
                        placeholder="type your message ..."
                        onChange={(event) => {
                          this.setState({
                            textArea: event.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </div>
                }
                legend={
                  <Button
                    bsStyle="primary"
                    fill
                    wd
                    type="submit"
                    disabled={this.state.isLoading}
                  >
                    {this.state.isLoading ? "Sending..." : "Send"}
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

export default MMS;
