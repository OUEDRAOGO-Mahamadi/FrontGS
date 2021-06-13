
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

 class AjouterProduit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ok:"",
      isOpen:false,
      isOpenCat:false,
      result: 'No result',
      categorie:[],
      famille:0,
      code:null
    }
    this.handleScan = this.handleScan.bind(this)
    this.handleChangeCategorie.bind(this);
  }
  handleScan(data){
    this.setState({
      code: data
    })
    $("#code").val(this.state.code)
  }
  handleError(err){
    console.error(err)
  }
  componentDidMount() {
    

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
  
    
      var data= {
        "nom": $("#intitule").val(),
        "pv": $("#pv").val(),
        "qte":$("#quantite").val(),
        "famille_id":this.state.famille,
        "codebarre": this.state.code,
       
    
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
        body: JSON.stringify(data)
    };
      
    
    
    fetch('http://localhost:3000/produits', requestOptions)
       .then(response => response.json()
      )
      .then(data =>{console.log("enregitre avec succes vrai:",data)
    
     
     } )
    }
  

  handleChangeCategorie = (e) => {
    var data=[]
    console.log("adate =====>",e)
    try{
      this.setState({famille:e[0].value})
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

                    <Input
                            className="form-control-alternative"
                            id="code"
                            placeholder="code"
                            type="text"
                            readOnly
                          />
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            intitulé
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
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            
                             isMulti
                            onChange={this.handleChangeCategorie}
                            options={this.state.categorie}

                            placeholder="Choisir la categorie"
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
                
                  <Row >
                  <Col lg="12">
                  <FormGroup>
                      <label>description</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="description du produit"
                        rows="4"
                        // defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        // Open Source."
                        type="textarea"
                        id="description"
                      />
                    </FormGroup>
                    </Col>
                  </Row>
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
        <div>
        <BarcodeReader
          onError={this.handleError}
          onScan={this.handleScan}
          />
       
      </div>
      </Container>
    </>
  )};
};

export default AjouterProduit;
