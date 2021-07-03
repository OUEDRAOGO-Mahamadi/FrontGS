
import {React, Component} from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  FormGroup,
  Form,
  NavLink,
  Input,
  Nav,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated';
import $ from "jquery";
import  { Redirect } from 'react-router-dom'

class DetailUser extends Component {
  constructor(props) {
      super(props)
      this.state = {
        ok:"",
        user:{},
        role:[],
        user:{},
        role_id:0,
      }
   
      
    }
  
  componentDidMount() {
    var id=localStorage.getItem("idUser")

    fetch("http://localhost:3000/users/"+id)
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       $("#role").val(data.role.nom)
       $("#nom").val(data.firstname)
       $("#prenom").val(data.lastname)
       $("#email").val(data.email)
       $("#username").val(data.username)
       $("#password").val(data.password_digest)
      })
 
  }

  handleChangeRole = (e) => {
    var data=[]
    console.log("adate =====>",e)
    try{
      this.setState({role_id:e.value})
    }catch(ee){

    }
   

  }



  handleRetour=()=>{
    this.setState({ok: <Redirect to='/admin/user'/>});
 }
  render() {
    const animatedComponents = makeAnimated();
      return (
        <>
          <Header />
          {/* Page content */}    {this.state.ok}
          <Container className="mt--9" fluid>
          <Row className="mt-0">
          <Col className="mb-5 mb-xl-0" md="12">
           <Card className="shadow"> 
            <CardHeader className="border-0">
            <Row >
            
            <Col md="4">
            <div style={{textAlign:"left"}} >
                <Button
                    color="primary" 
                    onClick={this.handleRetour}
                    size="sm"
                            >
                            Precedent
                </Button>
            </div>    
            </Col> 
            <Col md="8">
            
            </Col> 
            </Row>
            </CardHeader>
          </Card>
          </Col>

          </Row>

          <Row className="mt-2">
            
              <Col className="order-xl-1" md="12">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Detail Utilisateur</h3>
                      </Col>
                     
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        informations de l'utilisateur
                      </h6>
                      <div className="pl-lg-4">
                      <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Nom
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="nom"
                            
                                type="text"
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Prenom
                              </label>
                              <Input
                                className="form-control-alternative"
                                
                                id="prenom"
                            
                                type="text"
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Username
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="username"
                             
                                type="text"
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Email
                              </label>
                              <Input
                                className="form-control-alternative"
                                
                                id="email"
                           
                                type="text"
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                              role
                              </label>
                              <Input
                                className="form-control-alternative"
                                
                                id="role"
                                
                                type="text"
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                              password
                              </label>
                              <Input
                                className="form-control-alternative"
                                
                                id="password"
                              
                                type="password"
                              />
                            </FormGroup>
                          </Col>
                         
                        </Row>
                        <hr className="my-4" />
                      {/* Description */}
                    
                    
                      </div>
                      
                        
                  
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
           
          </Container>
        </>
 
  );
}
};

export default DetailUser;
