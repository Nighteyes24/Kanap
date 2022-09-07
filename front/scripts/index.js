let couchData = [];

//* fonction pour récupérer les data de l'API
const fetchCouch = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((Promise) => {
      couchData = Promise;
      console.log(couchData);
    });
};

//* fonction pour afficher les data

const couchDisplay = async () => {
  await fetchCouch();

  document.getElementById("items").innerHTML = couchData
    .map(
      (couch) => `
  <a href="./product.html?id=${couch._id}">
            <article>
                <img 
                    src="${couch.imageUrl}" 
                    alt="${couch.altTxt}">
                <h3 class="productName">${couch.name}</h3><p class="productDescription">${couch.description}</p>
            </article>
                </a>
  `
    )
    .join(" ");
};

couchDisplay();
