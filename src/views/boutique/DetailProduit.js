
import  {React, Component } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import $ from "jquery";
import fs from "fs";

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

 class DetailProduit extends Component {
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
      color:"white",
      image:"",
      image_name:""
    }
  
  }

  componentDidMount() {
    var id=localStorage.getItem("idProduit")
   

    fetch("http://localhost:3000/produits/"+id)
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       $("#pv").val(data.pv+" FCFA")
       $("#quantite").val(data.qte)
       this.setState({image:"http://localhost/file/fichiers/data/"+data.image})
       this.setState({image_name:data.image})
       $("#limite").val(data.limite)
       $("#intitule").val(data.nom)
       $("#categorie").val(data.famille.nom)
       $("#user").val(data.user.lastname+" "+data.user.firstname)
    
     }
     
    );
    

  }

 handleRetour=()=>{
     this.setState({ok: <Redirect to='/admin/produit'/>});
  }

handleRemove=()=>{

  
 let data={avatar:this.state.image_name}

 $.ajax({
  type: "POST",
  url: 'http://localhost/file/fichiers/delete.php',
  data: data,
  success: function(data){
  console.log("okk",data);
  },
  error: function(xhr, status, error){
    console.log("hh======<",error);
  }
 });



  // const requestOptions = {
  //   method: 'POST',
  //   mode: 'cors',
  //   headers: {
  //   'Content-Type': 'application/json',
  //   },
  //   body:JSON.stringify(data)
  // };
  // console.log("data file",requestOptions)

  //   fetch("http://localhost/file/fichiers/delete.php", requestOptions)
  //   .then((response) => response.json()
    
  //   )
  //   .then(response =>{console.log("ok,",response)
  

  //  })

  
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
                    informations du produit
                  </h6>
                  <div className="pl-lg-4">
                    <Row  >
                     <Col  className="mt-2" md="4">
                        <img style={{marginTop:"30px"}} className="card-img-top" src={this.state.image} alt="Image"/>
                     </Col>

                   <Col md="8">
                    <Button onClick={this.handleRemove}>Delete</Button>
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
                            categorie
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="categorie"
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
                            Quantité
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="quantite"
                            readOnly
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
                            htmlFor="input-last-name"
                          >
                            Limite Stock
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="limite"
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
                            Enregistré Par
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="user"
                            readOnly
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                  </Row>
                    <hr className="my-4" />
                  {/* Description */}
                  </Col>
                  </Row>
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

export default DetailProduit;
