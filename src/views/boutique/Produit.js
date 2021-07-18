
import {React, Component} from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import  { Redirect } from 'react-router-dom'
import $ from "jquery";
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
  Modal,
  ModalBody,
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
import Confirmer from "components/Confirmer.js";

class Produit extends Component {
  constructor(props) {
      super(props)
      this.state = {
        ok:"",
        isOpen:false,
        isOpenCat:false,
        show:false,
        produits:[],
        categorie:[],
        id:0,
        user:JSON.parse(localStorage.getItem('user'))
      }
      this.handleTieCategorie.bind(this)
      this.handleTieStock.bind(this)
      this.supprimer.bind(this)
      this.handleDetail.bind(this)
      this.handleModifier.bind(this)
      this.handleTrie.bind(this)

    }
 
  toggle=()=>{
   this.setState({isOpen:!this.state.isOpen})
  }
  toggleCat=()=>{
    this.setState({isOpenCat:!this.state.isOpenCat})
   }
  componentDidMount() {
   var user= JSON.parse(localStorage.getItem('user'))
   if(user.role!="ADMIN"){
     $("#role1").css("display","none")
     $("#role2").css("display","none")
     $("#role3").css("display","none")
     $(".txt").css("display","none")
   }

    fetch("http://localhost:3000/produits")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       this.setState({produits:data.reverse()})
    
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
  handleRetour=()=>{
    this.setState({ok: <Redirect to='/admin/ajouter-produit'/>});
  }

  handleTieCategorie=(nom)=>{
    fetch("http://localhost:3000/produits")
    .then((response) => response.json())
    .then((data) => {
      var panier=data.filter(x => x.famille.nom === nom)
      this.setState({produits:panier})
    
     }
     
    );
   
  }

  handleTieStock=(stock)=>{
    fetch("http://localhost:3000/produits")
    .then((response) => response.json())
    .then((data) => {
      if(stock==="5-"){
        var panier=data.filter(x => x.qte<=5)
        this.setState({produits:panier})
      }else{
        var panier=data.filter(x => x.qte>5)
        this.setState({produits:panier})
      }
        
    
     }
     
    );
   
  }

  toggled=()=>{
    this.setState({show:!this.state.show})
  }

  supprimer=(id)=>{
    if(this.state.user.role=="ADMIN"){
    this.setState({id:id,show:true})
    }
  }

  handleSupprimer=()=>{

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
     // body: JSON.stringify(data)
    };
    
  
  
  fetch('http://localhost:3000/produits/'+this.state.id, requestOptions)
    
    .then(data =>{console.log("enregitre avec succes vrai:",data)
    console.log("data send",data)
      this.setState({produits:this.state.produits.filter(element=>element.id!=this.state.id)})
      this.setState({show:false})
     
   } )
  }

  handleDetail=(id)=>{
    localStorage.setItem('idProduit',id);
    this.setState({ok: <Redirect to='/admin/detail-produit'/>});
  }

  handleModifier=(id)=>{
    if(this.state.user.role=="ADMIN"){
    localStorage.setItem('idProduit',id);
    this.setState({ok: <Redirect to='/admin/modifier-produit'/>});
    }
  }

  handleCharge=()=>{
    fetch("http://localhost:3000/produits")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       this.setState({produits:data.reverse()})
    
     }
     
    );
  }

  handleTrie=(e)=>{
    console.log("data send",e.target.value)
    var data= this.state.produits.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
    this.setState({produits:data})
   
    if(e.target.value==""){
      this.handleCharge()
    }
   }

  render() {
 
  return (
    <>
    
      <Header />
      {/* Page content */}            {this.state.ok}

     

      <Container className="mt--9" fluid>
        <Confirmer show={this.state.show} handleValider={this.handleSupprimer} toggle={this.toggled}/>
  
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
                <Input placeholder="Rechercher" onChange={this.handleTrie} type="text" />
        </InputGroup>
             
        </Col> 
         <Col md="4">
         <div style={{textAlign:"right"}} >
            <Button
                color="primary" 
                onClick={this.handleRetour}
                size="sm"
                        >
                        <span><i style={{fontSize:"small"}} className="ni ni-fat-add mt-1" />Ajouter Produits</span>
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
                    <h3 className="mb-0">Alimentation/Produits</h3>
                  </Col>
                  <Col md="2" className=" text-right">
                  <ButtonDropdown direction="left" size="sm" isOpen={this.state.isOpenCat} toggle={this.toggleCat}>
                    <DropdownToggle caret color="primary">
                      Categorie
                    </DropdownToggle>
                    <DropdownMenu>
                      {/* <DropdownItem header>Header</DropdownItem> */}
                      {/* <DropdownItem>Categorie 1</DropdownItem>
                      <DropdownItem divider/>
                      <DropdownItem>Categorie 2</DropdownItem> */}
                         {
                        this.state.categorie.map((val,idx)=>(
                          <>
                          <DropdownItem onClick={this.handleTieCategorie.bind(this,val.nom)}>{val.nom}</DropdownItem>
                           <DropdownItem divider></DropdownItem>
                          </>
                        ))
                        
                        }
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
                          this.state.produits.map((element,idx) =>(
                            (parseInt(element.qte)>element.limite)?
                            (<tr>
                            <td >{element.created_at.split("T")[0]}</td>
                            <td >{element.nom}</td>
                              <td>{element.famille.nom}</td>
                              <td>{element.pv} FCFA</td>
                              <td><Badge style={{fontSize:"small",cursor:"pointer"}} pill color="success">{element.qte}</Badge></td>
                              <td>
                                <i id="role1" onClick={this.handleModifier.bind(this,element.id)} style={{fontSize:"medium",cursor:"pointer"}} className="fas fa-edit text-success mr-3" /><i onClick={this.handleDetail.bind(this,element.id)} style={{fontSize:"medium",cursor:"pointer"}}   className="fas fa-info-circle text-primary mr-3"/><i id="role2" style={{fontSize:"medium",cursor:"pointer"}} onClick={this.supprimer.bind(this,element.id)} className="fas fa-trash-alt text-danger  mr-3"/>
                              </td>
                            </tr>):
                            (<tr>
                            <td >{element.created_at.split("T")[0]}</td>
                            <td >{element.nom}</td>
                              <td>{element.famille.nom}</td>
                              <td>{element.pv} FCFA</td>
                              <td><Badge style={{fontSize:"small",cursor:"pointer"}} pill color="warning">{element.qte}</Badge></td>
                              <td>
                                <i id="role3" onClick={this.handleModifier.bind(this,element.id)} style={{fontSize:"medium",cursor:"pointer"}} className="fas fa-edit text-success mr-3 role" ></i><i onClick={this.handleDetail.bind(this,element.id)} style={{fontSize:"medium",cursor:"pointer"}}   className="fas fa-info-circle text-primary mr-3"/><i id="role4" style={{fontSize:"medium",cursor:"pointer"}} onClick={this.supprimer.bind(this,element.id)} className="fas fa-trash-alt role text-danger mr-3"/>
                              </td>
                            </tr>)
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

export default Produit;
