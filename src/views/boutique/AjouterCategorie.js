
import { Component, React} from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import $ from "jquery";
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
import  { Redirect } from 'react-router-dom'

class AjouterCategorie extends Component {
  constructor(props) {
      super(props)
      this.state = {
        ok:"",
        coleur:"black",
        nouveau:true,
        categorie:""
      }
      
    }




  handleSave=()=>{
  
    
    var data= {
      "nom": $("#intitule").val(),
    
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
      body: JSON.stringify(data)
  };
  fetch('http://localhost:3000/familles', requestOptions)
  .then(response => response.json()
 )
 .then(data =>{
   console.log("enregitre avec succes vrai:",data)
   this.setState({nouveau:false})
   this.setState({categorie:data.nom})
} )

  }
  
  handleAddNew=()=>{
    this.setState({nouveau:true})

  }

  handleRetour=()=>{
    this.setState({ok: <Redirect to='/admin/categorie'/>});
 }

render() {
  return (
    <>
      <Header />
      {/* Page content */}   {this.state.ok}
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
                    <h3 className="mb-0">Ajouter Categorie</h3>
                  </Col>
              
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    informations de la categorie
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Nom
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="intitule"
                            placeholder="intitulé de la categorie"
                            type="text"
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
                  //onClick={this.handleRetour}
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
           <h3>Catégorie ajouteé avec success</h3>
          <div id="echecSauv" className="alert alert-dark  mt-2" role="alert">
        
              <div>
                <span>Categorie: </span>  {this.state.categorie}
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
                            OK
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
};

}
export default AjouterCategorie;
