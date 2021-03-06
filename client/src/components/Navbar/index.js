import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./style.css";
import PropTypes from 'prop-types';
import { Navbar, NavItem, Dropdown, Button } from "react-materialize";
import SideNavBar from "../SideNav";
import Login from "../Login";
import SignUp from "../SignUp";
import axios from "axios";
// import Swal from 'sweetalert2'


// By extending the React.Component class, Counter inherits functionality from it
class NavBar extends Component {

    render() {

        if (this.props.user.redirectTo) {
			return <Redirect to={{ pathname: this.props.user.redirectTo }} />
		} else if (this.props.user.loggedIn) {
            return (

                <wrapper className="nav-wrapper">
                    {/* //use bootstrap to create a navbar */}
                    <div className="nav-margin">
                        <Navbar className="top-nav brand-logo transparent" brand={<Link to="/" className="brand-logo">GardenBuddy</Link>} right>
                            {/* <NavItem onClick={() => console.log('test click')}>Getting started</NavItem> */}
                            {/* <NavItem>Account</NavItem> */}
    
                            <NavItem>
                                <Dropdown 
                                    className="nav-dropdown-menu"
                                    trigger={<Button className="transparent">Departments</Button>}  options={{hover: true}}>
                                        <Link to="/flowers"><NavItem>Flowers</NavItem></Link>
                                        <NavItem divider />
                                        <Link to="/fruits"><NavItem>Fruits</NavItem></Link>
                                        <NavItem divider />
                                        <Link to="/vegetables"><NavItem>Vegetables</NavItem></Link>
                                        <NavItem divider />
                                        <Link to="/herbs"><NavItem>Herbs</NavItem></Link>
                                </Dropdown>
                            </NavItem>
    
                            <NavItem className="blue-grey darken-3" style={{ fontWeight: "bold" }}><Link to="/teamprofile">Our Team</Link></NavItem>
                            <NavItem><SideNavBar username={this.props.user.username}
                                    password={this.props.user.password}
                                    phone={this.props.user.phone}
                                    firstName={this.props.user.firstName}
                                    lastName={this.props.user.lastName}
                                    zipcode={this.props.user.zipcode}
                                    city={this.props.user.city}
                                    st={this.props.user.st}
                                    aboutme={this.props.user.aboutme}
                                    profilepic={this.props.user.profilepic}
                                    coverphoto={this.props.user.coverphoto}
                                    onChange={this.props.onChange}
                                    handleLogout={this.props.handleLogout}/></NavItem>
                        </Navbar>
                    </div>
                </wrapper>
            );
        } else {

        // The render method returns the JSX that should be rendered
        return (

            <wrapper className="nav-wrapper">
                {/* //use bootstrap to create a navbar */}
                <div className="nav-margin">
                    <Navbar className="top-nav brand-logo transparent" brand={<Link to="/" className="brand-logo">GardenBuddy</Link>} right>

                        <NavItem>
                            <Dropdown 
                                className="nav-dropdown-menu"
                                trigger={<Button className="transparent">Departments</Button>}  options={{hover: true}}>
                                    <Link to="/flowers"><NavItem>Flowers</NavItem></Link>
                                    <NavItem divider />
                                    <Link to="/fruits"><NavItem>Fruits</NavItem></Link>
                                    <NavItem divider />
                                    <Link to="/vegetables"><NavItem>Vegetables</NavItem></Link>
                                    <NavItem divider />
                                    <Link to="/herbs"><NavItem>Herbs</NavItem></Link>
                            </Dropdown>
                        </NavItem>

                        <NavItem className="blue-grey darken-3" style={{ fontWeight: "bold" }}><Link to="/teamprofile">Our Team</Link></NavItem>
                        <NavItem className="amber">
                            <Login 
                                user={this.props.user}
                                onChange={this.props.onChange}
                                handleLogin={this.props.handleLogin}
                                forgotPassword={this.forgotPassword}
                            />
                        </NavItem>
                        <NavItem className="blue-grey darken-4">
                            <SignUp
                                username={this.props.user.username}
                                password={this.props.user.password}
                                phone={this.props.user.phone}
                                firstName={this.props.user.firstName}
                                lastName={this.props.user.lastName}
                                zipcode={this.props.user.zipcode}
                                city={this.props.user.city}
                                st={this.props.user.st}
                                profilepic={this.props.user.profilepic}
                                coverphoto={this.props.user.coverphoto}
                                onChange={this.props.onChange}
                                handleSignup={this.props.handleSignup}
                            />
                        </NavItem>
                    </Navbar>
                </div>
            </wrapper>
        );
    }
    };
};

NavBar.contextTypes = {
    router: PropTypes.object.isRequired
};

export default NavBar;





