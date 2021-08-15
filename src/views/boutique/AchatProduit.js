
import {React, Component} from "react";
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

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import  { Redirect } from 'react-router-dom'
import Header from "components/Headers/Header.js";
import BarcodeReader from 'react-barcode-reader'
class AchatProduit extends Component {
  constructor(props) {
      super(props)
      this.state = {
        ok:"",
        produits:[],
        panier:[],
        archive:[],
        total:0,
        monnaie:0,
        produit_ids:[],
        coleur:"black",
        nouveau:true,
        produit_search:[],
        index:1000
      }
      this.handleScan = this.handleScan.bind(this)
      this.handleDelete.bind(this)
      this.handleMonnaie.bind(this)
      this.handleUpdateProduct.bind(this)
      this.handleQuantite.bind(this)
      this.handleSearch.bind(this)
    }
  
  componentDidMount() {

    
    $("#liste").css("display","none")
    $("#valideAchat").css("display","none")
    document.getElementById("valide").disabled = true;

    fetch("http://localhost:3000/produits")
    .then((response) => response.json())
    .then((data) => {
       console.log("okkk====>",data)
       this.setState({produits:data})
    
     }
     
    );
  }
  handleRetour=()=>{
    this.setState({ok: <Redirect to='/admin/produit'/>});
  }
  handleTotal=()=>{
    var totals=0;
    if(this.state.panier.length!=0){
      this.state.panier.map((val)=>{
        totals=totals+parseInt(val.total);
        this.setState({total:totals})
        $("#total").val(totals+" FCFA")
        this.setState({produit_ids:[...this.state.produit_ids,{produit_id:val.id}]})
        $("#qte"+val.id).val(val.quantite)
      })
  }

  else{
      $("#monnaie").val("0.00 FCFA")
      $("#total").val("0.00 FCFA")
      $("#encaisse").val("")
      this.errorMontantRetirer()
      document.getElementById("valide").disabled = true;
    }
  }

  handleMonnaie=(e)=>{
    var total=0
    if(e.target.value){
      total=parseInt(e.target.value)-parseInt(this.state.total);
    }
    
    if(total<0){
      this.errorMontantApplique()
      document.getElementById("valide").disabled = true;
      this.setState({couleur:"red"})
    }else{
      this.errorMontantRetirer()
      document.getElementById("valide").disabled = false;
      this.setState({couleur:"black"})
    }
    $("#monnaie").val(total+" FCFA")
    this.setState({monnaie:total})
  }

  handleQuantite=(id,index,e)=>{
    
    
    console.log("panier1:",id)
    let panier=[].concat(this.state.panier)
    .sort((a, b) => a.index > b.index ? 1 : -1)
    var totals=0;
    console.log("panier2:",e.target.value)
    if(e.target.value){
      var ancien=this.state.produits.find(x => x.id === index)
      panier[id].quantite=e.target.value
      panier[id].total =parseInt(e.target.value)*parseInt(ancien.pv)
      this.setState({panier:this.state.panier})
      console.log("panier====>:",this.state.panier)

      
      this.handleTotal()

    }else{
      this.state.panier[id].quantite=1
      this.setState({panier:this.state.panier})
      this.handleTotal()
    }
  }

  handleScan(data){
    var panier=this.state.produits.find(x => x.codebarre === data)
    $("#liste").css("display","block")
    document.getElementById("valide").disabled = false;
  
   try{
    console.log("ok====================>")
    var id=this.state.panier.findIndex(x=>x.id==panier.id)
    var total=this.state.produits.find(x => x.id === panier.id)
    if(this.state.panier.findIndex(x=>x.id==panier.id)==-1){
      this.setState({index:parseInt(this.state.index)-1})
      setTimeout(()=>{
      this.setState({
        panier: [...this.state.panier,{"index":this.state.index,"id":panier.id,"image":panier.image,"intitule":panier.nom,"pv":panier.pv,"total":panier.pv,"quantite":1,"stock":panier.qte}]
      })

      $("#qte"+panier.id).val(1)
      // this.state.panier.map((val,idx)=>{
      //   $("#qte"+val.id).val(10)
      // })
     this.handleTotal()
    },10)

    // setTimeout(()=>{
    //   this.state.panier.map((val,idx)=>{
    //     $("#qte"+val.id).val(10)
    //   })
    // },1)
    }else{
      console.log("table",this.state.panier[id])
      this.state.panier[id].quantite=parseInt(this.state.panier[id].quantite)+1
      this.state.panier[id].total =parseInt(this.state.panier[id].total)+parseInt(total.pv)
      
      this.setState({
        panier:this.state.panier
      })  
      $("#qte"+this.state.panier[id].id).val(this.state.panier[id].quantite)
      this.handleTotal()
     
    }
   }catch(error){
    console.log("error====================>")
  }
  }

