import React from "react";
import "./style.css";
import { Card, Col, Collection, CollectionItem } from "react-materialize";
import {Link} from "react-router-dom";

// By extending the React.Component class, Counter inherits functionality from it
function ProfileSelector(props) {
    //console.log("Rendering profile selector for " );
    //console.log(props.user);

    // The render method returns the JSX that should be rendered
    return (
        <wrapper className="container" id="profile-selection">
                <Col s={12} m={10} l={3}  className="offset-m1 offset-l1">
                    <Card title='Profile'>
                        <Collection>
                            <Link to="/profile/aboutme"><CollectionItem onClick={() => props.activeComponent("about-me")} className="profile-selector" id="about-me" href="/profile/aboutme" active><i className="fas fa-user"></i>About Me</CollectionItem></Link>
                            <Link to="/profile/contactinfo"><CollectionItem onClick={() => props.activeComponent("contact-info")} className="profile-selector" id="contact-info" href="/profile/contactinfo"><i className="fas fa-address-book"></i>Contact Info</CollectionItem></Link>
                            <Link to="/profile/notifications"><CollectionItem onClick={() => props.activeComponent("notifications")} className="profile-selector" id="notifications" href="/profile/notifications"><i className="fas fa-bell"></i>Notifications</CollectionItem></Link>
                            <Link to="/profile/updatelogin"><CollectionItem onClick={() => props.activeComponent("update-login")} className="profile-selector" id="update-login" href="/profile/updatelogin"><i className="fas fa-pencil-alt"></i>Update Login</CollectionItem></Link>
                            <Link to={{pathname:"/profile/virtualgarden", state:props.user}}><CollectionItem onClick={() => props.activeComponent("virtual-garden")} className="profile-selector" id="virtual-garden" href="/profile/virtualgarden"><i className="fas fa-leaf"></i>Virtual Garden</CollectionItem></Link>
                        </Collection>
                    </Card>
                </Col>
        </wrapper>
    );
};
export default ProfileSelector;


