
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
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

class Categorie extends Component {
  constructor(props) {
      super(props)
      this.state = {
        ok:"",
        categorie:[]
      }
    }
  
  componentDidMount() {
    fetch("http://localhost:3000/familles")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
   
        this.setState({categorie:data})
      
    
     }
     
    );
  }

  handleModifier=(id)=>{
    localStorage.setItem('idCategorie',id);
    this.setState({ok: <Redirect to='/admin/modifier-categorie'/>});
  }
 
  
  handleRetour=()=>{
    this.setState({ok: <Redirect to='/admin/ajouter-categorie'/>});
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
                <Input placeholder="Rechercher" type="text" />
        </InputGroup>
             
        </Col> 
         <Col md="4">
         <div style={{textAlign:"right"}} >
            <Button
                color="primary" 
                onClick={this.handleRetour}
                size="sm"
                        >
                      <span><i style={{fontSize:"small",}} className="ni ni-fat-add mt-1" />Ajouter Categories</span> 
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
                    <h3 className="mb-0">Liste des Catégories</h3>
                  </div>
                
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Intitulé</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.categorie.map((data)=>(
                      <tr>
                      <td >{data.nom}</td>
                      <td>Vaiselle</td>
                      
                        <td>
                        <i onClick={this.handleModifier.bind(this,data.id)}  style={{fontSize:"medium",cursor:"pointer"}} className="fas fa-edit text-success mr-3" />
                        </td>
                      </tr>

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

export default Categorie;
