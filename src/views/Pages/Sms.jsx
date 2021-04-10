import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  // ProgressBar,
  InputGroup,
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import Button from "components/CustomButton/CustomButton.jsx";
import Radio from "components/CustomRadio/CustomRadio";
import Reader from "components/CSVReader/CSVReader";
import { SMSCall } from "service/SmsService";

class SMS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      type_number: "",
      textArea: "",
      radio: "1",
      type_numberError: null,
      isLoading: false,
      alert: null,
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
      if(this.state.type_numberError){
        this.setState({
          alert: (
            <SweetAlert danger title="Failed!" onConfirm={this.hideAlert}>
             WMSISDN Must be Only Number!
            </SweetAlert>
          ),
        });
      }else{
       
      this.setState({
        isLoading: true,
      });
      SMSCall(this.state.type_number, this.state.textArea)
        .then((response) => {
          if (response.ok) {
            this.setState({
              textArea: "",
              type_number: "",
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
                  <SweetAlert danger title="Failed!" onConfirm={this.hideAlert}>
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
  handleForce = (data, fileInfo) => console.log(data, fileInfo);

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
                title="SMS"
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
                    {this.state.radio === "1" ? (
                      <FormGroup>
                        <ControlLabel>MSISDN</ControlLabel>
                        <InputGroup>
                          <InputGroup.Addon>+</InputGroup.Addon>
                          <FormControl type="text" value={this.state.type_number} name="type_number" required onChange={(event) => {
                            var digitRex = /^\d+$/;
                            if(event.target.value.length){

                           
                            if(digitRex.test(event.target.value)){
                              this.setState({
                                type_number: event.target.value,
                              });
                            }
                          }else{
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
                        <Reader handleForce={this.handleForce} />
                      </FormGroup>
                    )}

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
                    {}
                    {/* <ProgressBar active now={45} label={"45%"} /> */}
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

export default SMS;
