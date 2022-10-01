import { addToCart } from "./cartManager.js";

// Requête  vers l'api pour récupérer les données correspondant à l'id de la page/du produit
const getProductDataFromProductId = async (id) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  if (!res.ok) return console.error("impossible de récupérer le produit");
  const data = await res.json();

  console.table(data);

  return data;
};
//affichage du produit
async function main() {
  //on récupère l'ID dans la page produit
  const pageId = getId();
  console.log(pageId);
  displayProduct(await getProductDataFromProductId(pageId));
}

//intégration des infos ds le DOM
let displayProduct = (data) => {
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
  price.innerHTML = data.price;
  description.innerHTML = data.description;
  for (const couleur of data.colors) {
    colors.innerHTML += `<option value = "${couleur}">${couleur}</option>`;
  }
};
main();

//ajout des produits au panier via le local storage
const bouton = document.querySelector("#addToCart");
if (bouton != null) {
  bouton.addEventListener("click", () => {
    const colors = document.querySelector("#colors").value;
    const quantite = document.querySelector("#quantity").value;

    if (colors === "" || quantite < 1 || quantite > 100) {
      return alert(
        "Une erreur s'est produite, veuillez vérifier les informations"
      );
    }

    const id = getId();
    const product = {
      colors,
      quantite,
      id,
    };

    addToCart(product);

    //redirection vers le pannier
    window.Location.href = "../cart.html";
  });
}

function getId() {
  return new URL(location.href).searchParams.get("id");
}
