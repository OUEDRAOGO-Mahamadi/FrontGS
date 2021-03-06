
import React,{ useState }  from "react";
import { Link,Redirect } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

import "../../boot.css"

const AdminNavbar = (props) => {
  const [deconnect, setDeconnect] = useState();
   let nom="";
   let prenom="";
   let name="";
   let firstname="";

   let data=  JSON.parse(localStorage.getItem('user'))
   
  if(data){
   name=data.nom
   nom=data.nom[0].toUpperCase()
   prenom=data.prenom[0].toUpperCase()
   firstname=data.prenom
  }


  const handleDeconnecter=()=>{
    setDeconnect( <Redirect to='/auth/login'/>)
    localStorage.removeItem('user')
    console.log("okkkkkkkk==>",deconnect)
  };




  return (
    <>
    {deconnect}
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/gs.jpeg")
                          .default
                      }
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                    {nom+""+prenom}
                       </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 style={{textAlign:"center"}} className="text-overflow m-0">Bienvenue!</h6>
                </DropdownItem>
                 <DropdownItem tag="div">
                  <i className="ni ni-single-02" />
                  <span>{name+" "+firstname}</span>
                </DropdownItem> 
                
                <DropdownItem divider />
                <DropdownItem href="/auth/login" onClick={handleDeconnecter}>
                  <i style={{color:"red"}} className="ni ni-button-power" />
                  <span style={{color:"red"}}>D??connecter</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
