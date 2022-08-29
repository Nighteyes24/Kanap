class article {
  constructor(jsonProduct) {
    jsonArticle && Object.assign(this, jsonProduct);
  }
}

getAllProducts();

// * ici fonction pour récupérer les prods de l'API

function getAllProducts() {
  fetch("http://localhost:3000/api/products")
    .then((data) => data.json())
    .then((jsonListProducts) => [showProducts(jsonListProducts)]);
}

//* fonction affichage des produits

function showProducts(jsonListProducts) {
  for (let jsonProduct of jsonListProducts);
  let product = new Product(jsonProduct);

  document.getElementById(
    "items"
  ).innerHTML += `<a href="./product.html?id=${data._id}">
  <article>
      <img 
          src="${product.imageUrl}" 
          alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3><p class="productDescription">${product.description}</p>
  </article>
      </a>`;
}
