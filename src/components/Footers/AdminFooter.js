
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {"2021"}{" "}
            <a
              className="font-weight-bold ml-1"
             
              rel="noopener noreferrer"
              target="_blank"
            >
              {"D&O"}
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
          

            <NavItem>
              <NavLink
                rel="noopener noreferrer"
                target="_blank"
              >
                Nous  Contacter
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                //href="http://blog.creative-tim.com?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                +221771766428/+221775073620
              </NavLink>
            </NavItem>

            <NavItem>
            
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
