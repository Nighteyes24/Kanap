import { getCart, setCart } from "./cartManager.js";

// d'abord on cherche à récupérer les data du local storage
let cart = getCart();
// Récupération des produits de l'API
async function getProductById(product) {
  return fetch("http://localhost:3000/api/products/" + product)
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      // Erreur serveur
      console.log("erreur");
    })
    .then(function (response) {
      return response;
    });
}
displayCart();

// gestion de l'affichage du panier, vide ou contenant des items
//si le local storage et donc le panier sont vides:

if (cart == null || cart.length == 0) {
  document.getElementById("cart__title").innerHTML += `Votre panier est vide`;
} else {
  console.log("voici votre sélection");
}

// DOM

/*affichage du contenu du panier
 * quand le local storage contients des items
 */
async function displayCart() {
  let cartArray = ``;
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let cart = 0; cart < getProductById.length; cart++) {
    const element = getProductById[cart];
  }

  const positionEmptyCart = document.getElementById("cart__items");

  for (let item of cart) {
    let product = { ...item, ...(await getProductById(item.id)) };
    let totalPriceItem = product.price * +product.quantite;
    console.log(totalPriceItem);
    cartArray += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${product.color}</p>
                        <p>Prix unitaire: ${product.price}€</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                          <p id="quantité">
                            Qté : <input data-id= ${product.id} data-color= ${product.color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantite}>
                          </p>
                          </div>
                          <p id="sousTotal">Prix total pour cet article: ${totalPriceItem}€</p> 
                      <div class="cart__item__content__settings__delete">
                        <p data-id= ${product.id} data-color= ${product.color} class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </div>
                </article>`;

    //VARIABLES POUR CHANGER LE TYPE EN NOMBRE

    let quantityNumber = +product.quantite;
    let priceNumber = product.price * +product.quantite;

    //PUSH DES NOMBRES DANS LES VARIABLES TABLEAUX

    totalQuantity += quantityNumber;
    totalPrice += priceNumber;
  }

  document.querySelector("#totalQuantity").innerHTML = totalQuantity;
  document.querySelector("#totalPrice").innerHTML = totalPrice;

  positionEmptyCart.innerHTML = cartArray;

  changeQuantity();
  deleteItem();
}

function dryItems(items) {
  return items.map(dryItem);
}
function dryItem([_id, color, quantity]) {
  return { _id, color, quantity };
}

// si on modifie la quantité d'un produit
function changeQuantity() {
  const quantityInput = document.querySelectorAll(".itemQuantity");
  quantityInput.forEach((quantityInput) => {
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      let items = getCart();

      items = items.map((item, index) => {
        if (item.id === dataId && item.color === dataColor) {
          item.quantity = inputValue;
        }
        return item;
      });

      // Mise à jour du localStorage
      setCart(items);
      // mise à jour de la page Panier
      location.reload();
    });
  });
}

//si ou quand on supprime un items:
function deleteItem() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const deleteId = event.target.getAttribute("data-id");
      const deleteColor = event.target.getAttribute("data-color");
      let cart = getCart();
      cart = cart.filter(
        (element) => !(element.id == deleteId && element.color == deleteColor)
      );
      console.log(cart);
      // Mise à jour du localStorage
      setCart(cart);

      alert("Vous avez supprimé un élément du panier.");
    });
  });
}
