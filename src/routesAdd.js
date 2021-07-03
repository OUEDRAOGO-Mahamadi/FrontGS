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


import AjouterProduit from "views/boutique/AjouterProduit.js";
import ModifierProduit from "views/boutique/ModifierProduit.js";
import ModifierCategorie from "views/boutique/ModifierCategorie.js";
import ModifierStock from "views/magazin/ModifierStock.js";
import DetailProduit from "views/boutique/DetailProduit.js";
import DetailVente from "views/boutique/DetailVente.js";
import DetailDepot from "views/magazin/DetailProduit.js";
import AjouterCategorie from "views/boutique/AjouterCategorie.js";
import AjouterStock from "views/magazin/AjouterStock.js";
import AjouterUser from "views/users/AjouterUser.js";
import Profile from "views/users/Profile.js";
import DetailUser from "views/users/DetailUser.js";
import ModifierUser from "views/users/ModifierUser.js";
import Login from "views/examples/Login.js";



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
  },
  {
    path: "/detail-produit",
    name: "Detail Produit",

    component: DetailProduit,
    layout: "/admin",
  },
  {
    path: "/detail-depot",
    name: "Detail Produit",

    component: DetailDepot,
    layout: "/admin",
  },
  {
    path: "/detail-vente",
    name: "Detail vente",

    component: DetailVente,
    layout: "/admin",
  },
  {
    path: "/modifier-produit",
    name: "Detail vente",

    component: ModifierProduit,
    layout: "/admin",
  },
  {
    path: "/modifier-categorie",
    name: "Detail vente",

    component: ModifierCategorie,
    layout: "/admin",
  },
  {
    path: "/modifier-depot",
    name: "Detail vente",

    component: ModifierStock,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/detail-user",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: DetailUser,
    layout: "/admin",
  }
  ,
  {
    path: "/modifier-user",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: ModifierUser,
    layout: "/admin",
  }
];
export default routesAdd;
