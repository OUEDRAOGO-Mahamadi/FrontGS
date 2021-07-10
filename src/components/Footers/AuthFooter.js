
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {"2021"}{" "}
                <a
                  className="font-weight-bold ml-1"
                  
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
                
                    target="_blank"
                  >
                    Nous contacter
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                 
                    target="_blank"
                  >
                   +221771766428/+221775073620
                  </NavLink>
                </NavItem>
               
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
