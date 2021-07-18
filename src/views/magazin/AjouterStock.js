
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
import  { Redirect } from 'react-router-dom'

 class AjouterStock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ok:"",
      isOpen:false,
      isOpenCat:false,
      result: 'No result',
      produit:[],
      produit_id:0,
      nouveau:true,
      detail:false,
      magazin:{},
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
      let pa=$("#pv").val()
      let stock=$("#quantite").val()
      if(pa==""){
       pa=0
      }
      if(stock==""){
        stock=0
       }
      var data= {
        "pa": pa,
        "stock":stock,
        "limite":$("#limite").val(),
        "produit_id":this.state.produit_id,
    
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
        body: JSON.stringify(data)
    };
      
    if(this.state.produit_id!=0){
      fetch('http://localhost:3000/magasins', requestOptions)
      .then(response => response.json()
     )
     .then(data =>{console.log("enregitre avec succes vrai:",data)
     this.setState({magazin:data})
       this.setState({nouveau:false})
    
    } )
    }
    
   


    }
  

  handleChangeProduit = (e) => {
    var data=[]
    console.log("adate =====>",e)
    try{
      this.setState({produit_id:e.value})
    }catch(ee){

    }
   

    // e.map((element,idx) =>{
    //   this.setState({thematiques_attributes:[...data,{"thematique_id":element.value}]})
    // })
  }

  handleAddNew=()=>{
    this.setState({nouveau:true})
  }

  handleRetour=()=>{
    this.setState({ok: <Redirect to='/admin/magazin'/>});
 }

render() {
  const animatedComponents = makeAnimated();
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
                    <h3 className="mb-0">Ajouter Produit</h3>
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
                            closeMenuOnSelect={true}
                            components={animatedComponents}

                            onChange={this.handleChangeProduit}
                            options={this.state.produit}

                            placeholder="Choisir le produit"
                      />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Quantité
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="quantite"
                            placeholder="quantité"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Limite Rupture Stock
                          </label>
                          <Input
                                className="form-control-alternative"
                                defaultValue="0"
                                id="limite"
                                placeholder="Limite Rupture Stock"
                                type="number"
                                  />
                            </FormGroup>
                        </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Prix d' Achat
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="pv"
                            placeholder="pa"
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
        </Row>) </>):(
         <div className="mt-8">
           <h3>Produit ajouté dans le magasin</h3>
          <div id="echecSauv" className="alert alert-dark  mt-2" role="alert">
              <div>
                <span>Nom: </span> {this.state.magazin.produit.nom}
              </div>
              <div>
                <span>Categorie: </span> {this.state.magazin.produit.famille.nom}
              </div>
              <div>
                <span>Quantité: </span>{this.state.magazin.stock}
              </div>
              <div>
                <span>Limite Rupture Stock: </span>{this.state.magazin.limite}
              </div>
              <div>
                <span>Prix: </span>{this.state.magazin.pa}
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
  )};
};

export default AjouterStock;
