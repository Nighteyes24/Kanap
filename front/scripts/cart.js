// recuperation des données du Local Storage

import { getCart } from "./cartManager.js";

async function fetchCouch() {
  const res = await fetch("http://localhost:3000/api/products");
  const couchData = await res.json();

  return couchData;
}

async function main() {
  const couchData = await fetchCouch();

  const allCouch = Object.fromEntries(
    couchData.map((couch) => [couch._id, couch])
  );

  const cart = getCart().map((couch) => ({ ...allCouch[couch.id], ...couch }));

  // fonction principale
  cart.forEach((item) => displayItem(item));
  displayTotalQuantity(cart);
  displayTotalPrice(cart);
}

main();

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

function retrieveItemsFromCache() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || "";
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}

// affichage des données depuis le local storage
function displayItem(item) {
  const article = makeArticle(item);
  const imageDiv = makeImageDiv(item);
  article.appendChild(imageDiv);
  const cardItemContent = makeCartContent(item);
  article.appendChild(cardItemContent);
  displayArticle(article);
}

function displayTotalQuantity(cart) {
  const totalQuantity = document.querySelector("#totalQuantity");
  const total = cart.quantity((total, item) => total + item.quantity, 0);
  totalQuantity.textContent = total;
}

function displayTotalPrice(cart) {
  const totalPrice = document.querySelector("#totalPrice");
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  totalPrice.textContent = total;
}

function makeCartContent(item) {
  const cardItemContent = document.createElement("div");
  cardItemContent.classList.add("cart__item__content");

  const description = makeDescription(item);
  const settings = makeSettings(item);

  cardItemContent.appendChild(description);
  cardItemContent.appendChild(settings);
  return cardItemContent;
}

function makeSettings(item) {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  addQuantityToSettings(settings, item);
  addDeleteToSettings(settings, item);
  return settings;
}

function makeDescription(item) {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  h2.textContent = item.name;
  const p = document.createElement("p");
  p.textContent = item.color;
  const p2 = document.createElement("p");
  p2.textContent = item.price + " €";

  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(p2);
  return description;
}

function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}
function makeArticle(item) {
  const article = document.createElement("article");
  article.classList.add("card__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}
function makeImageDiv(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");

  const image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;
  div.appendChild(image);
  return div;
}

// ajouter ou supprimer des items

function addDeleteToSettings(settings, item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");
  div.addEventListener("click", () => deleteItem(item));

  const p = document.createElement("p");
  p.textContent = "Supprimer";
  div.appendChild(p);
  settings.appendChild(div);
}

function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div");
  quantity.classList.add("cart__item__content__settings__quantity");
  const p = document.createElement("p");
  p.textContent = "Qté : ";
  quantity.appendChild(p);
  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;
  input.addEventListener("input", () =>
    updatePriceAndQuantity(item.id, input.value, item)
  );

  quantity.appendChild(input);
  settings.appendChild(quantity);
}
