
import Produit from "views/boutique/Produit.js";
import Categorie from "views/boutique/Categorie.js";

import AchatProduit from "views/boutique/AchatProduit.js";
import Vente from "views/boutique/Vente.js";

var routesGes = [
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
    path: "/categorie",
    name: "Categorie",
    icon: "ni ni-books text-blue",
    component: Categorie,
    layout: "/admin",
  },


];
export default routesGes;
