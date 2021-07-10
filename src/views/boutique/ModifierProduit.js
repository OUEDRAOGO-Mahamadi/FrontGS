
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

 class AjouterProduit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ok:"",
      isOpen:false,
      isOpenCat:false,
      result: 'No result',
      categorie:[],
      famille:{},
      code:"",
      produit:[],
      resultCategorie:"",
      nouveau:true,
      detail:false,
      color:"white"

    }
   
    this.handleChangeCategorie.bind(this);
  }

  componentDidMount() {
    var id=localStorage.getItem("idProduit")
    fetch("http://localhost:3000/produits/"+id)
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       $("#intitule").val(data.nom)
       $("#pv").val(data.pv)
       $("#quantite").val(data.qte)
       this.setState({code:data.codebarre})
       this.setState({famille:{value:data.famille.id,label:data.famille.nom}})

     }
     
    );

    fetch("http://localhost:3000/familles")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
      data.map((el)=>{
        this.setState({categorie:[...this.state.categorie,{value:el.id,label:el.nom}]})
      })
    
     }
     
    );
    }
  handleSave=()=>{
    var id=localStorage.getItem("idProduit")
    
      var data= {
        "nom": $("#intitule").val(),
        "pv": $("#pv").val(),
        "qte":$("#quantite").val(),
        "famille_id":this.state.famille.value,
        "codebarre": this.state.code,
       
    
      }
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
        body: JSON.stringify(data)
    };
      
    
    
    fetch('http://localhost:3000/produits/'+id, requestOptions)
       .then(response => response.json()
      )
      .then(data =>{console.log("enregitre avec succes vrai:",data)
      console.log("data send",data)
        this.setState({produit:data})
        this.setState({nouveau:false})
     } )
    }
  

  handleChangeCategorie = (e) => {
    var data=[]
    console.log("adate =====>",e)
    try{
      this.setState({famille:{value:e.value,label:e.label},resultCategorie:e.label})
    }catch(ee){

    }
   

    // e.map((element,idx) =>{
    //   this.setState({thematiques_attributes:[...data,{"thematique_id":element.value}]})
    // })
  }

  handleRetour=()=>{
    this.setState({ok: <Redirect to='/admin/produit'/>});
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
                        Retour
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
                    <h3 className="mb-0">Modifier Produit</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={this.handleRetour}
                      size="sm"
                    >
                      Precedent
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
                            htmlFor="input-username"
                          >
                            nom
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="intitule"
                            placeholder="intitulé du produit"
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
                            categorie
                          </label>
                          <ReactSelect
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            //defaultValue={this.state.famille}
                            onChange={this.handleChangeCategorie}
                            options={this.state.categorie}
                            id="categorie"
                            placeholder={this.state.famille.label}
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
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Prix de Vente
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="pv"
                            placeholder="PV"
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
                id="valide"
                size="md"
                        >
                        Ajouter
            </Button>
         </div> 

          </Col>
        </Row>
        <div>
       
       
      </div>  </>):(
         <div className="mt-8">
           <h3>Produit modifié dans la boutique</h3>
          <div id="echecSauv" className="alert alert-dark  mt-2" role="alert">
              <div>
                <span>Nom: </span> {this.state.produit.nom}
              </div>
              <div>
                <span>Categorie: </span> {this.state.produit.famille.nom}
              </div>
              <div>
                <span>Quantité: </span>{this.state.produit.qte}
              </div>
              <div>
                <span>Prix: </span>{this.state.produit.pv}
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
                    onClick={this.handleRetour}
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

export default AjouterProduit;