  handleDelete=(id)=>{
    setTimeout(()=>{
      this.setState({produit_ids:[],panier:this.state.panier.filter(x=>x.id!=id)})
      this.handleTotal()
      this.state.panier.map((val,idx)=>{
        $("#qte"+val.id).val(val.quantite)
      })
    },1)
   

    if(this.state.panier.filter(x=>x.id!=id).length==0){
      $("#monnaie").val("0.00 FCFA")
      $("#total").val("0.00 FCFA")
      $("#encaisse").val("")
      $("#liste").css("display","none")
      this.errorMontantRetirer()
      document.getElementById("valide").disabled = true;
    }

  }
  
  handleError(err){
    console.error(err)
  }

  handleUpdateProduct=(id,data)=>{
   
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
      body: JSON.stringify(data)
  };
        fetch('http://localhost:3000/produits/'+id, requestOptions)
        .then(response => response.json()
      )
      .then(data =>{
        console.log("enregitre avec succes vrai:",data)

      } )
  }
  handleAchat=()=>{
    let  user=  JSON.parse(localStorage.getItem('user'))
    let ecaisse =$("#encaisse").val()
    if($("#encaisse").val()==""){
      ecaisse=0
    }
    var data= {
      // "nom": $("#intitule").val(),
      // "pv": $("#pv").val(),
      
      "montant":this.state.total,
      "montantencaisse":ecaisse,
      "monnaie":this.state.monnaie,
      "venteproduits_attributes": this.state.produit_ids,
      "user_id":user.id
     
  
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
      body: JSON.stringify(data)
  };
        fetch('http://localhost:3000/ventes/', requestOptions)
        .then(response => response.json()
      )
      .then(data =>{
        console.log("enregitre avec succes vrai:",data)
        this.state.panier.map((val)=>{
          this.handleUpdateProduct(val.id,{"qte":parseInt(val.stock)-parseInt(val.quantite)})
        })
        this.setState({nouveau:false})

      } )
  }

 errorMontantApplique=()=>{
      $("#monnaie").addClass("is-invalid")
      $("#valideAchat").css("display","block")
 }
 errorMontantRetirer=()=>{
      $("#monnaie").removeClass("is-invalid")
      $("#valideAchat").css("display","none")
 }

 handleAddNew=()=>{
      this.setState({nouveau:true,panier:[]})
      $("#liste").css("display","none")
      $("#valideAchat").css("display","none")
      window.location.reload();
}
handleSearch=(e)=>{
  var tab=[]
   var data= this.state.produits.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
    this.setState({produit_search:data})
   
    if(e.target.value==""){
      this.setState({produit_search:tab})
    }
}


handleChoisir(panier){
  var data=[]
  if(panier){

  $("#liste").css("display","block")
  
  document.getElementById("valide").disabled = false;

 this.setState({produit_search:data})
 try{
  console.log("ok====================>")
  var id=this.state.panier.findIndex(x=>x.id==panier.id)
  var total=this.state.produits.find(x => x.id === panier.id)
  if(this.state.panier.findIndex(x=>x.id==panier.id)==-1){
    this.setState({index:parseInt(this.state.index)-1})
    setTimeout(()=>{
        
      this.setState({
        panier: [...this.state.panier,{"index":this.state.index, "id":panier.id,"image":panier.image,"intitule":panier.nom,"pv":panier.pv,"total":panier.pv,"quantite":1,"stock":panier.qte}]
      })
      
      $("#qte"+panier.id).val(1)
      this.handleTotal(); 
    
    
    
    }
    
    
    
    , 1);
  
    
  }else{
    console.log("table",this.state.panier[id])
    this.state.panier[id].quantite=parseInt(this.state.panier[id].quantite)+1
    this.state.panier[id].total =parseInt(this.state.panier[id].total)+parseInt(total.pv)
    
    this.setState({
      panier:this.state.panier
    })  
    $("#qte"+this.state.panier[id].id).val(this.state.panier[id].quantite)
    this.handleTotal()
   
  }
 }catch(error){
  console.log("error====================>")
}
}
}

