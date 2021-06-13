
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

class User extends Component {
  constructor(props) {
      super(props)
      this.state = {
        ok:"",
      }
    }
  
  componentDidMount() {
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  }
  handleRetour=()=>{
    this.setState({ok: <Redirect to='/admin/ajouter-user'/>});
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
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Voir Tout
                    </Button>
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
                  <tr>
                  <td >Dieng</td>
                    <td>Alioune</td>
                    <td>alioune@gmail.com</td>
                    <td>Admin</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />
                    </td>
                  </tr>
                  <tr>
                  <td >Dieng</td>
                    <td>Alioune</td>
                    <td>alioune@gmail.com</td>
                    <td>Admin</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />
                    </td>
                  </tr>
                  <tr>
                  <td >Dieng</td>
                    <td>Alioune</td>
                    <td>alioune@gmail.com</td>
                    <td>Admin</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />
                    </td>
                  </tr>
                  <tr>
                  <td >Dieng</td>
                    <td>Alioune</td>
                    <td>alioune@gmail.com</td>
                    <td>Admin</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />
                    </td>
                  </tr>
                  <tr>
                  <td >Konan</td>
                    <td>Jean</td>
                    <td>konan@gmail.com</td>
                    <td>Gestionaire</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />
                    </td>
                  </tr>
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
