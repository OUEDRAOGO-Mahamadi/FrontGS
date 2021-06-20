/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import AjouterProduit from "views/boutique/AjouterProduit.js";
import AjouterCategorie from "views/boutique/AjouterCategorie.js";
import AjouterStock from "views/magazin/AjouterStock.js";
import AjouterUser from "views/users/AjouterUser.js";
import Profile from "views/users/Profile.js";
import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

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
  var routesAdd = [
    {
      path: "/ajouter-produit",
      name: "Achat Produit",
      component: AjouterProduit,
      layout: "/admin",
    },
    {
      path: "/ajouter-categorie",
      name: "Produit",

      component: AjouterCategorie,
      layout: "/admin",
    },
    {
      path: "/ajouter-stock",
      name: "Produit",

      component: AjouterStock,
      layout: "/admin",
    },
     {
      path: "/ajouter-user",
      name: "Produit",

      component: AjouterUser,
      layout: "/admin",
    },
    {
      path: "/profile",
      name: "Produit",

      component: Profile,
      layout: "/admin",
    }
  ]
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

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Ajout Stock";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)} 
        />
        <Switch>
          {getRoutes(routes)}
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
          <Redirect from="*" to="/admin/produit" />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
