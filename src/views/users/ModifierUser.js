
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

class ModifierUser extends Component {
  constructor(props) {
      super(props)
      this.state = {
        ok:"",
        user:{},
        role:[],
        nouveau:true,
        role_id:0,
        init_role:""
      }
   
      this.handleChangeRole.bind(this)
    }
  
  componentDidMount() {
   
    var id=localStorage.getItem("idUser")

    fetch("http://localhost:3000/users/"+id)
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data.role.nom)
       this.setState({user:data,init_role:data.role.nom})
       this.setState({role_id:data.role.id})
       $("#nom").val(data.firstname)
       $("#prenom").val(data.lastname)
       $("#email").val(data.email)
       $("#username").val(data.username)
       $("#password1").val(data.password_digest)
       $("#password2").val(data.password_digest)
       
     }
     
    );

    
    fetch("http://localhost:3000/roles")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       //this.setState({role:data})
       data.map((el)=>{
        this.setState({role:[...this.state.role,{value:el.id,label:el.nom}]})
      })
     }
     
    );
  }

  handleChangeRole = (e) => {
    var data=[]
    console.log("adate =====>",e)
    try{
      this.setState({role_id:e.value})
    }catch(ee){

    }
   

    // e.map((element,idx) =>{
    //   this.setState({thematiques_attributes:[...data,{"thematique_id":element.value}]})
    // })
  }

  handleSave=()=>{
  
    var id=localStorage.getItem("idUser")

    var data= {
      "firstname": $("#nom").val(),
      "lastname": $("#prenom").val(),
      "email":$("#email").val(),
      "role_id":this.state.role_id,
      "username": $("#username").val(),
      "password_digest": $("#password1").val(),
      //"password_confirmation":$("#password2").val(),
     
  
    }
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
      body: JSON.stringify(data)
  };
    
  
  
  fetch('http://localhost:3000/users/'+id, requestOptions)
     .then(response => response.json()
    )
    .then(data =>{console.log("enregitre avec succes vrai:",data)
    console.log("data send",data)
      this.setState({user:data})
      this.setState({nouveau:false})
   } )
  }

  handleAddNew=()=>{
    this.setState({ok: <Redirect to='/admin/user'/>});
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


        {
          (this.state.nouveau) ? 
          (
         <>
      
          <Row className="mt-2">
            
              <Col className="order-xl-1" md="12">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Ajouter Utilisateur</h3>
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
                                placeholder="email"
                                type="text"
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
                                placeholder="Email"
                                type="text"
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
                                placeholder="email"
                                type="text"
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
                                placeholder="Email"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                              role
                              </label>
                              <ReactSelect
                                closeMenuOnSelect={true}
                                components={animatedComponents}

                                onChange={this.handleChangeRole}
                                options={this.state.role}

                                placeholder={this.state.init_role}
                             />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                              password
                              </label>
                              <Input
                                className="form-control-alternative"
                                
                                id="password1"
                                placeholder="mot de passe"
                                type="password"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                              confirmer password
                              </label>
                              <Input
                                className="form-control-alternative"
                                
                                id="password2"
                                placeholder="confirmer le mot de passe"
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
            <Row className="mt-2">
              <Col md="8">

              </Col>
              <Col md="2">
                <div style={{textAlign:"right"}} >
                  <Button
                      color="secondary" 
                      onClick={this.handleRetour}
                      size="md"
                              >
                              Annuler
                  </Button>
              </div> 
              </Col>
              <Col md="2">
              <div style={{textAlign:"right"}} >
                <Button
                    color="primary" 
                    onClick={this.handleSave}
                    size="md"
                            >
                            Ajouter
                </Button>
            </div> 

              </Col>
            </Row> </>):(
         <div className="mt-8">
           <h3>Utilisateur Modifie</h3>
          <div id="echecSauv" className="alert alert-dark  mt-2" role="alert">
              <div >
                <span>Nom: </span> {this.state.user.firstname}
              </div>
              <div className="mt-3">
                <span>Prenom: </span> {this.state.user.lastname}
              </div>
              <div className="mt-3">
                <span>Username: </span>{this.state.user.username}
              </div>
              <div className="mt-3">
                <span>Email: </span>{this.state.user.email}
              </div>
              <div className="mt-3">
                <span>Role: </span>{this.state.user.role.nom}
              </div>
           </div>
              <Row className="mt-2">
              <Col md="8">

              </Col>
              <Col md="2">
                
              </Col>
              <Col md="2">
              <div style={{textAlign:"right"}} >
                <Button
                    color="primary" 
                    onClick={this.handleAddNew}
                    size="md"
                            >
                            ok
                </Button>
            </div> 

              </Col>
            </Row>
         </div>
        
      )
    }
          </Container>
        </>
 
  );
}
};

export default ModifierUser;
