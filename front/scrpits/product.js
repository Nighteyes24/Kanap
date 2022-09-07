//on récupère l'ID dans la page produit
const pageId = new URL(location.href).searchParams.get("id");
console.log(pageId);

// Requête  vers l'api pour récupérer les données correspondant à l'id de la page/du produit
fetch(`http://localhost:3000/api/products/${pageId}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })

  //affichage du produit
  .then(function (data) {
    displayProduct(data);
  });

//intégration des infos ds le DOM
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
