
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

 class ApprovisionerStock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ok:"",
      isOpen:false,
      isOpenCat:false,
      result: 'No result',
      produit:[],
      produit_id:0,
      code:null
    }
   
    this.handleChangeProduit.bind(this);
  }


  componentDidMount() {
    

    fetch("http://localhost:3000/produits")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
      data.map((el)=>{
        this.setState({produit:[...this.state.produit,{value:el.id,label:el.nom}]})
      })
    
     }
     
    );
    }
  handleSave=()=>{
  
      var data= {
        "pa": $("#pv").val(),
        "stock":$("#quantite").val(),
        "produit_id":this.state.produit_id,
    
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
        body: JSON.stringify(data)
    };
      
    
    
    fetch('http://localhost:3000/magasins', requestOptions)
       .then(response => response.json()
      )
      .then(data =>{console.log("enregitre avec succes vrai:",data)
    
     
     } )
    }
  

  handleChangeProduit = (e) => {
    var data=[]
    console.log("adate =====>",e)
    try{
      this.setState({produit_id:e[0].value})
    }catch(ee){

    }
   

    // e.map((element,idx) =>{
    //   this.setState({thematiques_attributes:[...data,{"thematique_id":element.value}]})
    // })
  }
render() {
  const animatedComponents = makeAnimated();
  return (
    <>
      <Header />
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
                onClick={(e) => e.preventDefault()}
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
                    <h3 className="mb-0">Aprovisionner Dépot</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    informations du produit
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                  
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            produit
                          </label>
                          <ReactSelect
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            
                             isMulti
                            onChange={this.handleChangeProduit}
                            options={this.state.produit}

                            placeholder="Choisir le produit"
                      />
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Restant en Boutique
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="quantite-boutique"
                            placeholder="quantité dans la boutique"
                            type="number"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Restant en Dépot
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="quantite-depot"
                            placeholder="quantité dans le dépot"
                            type="number"
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
                            Quantité a ajouter
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="quantite"
                            placeholder="donner la quantité a ajouter"
                            type="number"
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
        </Row>
        
      </Container>
    </>
  )};
};

export default ApprovisionerStock;
