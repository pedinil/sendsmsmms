import React, { Component } from "react";

import face0 from 'assets/img/faces/face-0.jpg'


class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
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
  render() {
    return (
        <form className="ng-untouched ng-pristine ng-valid">
        <div className="user-profile">
          <div className="author">
            <img alt="..." className="avatar" src={face0} />
          </div>
          <h4>Welcome To KOLAS App {sessionStorage.getItem('username')}</h4>
        
        </div>
      </form>
    );
  }
}

export default WelcomePage;