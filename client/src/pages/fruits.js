import React, { Component } from 'react';
import Navbar from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import Wrapper from "../components/Wrapper";
import BodyWraper from "../components/BodyWrapper";
import Greeting from "../components/Greeting";
import FruitsDepartment from "../components/FruitsDepartment";
import FooterDiv from "../components/Footer";


class Fruits extends Component {
  render() {
    return (
      <Wrapper>
        <Jumbotron>
          <Navbar user={this.props.user} onChange={this.props.onChange} handleLogin={this.props.handleLogin} handleSignup={this.props.handleSignup} handleLogout={this.props.handleLogout}/>
          <Greeting lineOne="Fruits" />
        </Jumbotron>
        <BodyWraper>
          <FruitsDepartment />
        </BodyWraper>
        <FooterDiv />
      </Wrapper>
    );
  }
}

export default Fruits;
