
import  {React, Component } from "react";
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
import BarcodeReader from 'react-barcode-reader'
import  { Redirect } from 'react-router-dom'
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated';
import Header from "components/Headers/Header.js";

 class DetailVente extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ok:"",
      isOpen:false,
      isOpenCat:false,
      result: 'No result',
      categorie:[],
      famille:0,
      code:null,
      produit:{},
      resultCategorie:"",
      nouveau:true,
      detail:false,
      color:"white"
    }
  
  }

  componentDidMount() {
    var id=localStorage.getItem("idVente")
   

    fetch("http://localhost:3000/ventes/"+id)
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       $("#date").val(data.created_at.split("T")[0]+"  "+data.created_at.split("T")[1].split(":")[0]+":"+data.created_at.split("T")[1].split(":")[1])
       $("#encaisse").val(data.montantencaisse)
       $("#total").val(data.montant)
       $("#monnaie").val(data.monnaie)
    
     }
     
    );
    

  }

 handleRetour=()=>{
     this.setState({ok: <Redirect to='/admin/vente'/>});
  }

render() {
  const animatedComponents = makeAnimated();
  return (
    <>
      <Header />   {this.state.ok}
      {/* Page content */}
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
                        Rétour
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
            
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    informations de la vente
                  </h6>
                  <div className="pl-lg-4">
                    
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Date
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="date"
                            readOnly
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Montant Total
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="total"
                            readOnly
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
                            Montant Encaissé
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="encaisse"
                            readOnly
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
                            Monnaie remise
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="monnaie"
                            readOnly
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
        
      
      </Container>
    </>
  )};
};

export default DetailVente;