render() {

  return (
    <>
      <Header />
      {/* Page content */}   {this.state.ok}
      <Container className="mt--9" fluid>
      <Row className="mt-0">
      <Col className="mb-5 mb-xl-0" md="12">
         <Card className="shadow"> 
         <CardHeader className="border-0">
         <Row >
        
         <Col md="3">
         <div style={{textAlign:"left"}} >
            <Button
                color="primary" 
                onClick={this.handleRetour}
                size="sm"
                        >
                        Rétour Produit
            </Button>
         </div>    
         </Col> 
         <Col md="9">
         <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input onChange={this.handleSearch} placeholder="Rechercher" type="text" />
        </InputGroup>
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
              <h3 className="mb-0">Faire Une Vente</h3>
              <Row className="align-items-center">
                  <Col xs="12">
                  <Table className="align-items-center table-flush" responsive>
                {
                (this.state.produit_search.length!=0)?
                (<thead className="thead-light">
                  <tr>
                    
                    <th scope="col">Nom</th>
                    <th scope="col">Categorie</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Quantité Restante</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>):null
                 }
                <tbody>
                 {
                          this.state.produit_search.map((element,idx) =>(
                            (this.state.produit_search.length!=0)?
                            (<tr>
                            <td >{element.nom}</td>
                              <td>{element.famille.nom}</td>
                              <td>{element.pv} FCFA</td>
                              <td>{element.qte}</td>
                              <td>
                              <Button
                                color="primary" 
                                onClick={() => this.handleChoisir(element)}
                                
                                size="sm"
                              >
                                Choisir
                             </Button>
                              </td>
                            </tr>):null
                           
                          ))
                 }
                 
                </tbody>
              </Table>
                  </Col>
                 
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    liste des produits achetés
                  </h6>
                  <div id="liste" className="pl-lg-4">
                  {
                  [].concat(this.state.panier)
                  .sort((a, b) => a.index > b.index ? 1 : -1).map((element,idx) =>(
                    
                <div >  
                   <Row>

                     <Col md="5">
                     <Row> 
                  
                  <Col md="9">
                  <label 
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            nom :
                    </label> <span>{element.intitule}</span>
                  </Col>
                 
                  
                </Row>
                <Row>
                <Col md="9">

                  <Row>
                   <Col md="1">
                      <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                quantité:
                      </label>
                      </Col>
                      <Col md="5" style={{marginLeft:"40px"}}>
                          <Input defaultValue={element.quantite} min="1" max="10000" type="number" onChange={this.handleQuantite.bind(this,idx,element.id)}  size="sm" id={"qte"+element.id}/>
                    </Col>
                 </Row>
                 </Col>
                </Row>
                <Row>
                <Col md="9">
                 <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Prix Unitaire :
                 </label> <span>{element.pv}</span>
                 </Col>
                </Row>
                <Row>
                <Col md="9">
                 <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Total :
                 </label> <span>{element.total}</span>
               </Col>
                </Row>
                     </Col>
                     <Col md="4">
                     
                        <img  className="card-img-top" src={"http://localhost/file/fichiers/data/"+element.image} alt="Image"/>
                     
                     </Col>
                     <Col md="3">

                     <i onClick={this.handleDelete.bind(this,element.id)} style={{fontSize:"xx-large", color:"red",cursor:"pointer"}} className="ni ni-fat-remove" />
                     </Col>
                   
                   </Row>
                  
                 
                          
                  <hr/>
                </div>
                
                ))}
                 
                  <Row>
                  <Col md="6">
                    <h3>Totaux:</h3>   <Input
                            className="form-control-alternative"
                            readOnly
                            id="total"
                            defaultValue="0.0000 FCFA"
                            type="text"
                            style={{color:"black"}}
                          />
                   </Col>
                  </Row>
                  <hr></hr>
                  <Row>
                    <Col md="6">
                        <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Montant Encaissé :
                      </label>
                      <Input
                            className="form-control-alternative"
                            id="encaisse"
                            onChange={this.handleMonnaie}
                            type="number"
                            style={{color:"black"}}
                          />
                    </Col>
                    <Col md="6">
                        <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Monnaie :
                      </label>
                      <Input
                            className="form-control-alternative is-invalid"
                            readOnly
                            id="monnaie"
                            defaultValue="0.0000 FCFA"
                            type="text"
                            style={{color:this.state.couleur}}
                          />
                           <div id="valideAchat" class="invalid-feedback">
                            Le montant encaissé est insufisantt.
                           </div>
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
                onClick={this.handleAchat}
                id="valide"
                size="md"
                        >
                        Valider
            </Button>
         </div> 

          </Col>
        </Row>
        
      </>):(
         <div className="mt-8">
           <h3>Vente effectuée avec succèss</h3>
          <div id="echecSauv" className="alert alert-dark  mt-2" role="alert">
          {
          this.state.panier.map((element,idx) =>(
             <>
              <div>
                <span>Nom: </span> {element.intitule}
              </div>
              
              <div>
                <span>Quantité: </span>{element.quantite}
              </div>
              <div>
                <span>Prix: </span>{element.pv}
              </div>
              <hr/>
              </>
              
              ))}
              <div>
                <span>Total: </span>{this.state.total}
              </div>
              <div>
                <span>Encaisse: </span>{$("#encaisse").val()}
              </div>
              <div>
                <span>Monnaie: </span>{this.state.monnaie}
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
                            OK
                </Button>
            </div> 

              </Col>
            </Row>
       
         </div>
        
      )
    }
      </Container>
      <div>
        <BarcodeReader
          onError={this.handleError}
          onScan={this.handleScan}
          />
       
      </div>
    </>
  );
}
};

export default AchatProduit;
