
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
import { EndOfLineState } from "typescript";

 class ApprovisionerBoutique extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ok:"",
      isOpen:false,
      isOpenCat:false,
      result: 'No result',
      produit:[],
      produit_id:0,
      stock_id:0,
      code:null,
      stock:{},
      initialStock:0,
      initialBoutique:0,
      quantiteFinale:0,
      nouveau:true,
      color:"black",
      ajoute:0,
      boutique:{}
    }
   
    this.handleChangeProduit.bind(this);
    this.handleErrorValue.bind(this)
  }


  componentDidMount() {
    document.getElementById("valide").disabled = true;

    fetch("http://localhost:3000/magasins")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       var panier=data.filter(x => x.produit.qte<=5)
      panier.map((el)=>{
        this.setState({produit:[...this.state.produit,{value:el.produit.id,id:el.id,label:el.produit.nom,restantBoutique:el.produit.qte,restantStock:el.stock}]})
      })
    
     }
     
    );
    }
  handleSave=()=>{
    var totalBoutique=0
    var totalStock=0
    totalBoutique=this.state.initialBoutique+parseInt($("#quantite").val())
    totalStock=this.state.initialStock-parseInt($("#quantite").val())


      var dataStock= {
        stock:totalStock
      
      }
      var dataBoutique= {
        qte:totalBoutique
      
      }
      
      const jsonBoutique = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
        body: JSON.stringify(dataBoutique)
      };

      const jsonStock = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
        body: JSON.stringify(dataStock)
      };
      
    fetch('http://localhost:3000/produits/'+this.state.produit_id, jsonBoutique)
     .then(response => response.json()
    )
    .then(data =>{console.log("enregitre avec succes vrai:",data)
        this.setState({boutique:data})
        this.setState({nouveau:false})
   
   } )
    
    fetch('http://localhost:3000/magasins/'+this.state.stock_id, jsonStock)
       .then(response => response.json()
      )
      .then(data =>{console.log("enregitre avec succes vrai:",data)
      this.setState({stock:data})
     
     } )

   



    }
  

  handleChangeProduit = (e) => {
    var data=[]
    var total=0
    console.log("adate =====>",e)
    try{
      this.setState({produit_id:e.value,stock_id:e.id,qte_boutique:e.restantBoutique,qte_stock:e.restantStock})
      $("#quantite-boutique").val(e.restantBoutique)
      $("#quantite-depot").val(e.restantStock)
      
      this.setState({initialStock:parseInt(e.restantStock),initialBoutique:parseInt(e.restantBoutique)})
      document.getElementById("valide").disabled = false;
    }catch(ee){

    }
  
  }

  handleAddNew=()=>{
    this.setState({nouveau:true,produit:[]})
    fetch("http://localhost:3000/magasins")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       var panier=data.filter(x => x.produit.qte<=5)
      panier.map((el)=>{
        this.setState({produit:[...this.state.produit,{value:el.produit.id,id:el.id,label:el.produit.nom,restantBoutique:el.produit.qte,restantStock:el.stock}]})
      })
    
     }
     
    );
   
    }

 handleErrorValue=(e)=>{
  console.log("value",e.target.value)
  $("#quantite-depot").val(this.state.qte_stock)
  $("#quantite-boutique").val(this.state.qte_boutique)
   try{
     if(parseInt(e.target.value)>parseInt($("#quantite-depot").val())){
      $("#valideAppro").css("display","block")
      $("#quantite").addClass("is-invalid")
      this.setState({color:"red"})
      document.getElementById("valide").disabled = true;
     }else{
      $("#valideAppro").css("display","none")
      $("#quantite").removeClass("is-invalid")
      this.setState({color:"black"})
      document.getElementById("valide").disabled = false;
      this.setState({ajoute:e.target.value})
      if(e.target.value){
        $("#quantite-boutique").val(parseInt($("#quantite-boutique").val())+parseInt(e.target.value))
        $("#quantite-depot").val(parseInt($("#quantite-depot").val())-parseInt(e.target.value))
      }else{
        $("#quantite-depot").val(this.state.qte_stock)
        $("#quantite-boutique").val(this.state.qte_boutique)
      }
      
     }
   }catch(error){

   }
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
                    <h3 className="mb-0">Boutique/Aprovisionner</h3>
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
                            type="text"
                            style={{color:"black"}}
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
                            type="text"
                            readOnly
                            style={{color:"black"}}
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
                            onChange={this.handleErrorValue}
                            style={{color:this.state.color}}
                          />
                          <div id="valideAppro" class="invalid-feedback">
                            Quantité Non disponible en stock.
                           </div>
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
                id="valide"
                onClick={this.handleSave}
                size="md"
                        >
                        Ajouter
            </Button>
         </div> 

          </Col>
        </Row></>):(
         <div className="mt-8">
           <h3>Produit ravitaillé avec success</h3>
          <div id="echecSauv" className="alert alert-warning  mt-2" role="alert">
              <div>
                <span>Nombre ajouté: </span> {this.state.ajoute}
              </div>
              <div>
                <span>Quantité Stock Restant: </span>{this.state.stock.stock}
              </div>
              <div>
                <span>Quantité Totale Boutique: </span>{this.state.boutique.qte}
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
                            Retour
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

export default ApprovisionerBoutique;
