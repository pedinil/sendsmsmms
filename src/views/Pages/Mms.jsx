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
      csvFile: [],
      sentMsg: 0,
      log: [],
      failed:[],
      success:[],
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
      log:[],
      csvFile: [],
      sentMsg: 0,
    });
  };
  hideAlert = () => {
    this.setState({
      alert: null,
      isLoading: false,
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
    }
    else {
      if (!this.state.csvFile.length) {
        this.setState({
          alert: (
            <SweetAlert info title="CSV File!" onConfirm={this.hideAlert}>
              The CSV File Is Empty!
            </SweetAlert>
          ),
        });
      }
    else {
      this.setState({
        isLoading: true,
      });
      for (let i = 0; i < this.state.csvFile.length; i++) {
        setTimeout(() => {
        MMSCall(this.state.csvFile[i], this.state.textArea, this.state.subject,this.state.url)
        
          .then((response) => {
            if (response.ok) {
              let json = {
                number: this.state.csvFile[i],
                status: "SUCCESS",
              };
              this.setState((prevState) => ({
                success: [...prevState.success, json],
              }),()=>this.checkCallBack());
            } else {
              response.json().then((rep) => {
                let json = {
                  number: this.state.csvFile[i],
                  status: rep.errors[0].detail,
                };
                this.setState((prevState) => ({
                  failed: [...prevState.failed, json],
                }),()=>this.checkCallBack());
              });
            }
          })
          .catch((error) => {
            let json = {
              number: this.state.csvFile[i],
              status: error,
            };
            this.setState((prevState) => ({
              failed: [...prevState.failed, json],
            }),()=>this.checkCallBack());
          });
          ;}, 1000 * i)
      }
    }
    }
  };
  checkCallBack=()=>{
    if((this.state.success.length+this.state.failed.length)===this.state.csvFile.length)
    {
      this.setState({
            alert: (
              <SweetAlert success title="Sent!" onConfirm={this.hideAlert}>
                Sending Process Completed!
              </SweetAlert>
            ),
          });
    }
  }
  handleForce = (data, fileInfo) => {
    this.setState({
      csvFile: data,
      failed:[],
      success:[]
    });
  };
  handleClickLog = (log) => {
    
    this.setState({
      alert: (
        <SweetAlert
          title="Message Logs!"
          onConfirm={this.hideAlert}
          onCancel={this.hideAlert}
        >
          <ul className="list-group listClass">
            {log.map((result) => (

              <li className="list-group-item d-flex justify-content-between"  key={result.number[0]}>
              <button className="btn copyClipboard" onClick={()=>this.handleClickCopy(result.number[0])}><i className="fa fa-clipboard" aria-hidden="true"></i></button>
                     {result.number[0]} 
                <span >{result.status}</span>
              </li>
            ))}
          </ul>
       
        </SweetAlert>
      ),
    });
  };
  handleClickCopy=(number)=>{
    navigator.clipboard.writeText(number)
    alert("Number Copied to clipboard")
  }
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
                          <InputGroup.Addon>+1</InputGroup.Addon>
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
                        <Reader handleForce={this.handleForce} />
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
                    {this.state.radio === "2" ? (
                      <FormGroup className='statusRow'>
                        <ControlLabel>
                          Total:{this.state.csvFile.length}
                        </ControlLabel>
                        <ControlLabel>
                          Failed:{this.state.failed.length}
                          {this.state.failed.length ? (
                            <Button
                              variant="outline-info"
                              onClick={() => this.handleClickLog(this.state.failed)}
                            >
                              Log
                            </Button>
                          ) : (
                            ""
                          )}
                        </ControlLabel>
                        <ControlLabel>
                          Success:{this.state.success.length}
                          {this.state.success.length ? (
                            <Button
                              variant="outline-info"
                              onClick={() => this.handleClickLogSuccess(this.state.success)}
                            >
                              Log
                            </Button>
                          ) : (
                            ""
                          )}
                        </ControlLabel>
                        {/* <ControlLabel>
                          {this.state.sentMsg}/{this.state.csvFile.length}{" "}
                          {this.state.log.length ? (
                            <Button
                              variant="outline-info"
                              onClick={() => this.handleClickLog()}
                            >
                              Log
                            </Button>
                          ) : (
                            ""
                          )}
                        </ControlLabel> */}
                      </FormGroup>
                    ) : (
                      ""
                    )}
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
