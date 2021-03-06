
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
import  { Redirect } from 'react-router-dom'

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
      code:null,
      produit:[],
      resultCategorie:"",
      nouveau:true,
      detail:false,
      color:"green",
      error: "",
      file:""
    }
    this.handleScan = this.handleScan.bind(this)
    this.handleChangeCategorie.bind(this);
    this.handleChangeCode.bind(this);
  }
  handleScan(data){
    this.setState({
      code: data
    })
    $("#code").val(data)
    document.getElementById("valide").disabled = false;
    
  }
  handleChangeCode=(event)=>{
    if(event){
      document.getElementById("valide").disabled = false;
    }else{
      document.getElementById("valide").disabled = true;
    }
  }
  handleError(err){
    console.error(err)
    $("#code").val(err)
  }
  componentDidMount() {

    $("input[data-preview]").change(() =>{
      var my_files = document.getElementById("image").files[0]
      var $input = $('<input type="file" id="image" data-preview=".preview"/>');
      var fileReader = new FileReader();
      fileReader.readAsDataURL(my_files);
      fileReader.onload = (fileEvent)=> {
        $($input.data('preview')).attr('src', fileEvent.target.result);
         this.setState({file:my_files})
  
      };
    });




    document.getElementById("valide").disabled = true;
    $("#echec").css("display","none")
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
    let pv=$("#pv").val()
    let  user=  JSON.parse(localStorage.getItem('user'))
    let qte=$("#quantite").val()
    if(pv==""){
      pv=0
    }

    if(qte==""){
      qte=0
    }
    
      var data= {
        "nom": $("#intitule").val(),
        "pv": pv,
        "limite": $("#limite").val(),
        "qte":qte,
        "famille_id":this.state.famille,
        "codebarre": $("#code").val(),
        "user_id":user.id,
        "image":this.state.file
       
    
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
      console.log("data send",data)
        try{
          if(data.status==403){
            $("#echec").css("display","block")
            this.setState({error:data.error})
          }
          else{
            this.setState({produit:data})
            this.setState({nouveau:false})
          }
        }catch(error){
    
        }
        
     },
     (error) => {
       if(error){
         console.log("error",error)
       }
     }
      )
    }
  
  handleSaveImage=()=>{
    var imageList=document.getElementById("image").files
    const formData = new FormData(); 
     console.log("image select",imageList)
     console.log("image state",this.state.file)
    // Update the formData object 
    formData.append( 
      "avatar", 
      this.state.file
     
    );
    const requestOptions = {
      method: 'POST',
      // headers: {'Access-Control-Allow-Origin':'*' },
      body: formData
    };
    if(imageList.length!=0){
      fetch("http://localhost/file/fichiers/fileupload.php", requestOptions)
      .then((response) => response.json()
      
      )
      .then(response =>{console.log("ok,",response)
      this.setState({file:response.name})
      this.handleSave()
  
     })

    }else{
      this.handleSave()
    }

   
  }  

  handleChangeCategorie = (e) => {
    var data=[]
    console.log("adate =====>",e)
    try{
      this.setState({famille:e.value,resultCategorie:e.label})
    }catch(ee){

    }
   

    // e.map((element,idx) =>{
    //   this.setState({thematiques_attributes:[...data,{"thematique_id":element.value}]})
    // })
  }

 handleAddNew=()=>{
  this.setState({nouveau:true})
  $("#echec").css("display","none")
    window.location.reload();
  }

  handleRetour=()=>{
    this.setState({ok: <Redirect to='/admin/produit'/>});
 }

render() {
  const animatedComponents = makeAnimated();
  return (
    <>
      <Header />
      {/* Page content */}  {this.state.ok}
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




     {
      (this.state.nouveau) ? 
      (
      <>
      <Row className="mt-2">
        
          <Col className="order-xl-1" md="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Ajouter Produit</h3>
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
                            placeholder="intitul?? du produit"
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
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            
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
                            Quantit??
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="quantite"
                            placeholder="quantit??"
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
                  <Col lg="6">
                  <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                   >
                           Limite Rupture stock
                          </label>
                  <Input
                            className="form-control-alternative"
                            id="limite"
                            placeholder=" Limite Rupture stock"
                            defaultValue="0"
                            type="number"
                           
                            
                          />
                    </Col>
                    <Col lg="6">
                    <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                   >
                           Code Produit
                          </label>
                  <Input
                            className="form-control-alternative"
                            id="code"
                            placeholder="code"
                            onChange={this.handleChangeCode}
                            type="text"
                            style={{color:this.state.color}}
                            
                          />
                    </Col>
                  </Row>
                  <Row className="mt-2" >
                    <Col lg="6">
                    <img style={{width:"200px",height:"200px"}} class="preview" src="http://localhost:8080/api/img/madi.jpeg"/>
                    <input type="file" id="image" name="file" data-preview=".preview"/>
                    
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
          <div id="echec" className="alert alert-danger  mt-2" role="alert">{this.state.error}</div>
          </Col>
          <Col md="2">
            <div style={{textAlign:"right"}} >
              <Button
                  color="secondary" 
                  onClick={this.handleRetour}
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
                onClick={this.handleSaveImage}
                id="valide"
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
       
      </div>  </>):(
         <div className="mt-8">
           <h3>Produit ajout?? dans la boutique</h3>
          <div id="echecSauv" className="alert alert-dark  mt-2" role="alert">
              <div>
                <span>Nom: </span> {this.state.produit.nom}
              </div>
              <div>
                <span>Categorie: </span> {this.state.produit.famille.nom}
              </div>
              <div>
                <span>Quantit??: </span>{this.state.produit.qte}
              </div>
              <div>
                <span>Prix: </span>{this.state.produit.pv}
              </div>
              <div>
                <span>Limite stock: </span>{this.state.produit.limite}
              </div>
           </div>
              <Row className="mt-2">
              <Col md="8">

              </Col>
              <Col md="2">
                
              </Col>
              <Col md="2">
              <div style={{textAlign:"right"}} >
                <Button
                    color="primary" 
                    onClick={this.handleAddNew}
                    size="md"
                            >
                            Retour
                </Button>
            </div> 

              </Col>
            </Row>
         </div>
        
      )
    }
      </Container>
    </>
  )};
};

export default AjouterProduit;
