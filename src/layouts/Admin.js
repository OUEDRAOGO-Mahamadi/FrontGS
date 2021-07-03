
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import routesGes from "routesGes.js";
import routesAdd from "routesAdd.js";


const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  let data={}
  data=  JSON.parse(localStorage.getItem('user'))
  console.log("ma data",data)
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);
  const add=()=>{
    return "admin/ajouter-produit"
  }
  
  const addCategorie=()=>{
    return "admin/ajouter-categorie"
  }
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getRoutesAdd = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const my_route=()=>{
  if(data!=null){
    if(data.role=="ADMIN"){
      return routes;
    }else{
      return routesGes;
    }
  }

  return []
   
  
  
  }

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Ma Boutique";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={my_route()}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/stock.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)} 
        />
        <Switch>
          {getRoutes(my_route())}
          {getRoutesAdd(routesAdd)}
          {/* <Route
            path={add}
            component={AjouterProduit}
            key="150"
          />
           <Route
            path={addCategorie}
            component={AjouterCategorie}
            key="152"
          /> */}
          {
            (data!=null)?
            (<Redirect from="*" to="/admin/produit" />):(
             <Redirect from="*" to="/auth/login" />
            )

          }
          
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
