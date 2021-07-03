
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
  Badge
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

class User extends Component {
  constructor(props) {
      super(props)
      this.state = {
        ok:"",
        stock:[],
        user:[],
        id:0,show:false
      }

      this.supprimer.bind(this)
      this.handleDetail.bind(this)
      this.handleModifier.bind(this)
      this.handleCharge.bind(this)
      this.handleTrie.bind(this)
    }
  
  componentDidMount() {
   this.handleCharge()
  }

  handleCharge=()=>{
    fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       this.setState({user:data})
    
     }
     
    );
  }


  handleNewUser=()=>{
    this.setState({ok: <Redirect to='/admin/ajouter-user'/>});
  }

  toggled=()=>{
    this.setState({show:!this.state.show})
  }

  supprimer=(id)=>{
    this.setState({id:id,show:true})
  }

  handleSupprimer=()=>{

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
     // body: JSON.stringify(data)
    };
    
  
  
  fetch('http://localhost:3000/users/'+this.state.id, requestOptions)
    
    .then(data =>{console.log("enregitre avec succes vrai:",data)
    console.log("data send",data)
      this.setState({user:this.state.user.filter(element=>element.id!=this.state.id)})
      this.setState({show:false})
     
   } )
  }

  handleDetail=(id)=>{
    localStorage.setItem('idUser',id);
    this.setState({ok: <Redirect to='/admin/detail-user'/>});
  }

  handleModifier=(id)=>{
    localStorage.setItem('idUser',id);
    this.setState({ok: <Redirect to='/admin/modifier-user'/>});
  }

  handleTrie=(e)=>{
    console.log("data send",e.target.value)
    var data= this.state.user.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
    this.setState({user:data})
   
    if(e.target.value==""){
      this.handleCharge()
    }
   }


  render() {
 
  return (
    <>
      <Header />
      {/* Page content */}            {this.state.ok}


      <Confirmer show={this.state.show} handleValider={this.handleSupprimer} toggle={this.toggled}/>

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
                <Input placeholder="Rechercher" onChange={this.handleTrie} type="text" />
        </InputGroup>
             
        </Col> 
         <Col md="4">
         <div style={{textAlign:"right"}} >
            <Button
                color="primary" 
                onClick={this.handleNewUser}
                size="sm"
                        >
                        <span><i style={{fontSize:"small"}} className="ni ni-fat-add mt-1" />Ajouter Utilisateurs</span>
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
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Liste des Utilisateurs</h3>
                  </div>
                
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prenom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
              {
                this.state.user.map((data)=>(
                  (data.length=!0)?
                  (
                  <tr>
                  <td >{data.firstname}</td>
                    <td>{data.lastname}</td>
                    <td>{data.email}</td>
                    <td>{data.role.nom}</td>
                    <td>
                    <i onClick={this.handleModifier.bind(this,data.id)} style={{fontSize:"medium",cursor:"pointer"}} className="fas fa-edit text-success mr-3" /><i onClick={this.handleDetail.bind(this,data.id)} style={{fontSize:"medium",cursor:"pointer"}}   className="fas fa-info-circle text-primary mr-3"/><i  onClick={this.supprimer.bind(this,data.id)} style={{fontSize:"medium",cursor:"pointer"}}  className="fas fa-trash-alt text-danger mr-3"/>
                    </td>
                  </tr>
                  ):null
                ))}
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

export default User;
