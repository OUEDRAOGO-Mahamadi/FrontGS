
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

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
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
        ventes:[]
      }
      this.handleDateDebut.bind(this);
      this.handleTrieDate.bind(this);
    }
 
  toggle=()=>{
   this.setState({isOpen:!this.state.isOpen})
  }
  toggleCat=()=>{
    this.setState({isOpenCat:!this.state.isOpenCat})
   }
  componentDidMount() {
    fetch("http://localhost:3000/ventes")
    .then((response) => response.json())
    .then((data) => {
   
      //this.setState({ventes:data})
    
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
    
    var date=e.target.value.split("-")[2]+"/"+e.target.value.split("-")[1]+"/"+e.target.value.split("-")[0]
    console.log("date trie",date)
    // fetch("http://localhost:3000/ventes")
    // .then((response) => response.json())
    // .then((data) => {
    //   var panier=data.filter(x => x.date === date)
    //   this.setState({ventes:panier})
    
    //  }
     
    // );
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
                        <span><i style={{fontSize:"small"}} className="ni ni-fat-add mt-1" />Acheter Produits</span>
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
                            id="input-last-name"
                            defaultValue="50.000000 FCFA"
                            placeholder="50.000000 FCFA"
                            type="number"
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
                          <Input onChange={this.handleTrieDate} type="date" id="start" name="trip-start" value={format(new Date(),'yyyy-MM-dd')} min="2021-01-01" max="2030-12-31"/>
                           </InputGroup>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Heure</th>
                    <th scope="col">Client</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.ventes.map((data)=>(
                      (this.state.ventes.length!=0)?
                      (<tr>
                      <td >{data.date}</td>
                      <td >{data.heure}</td>
                      <td >Anonyme</td>
                      
                      <td>{data.montant}</td>
                    
                      <td>
                      <i style={{fontSize:"medium",cursor:"pointer"}}   className="fas fa-info-circle text-primary mr-3"/><i style={{fontSize:"medium",cursor:"pointer"}}  className="fas fa-trash-alt text-danger mr-3"/>
                      </td>
                    </tr>):null

                    ))
                   
                }  
                  <tr>
                    <td>05/06/2021</td>
                    <td>12:05</td>
                    <td>Anonyme</td>
                    <td>25000</td>
                    <td>
                   <i style={{fontSize:"medium",cursor:"pointer"}}   className="fas fa-info-circle text-primary mr-3"/><i style={{fontSize:"medium",cursor:"pointer"}}  className="fas fa-trash-alt text-danger mr-3"/>
                    </td>
                  </tr>
                  <tr>
                  <td >05/06/2021</td>
                  <td >15:54</td>
                  <td >Martial</td>
                  <td>200.000</td>
                    
                  <td>
                    <i style={{fontSize:"medium",cursor:"pointer"}}   className="fas fa-info-circle text-primary mr-3"/><i style={{fontSize:"medium",cursor:"pointer"}}  className="fas fa-trash-alt text-danger mr-3"/>
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

export default Vente;
