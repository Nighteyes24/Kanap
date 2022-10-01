//* fonction pour récupérer les data de l'API
async function fetchCouch() {
  const res = await fetch("http://localhost:3000/api/products");
  const couchData = await res.json();

  console.log(couchData);

  return couchData;
}

//* fonction pour afficher les data

async function couchDisplay() {
  const couchData = await fetchCouch();

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
}

couchDisplay();
