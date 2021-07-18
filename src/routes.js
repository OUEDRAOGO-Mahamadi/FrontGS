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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Produit from "views/boutique/Produit.js";
import User from "views/users/User.js";
import Categorie from "views/boutique/Categorie.js";
import ProduitMagazin from "views/magazin/Produit.js";
import AjouterProduit from "views/boutique/AjouterProduit.js";
import AchatProduit from "views/boutique/AchatProduit.js";
import AchatProduitManuel from "views/boutique/AchatProduitManuel.js";
import Vente from "views/boutique/Vente.js";
import ApprovisionerStock from "views/magazin/ApprovisionnerStock.js";
import ApprovisionerBoutique from "views/boutique/ApprovisionnerStock.js";
var routes = [
  {
    path: "/achat-produit",
    name: "Vente Par Scan",
    icon: "ni ni-cart text-blue",
    component: AchatProduit,
    layout: "/admin",
  },
  {
    path: "/achat-produit-manuel",
    name: "Vente Manuelle",
    icon: "ni ni-cart text-blue",
    component: AchatProduitManuel,
    layout: "/admin",
  },
  {
    path: "/vente",
    name: "Mes Ventes",
    icon: "ni ni-money-coins text-blue",
    component: Vente,
    layout: "/admin",
  },
  {
    path: "/produit",
    name: "Produit",
    icon: "ni ni-tag text-blue",
    component: Produit,
    layout: "/admin",
  },
  {
    path: "/magazin",
    name: "Dépot",
    icon: "ni ni-shop text-blue",
    component: ProduitMagazin,
    layout: "/admin",
  },
  {
    path: "/approvision-boutique",
    name: "Ravitailler Boutique",
    icon: "ni ni-shop text-blue",
    component: ApprovisionerBoutique,
    layout: "/admin",
  },
  {
    path: "/approvision",
    name: "Approvisionnement",
    icon: "ni ni-shop text-blue",
    component: ApprovisionerStock,
    layout: "/admin",
  },
  {
    path: "/categorie",
    name: "Categorie",
    icon: "ni ni-books text-blue",
    component: Categorie,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Utilisateur",
    icon: "ni ni-circle-08 text-blue",
    component: User,
    layout: "/admin",
  },
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Index,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },
];
export default routes;
