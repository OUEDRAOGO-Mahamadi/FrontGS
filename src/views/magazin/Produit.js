
import {React, Component} from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import  { Redirect } from 'react-router-dom'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
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
  Badge,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  ButtonDropdown
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

class ProduitMagazin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ok:"",
      isOpen:false,
      isOpenCat:false,
      stock:[],
      categorie:[]
    }
    this.handleTieCategorie.bind(this)
    this.handleTieStock.bind(this)
  }

toggle=()=>{
 this.setState({isOpen:!this.state.isOpen})
}
toggleCat=()=>{
  this.setState({isOpenCat:!this.state.isOpenCat})
 }

  componentDidMount() {
   fetch("http://localhost:3000/magasins")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       this.setState({stock:data})
    
     }
     
    );
    fetch("http://localhost:3000/familles")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
   
        this.setState({categorie:data})
      
    
     }
     
    );
  }
  handleCharge=()=>{
    fetch("http://localhost:3000/magasins")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       this.setState({stock:data})
    
     }
     
    );
  }
  handleTieCategorie=(nom)=>{
    fetch("http://localhost:3000/magasins")
    .then((response) => response.json())
    .then((data) => {
      var panier=data.filter(x => x.produit.famille.nom === nom)
      this.setState({stock:panier})
    
     }
     
    );
   
  }

  handleTieStock=(stock)=>{
    fetch("http://localhost:3000/magasins")
    .then((response) => response.json())
    .then((data) => {
      if(stock==="5-"){
        var panier=data.filter(x => x.stock<=5)
        this.setState({stock:panier})
      }else{
        var panier=data.filter(x => x.stock>5)
        this.setState({stock:panier})
      }
        
    
     }
     
    );
   
  }
  handleRetour=()=>{
    this.setState({ok: <Redirect to='/admin/ajouter-stock'/>});
  }
  render() {
 
  return (
    <>
      <Header />
      {/* Page content */}            {this.state.ok}
      <Container className="mt--9" fluid>
      <Row className="mt-0">
      <Col className="mb-5 mb-xl-0" md="12">
         <Card className="shadow"> 
         <CardHeader className="border-0">
         <Row >
         <Col md="8">
         <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
        </InputGroup>
             
        </Col> 
         <Col md="4">
         <div style={{textAlign:"right"}} >
            <Button
                color="primary" 
                onClick={this.handleRetour}
                size="sm"
                        >
                        Ajouter Produits
            </Button>
         </div>    
         </Col> 
         </Row>
         </CardHeader>
      </Card>
      </Col>

      </Row>
   
        <Row className="mt-2">
          <Col className="mb-5 mb-xl-0" md="12">
            <Card className="shadow">
              <CardHeader className="border-0">
              <Row >
                  <Col md="9" className="text-left">
                    <h3 className="mb-0">Dépot/Produits</h3>
                  </Col>
                  <Col md="2" className=" text-right">
                  <ButtonDropdown direction="left" size="sm" isOpen={this.state.isOpenCat} toggle={this.toggleCat}>
                    <DropdownToggle caret color="primary">
                      Categorie
                    </DropdownToggle>
                    <DropdownMenu>
                      {/* <DropdownItem header>Header</DropdownItem> */}
                        {
                        this.state.categorie.map((val,idx)=>(
                          <>
                          <DropdownItem onClick={this.handleTieCategorie.bind(this,val.nom)}>{val.nom}</DropdownItem>
                           <DropdownItem divider></DropdownItem>
                          </>
                        ))
                        
                        }
                         
                      {/* <DropdownItem>Categorie 2</DropdownItem> */}
                    </DropdownMenu>
                  </ButtonDropdown>
                  </Col>
                  <Col md="1" className="text-right">
                  <ButtonDropdown direction="left" size="sm" isOpen={this.state.isOpen} toggle={this.toggle}>
                    <DropdownToggle caret color="primary">
                      Stock
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.handleTieStock.bind(this,"5-")}>Rupture</DropdownItem>
                      <DropdownItem onClick={this.handleTieStock.bind(this,"5+")}>Disponible</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Categorie</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Quantité</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
              {
                this.state.stock.map((data)=>(
                  (data.length=!0)?
                  (
                      (parseInt(data.stock)>5)?
                      (<tr>
                      <td >05/06/2021</td>
                      <td >{data.produit.nom}</td>
                        <td>{data.produit.famille.nom}</td>
                        <td>{data.pa}</td>
                        <td><Badge style={{fontSize:"small",cursor:"pointer"}} pill color="success">{data.stock}</Badge></td>
                        <td>
                        <i style={{fontSize:"medium",cursor:"pointer"}} className="fas fa-edit text-success mr-3" /><i style={{fontSize:"medium",cursor:"pointer"}}   className="fas fa-info-circle text-primary mr-3"/><i style={{fontSize:"medium",cursor:"pointer"}}  className="fas fa-trash-alt text-danger mr-3"/>
                        </td>
                      </tr>):
                      (<tr>
                        <td >05/06/2021</td>
                        <td >{data.produit.nom}</td>
                          <td>{data.produit.famille.nom}</td>
                          <td>{data.pa}</td>
                          <td><Badge style={{fontSize:"small",cursor:"pointer"}} pill color="warning">{data.stock}</Badge></td>
                          <td>
                          <i style={{fontSize:"medium",cursor:"pointer"}} className="fas fa-edit text-success mr-3" /><i style={{fontSize:"medium",cursor:"pointer"}}   className="fas fa-info-circle text-primary mr-3"/><i style={{fontSize:"medium",cursor:"pointer"}}  className="fas fa-trash-alt text-danger mr-3"/>
                          </td>
                        </tr>)
                  ):null
                ))
           
              }
              
                </tbody>
              </Table>
            </Card>
          </Col>
        
        </Row>
      
      </Container>
    </>
  );
}
};

export default ProduitMagazin;
