// Création d'une variable pour y stocker l'id du produit
const pageId = new URL(location.href).searchParams.get("id");
console.log(pageId);

// Création d'une variable correspondant à la sélection de l'id "color-select" pour gérer les options de couleur
const selectColor = document.querySelector('select[name="color-select"]');
// Création d'une variable correspondant à la sélection de l'id "itemQuantity" pour gérer le choix de la quantité d'articles désirée
const selectQuantity = document.querySelector('input[name="itemQuantity"]');

// Requête de type GET vers l'api pour récupérer les données correspondant à l'id de la page/du produit
fetch(`http://localhost:3000/api/products/${pageId}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function (data) {
    displayProduct(data);
  });

// Lecture des données de la promesse et injection de code html dans le DOM pour afficher les informations du produit
let displayProduct = (data) => {
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
  price.innerHTML = data.price;
  description.innerHTML = data.description;
  for (couleur of data.colors) {
    colors.innerHTML += `<option value = "${couleur}">${couleur}</option>`;
  }
};
