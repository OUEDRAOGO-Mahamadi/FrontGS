
import {React, Component} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import $ from "jquery";
import  { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
      super(props)
      this.state = {
        ok:"",
        stock:[],
        user:[],
        id:0,show:false
      }

      this.handleConnect.bind(this)

    }
  
  componentDidMount() {
    $("#auth").css("display","none")
    fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       this.setState({user:data})
    
     }
     
    );
  }

  handleConnect=()=>{
    const user=this.state.user.find(data=>($("#email").val()==data.email) && ($("#password").val()==data.password_digest))
    if(user!=null){
        
      this.setState({ok: <Redirect to='/admin/produit'/>});
      localStorage.setItem('user', JSON.stringify({nom:user.firstname,prenom:user.lastname,role:user.role.nom}));
    
    }
    else{
      $("#auth").css("display","block")
      $("#email").val("")
      $("#password").val("")
    }
   
  }

  render() {
      return (
        <>
          {this.state.ok}
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-2">
              
                <div className="btn-wrapper text-center">
                  
                  <i style={{fontSize:"50px"}} className="ni ni-single-02" />
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        id="email"
                        autoComplete="new-email"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Mot de Passe"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </InputGroup>
                  </FormGroup>
                  <Row>
                    <Col md="12">
                    <div id="auth" className="alert alert-danger  mt-2" role="alert">
                      Mot de passe ou email incorrect!!!!
                    </div>
                    </Col>
                 </Row> 
                 <Row>
                 <Col md="8"> </Col>
                  <Col md="4"> 
                  <div className="text-right">
                    <Button onClick={this.handleConnect} className="my-4" color="primary" type="button">
                      Connecter
                    </Button>
                  </div>
                  </Col>
                
                  </Row>
                </Form>
              </CardBody>
            </Card>
            
          </Col>
        </>
      );
    };
  }
export default Login;
