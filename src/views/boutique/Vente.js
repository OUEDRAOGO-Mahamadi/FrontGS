
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
  FormGroup,
  Col,
  Badge,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  ButtonDropdown,
  
} from "reactstrap";
import $ from "jquery";

import { format } from 'date-fns';
import Header from "components/Headers/Header.js";
import Flatpickr from "react-flatpickr"

class Vente extends Component {
  constructor(props) {
      super(props)
      this.state = {
        ok:"",
        isOpen:false,
        isOpenCat:false,
        defaultDate:new Date(),
        ventes:[],
        montant:0,
        date:""
      }
      this.handleDateDebut.bind(this);
      this.handleTrieDate.bind(this);
      this.handleDetail.bind(this)
      this.handleTrie.bind(this)
    }
 
  toggle=()=>{
   this.setState({isOpen:!this.state.isOpen})
  }
  toggleCat=()=>{
    this.setState({isOpenCat:!this.state.isOpenCat})
   }
  componentDidMount() {
    var total=0
    fetch("http://localhost:3000/ventes")
    .then((response) => response.json())
    .then((data) => {
      console.log("ventes:",data)
      const NewDate= format(new Date(),'yyyy-MM-dd')
      var panier=data.filter(x => x.created_at.split("T")[0] === NewDate)
      this.setState({ventes:panier})
       panier.map(e=>{
        total+=parseInt(e.montant)
       })
       $("#total").val(total+" FCFA")
     }
     
    );
  }
  handleRetour=()=>{
    this.setState({ok: <Redirect to='/admin/achat-produit'/>});
  }
  handleDateDebut= (date)=> {
    const NewDate= format(date[0],'dd/MM/yyyy');
    console.log("date",NewDate)
  }
  handleTrieDate=(e)=>{
    var total=0
    var date=e.target.value
    this.setState({date:date})
    console.log("date trie",date)
    fetch("http://localhost:3000/ventes")
    .then((response) => response.json())
    .then((data) => {
      var panier=data.filter(x => x.created_at.split("T")[0] === date)
      this.setState({ventes:panier})
      console.log("ventes:",data)
      panier.map(e=>{
        total+=parseInt(e.montant)
        console.log("someme",total)
       })
       var t=total
       $("#total").val(total+" FCFA")
       console.log("someme chap",total)
     }
     
    );
  }

  
  handleDetail=(id)=>{
    localStorage.setItem('idVente',id);
    this.setState({ok: <Redirect to='/admin/detail-vente'/>});
  }

  handleCharge=()=>{
    var total=0
    fetch("http://localhost:3000/ventes")
    .then((response) => response.json())
    .then((data) => {
      console.log("ventes:",data)
      const NewDate= format(new Date(),'yyyy-MM-dd')
      var panier=data.filter(x => x.created_at.split("T")[0] === this.state.date)
      this.setState({ventes:panier})
       panier.map(e=>{
        total+=parseInt(e.montant)
       })
       $("#total").val(total+" FCFA")
     }
     
    );
  }

  handleTrie=(e)=>{
    var total=0
    console.log("data send",e.target.value)
    var data= this.state.ventes.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)

       data.map(e=>{
        total+=parseInt(e.montant)
       })
       $("#total").val(total+" FCFA")
    
    this.setState({ventes:data})
   
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
                <Input placeholder="Rechercher" onChange={this.handleTrie}  type="text" />
        </InputGroup>
             
        </Col> 
         <Col md="4">
         <div style={{textAlign:"right"}} >
            <Button
                color="primary" 
                onClick={this.handleRetour}
                size="sm"
                        >
                        <span><i style={{fontSize:"small"}} className="ni ni-fat-add mt-1" />Vendre Produits</span>
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
                  <Col md="2" className="text-left">
                    <h3 className="mb-0">Liste des Ventes</h3>
                  </Col>
                  <Col md="2" className="text-right">
                  <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                           Total Vente:
                          </label>
                  </Col>
                  <Col md="3" className=" text-left">
                  <FormGroup>
                         
                          <Input
                            className="form-control-alternative"
                            readOnly
                            id="total"
                            placeholder="0 FCFA"
                            type="text"
                          />
                        </FormGroup>
                  </Col>
                  <Col md="2" className="text-right">
                    <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                            Date:
                      </label>
                  </Col>
                  <Col md="3" className="text-right">
                
                          
                          <InputGroup>
                          <Input onChange={this.handleTrieDate} type="date" id="date" name="trip-start" defaultValue={format(new Date(),'yyyy-MM-dd')} min="2021-01-01" max="2030-12-31"/>
                           </InputGroup>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Heure</th>
                    <th scope="col">Vendu Par</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Encaisse</th>
                    <th scope="col">Monnaie</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.ventes.map((data)=>(
                      (this.state.ventes.length!=0)?
                      (<tr>
                      <td >{data.created_at.split("T")[0]}</td>
                      <td >{data.created_at.split("T")[1].split(":")[0]+":"+data.created_at.split("T")[1].split(":")[1]}</td>
                      <td >{data.user.lastname}</td>
                      
                      <td>{data.montant} FCFA</td>
                      <td>{data.montantencaisse} FCFA</td>
                      <td>{data.monnaie} FCFA</td>
                      <td>
                      <i onClick={this.handleDetail.bind(this,data.id)} style={{fontSize:"medium",cursor:"pointer"}}   className="fas fa-info-circle text-primary mr-3"/>
                      </td>
                    </tr>):null

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

export default Vente;
