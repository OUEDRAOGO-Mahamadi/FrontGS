
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Login from "views/examples/Login.js";
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
    name: "Vente Produit",
    icon: "ni ni-cart text-blue",
    component: AchatProduit,
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

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
 
];
export default routes;
