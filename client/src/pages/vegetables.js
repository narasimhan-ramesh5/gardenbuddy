import React, { Component } from 'react';
import Navbar from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import Wrapper from "../components/Wrapper";
import BodyWraper from "../components/BodyWrapper";
import Greeting from "../components/Greeting";
import FooterDiv from "../components/Footer";
import VegeDepartment from "../components/VegetablesDepartment";


class Vegetables extends Component {
  render() {
    return (
      <Wrapper>
        <Jumbotron>
          <Navbar />
          <Greeting lineOne="Vegetables" />
          {/* lineTwo='"Just living is not enough...one must have sunshine, freedom, and a little flower." - Hans Christian Andersen' */}
        </Jumbotron>
        <BodyWraper>
          <VegeDepartment />
        </BodyWraper>
        <FooterDiv />
      </Wrapper>
    );
  }
}

export default Vegetables;
