// Récupération des champs de saisie du formulaire
let formPrenom = document.getElementById("firstName");
let formNom = document.getElementById("lastName");
let formAdresse = document.getElementById("address");
let formVille = document.getElementById("city");
let formEmail = document.getElementById("email");

// Création d'une variable "contact" regroupant les informations saisies
let contact = {
  firstName: formPrenom,
  lastName: formNom,
  address: formAdresse,
  city: formVille,
  email: formEmail,
};

let submitOrder = document.querySelector(".cart__order__form");

// Ecoute de la soumission du formulaire
submitOrder.addEventListener("submit", function (event) {
  event.preventDefault();

  // ReGex pour contrôler les saisies de l'utilisateur
  let myRegex = /^[a-zA-Z\é\è\ê-\s]{2,20}$/;
  let myRegexAdresse = /^[\w\'\é\è\ê-\s]{2,50}$/;
  let myRegexEmail = /^[\w!#$%&‘*+–/=?^_`.{|}~]+@[\w-]+[.]([\w-]){2,4}$/;

  // Fonction de vérification du prénom et affichage d'un message en cas d'erreur de saisie par rapport aux règles fixées
  function prenomVerif() {
    let testPrenom =
      formPrenom.value.length === 0 || myRegex.test(formPrenom.value);
    if (testPrenom == false) {
      document.getElementById("firstNameErrorMsg").innerHTML =
        "Veuillez entrer un prénom valide";
    } else {
      document.getElementById("firstNameErrorMsg").innerHTML = "";
      return (contact.firstName = formPrenom.value);
    }
  }
  // Fonction de vérification du nom et affichage d'un message en cas d'erreur de saisie par rapport aux règles fixées
  function nomVerif() {
    let testNom = formNom.value.length === 0 || myRegex.test(formNom.value);
    if (testNom == false) {
      document.getElementById("lastNameErrorMsg").innerHTML =
        "Veuillez entrer un nom valide";
    } else {
      document.getElementById("lastNameErrorMsg").innerHTML = "";
      return (contact.lastName = formNom.value);
    }
  }
  // Fonction de vérification de l'adresse et affichage d'un message en cas d'erreur de saisie par rapport aux règles fixées
  function adresseVerif() {
    let testAdresse =
      formAdresse.value.length === 0 || myRegexAdresse.test(formAdresse.value);
    if (testAdresse == false) {
      document.getElementById("addressErrorMsg").innerHTML =
        "Veuillez entrer une adresse valide";
    } else {
      document.getElementById("addressErrorMsg").innerHTML = "";
      return (contact.address = formAdresse.value);
    }
  }
  // Fonction de vérification de la ville et affichage d'un message en cas d'erreur de saisie par rapport aux règles fixées
  function villeVerif() {
    let testVille =
      formVille.value.length === 0 || myRegex.test(formVille.value);
    if (testVille == false) {
      document.getElementById("cityErrorMsg").innerHTML =
        "Veuillez entrer un nom de ville valide";
    } else {
      document.getElementById("cityErrorMsg").innerHTML = "";
      return (contact.city = formVille.value);
    }
  }
  // Fonction de vérification de l'email et affichage d'un message en cas d'erreur de saisie par rapport aux règles fixées
  function emailVerif() {
    let emailVille =
      formEmail.value.length === 0 || myRegexEmail.test(formEmail.value);
    if (emailVille == false) {
      document.getElementById("emailErrorMsg").innerHTML =
        "Veuillez entrer une adress email valide";
    } else {
      document.getElementById("emailErrorMsg").innerHTML = "";
      return (contact.email = formEmail.value);
    }
  }

  // vérification des champs du formulaire
  // mettre des variables à la place des fonctions
  prenomVerif();
  nomVerif();
  adresseVerif();
  villeVerif();
  emailVerif();
  console.log(contact);
  console.log(idProducts);

  // Vérification des éléments de contact et mise dans le local storage de contact et lancement de la procédure d'envoi au back end
  if (
    prenomVerif() &&
    nomVerif() &&
    adresseVerif() &&
    villeVerif() &&
    emailVerif()
  ) {
    localStorage.setItem("contact", JSON.stringify(contact));
    sendOrder();
    // return console.log("Tout est dans l'ordre, je vais procéder à l'enregistrement de la commande")
    return contact;
  } else {
    console.log(
      "Veuillez vérifier le formulaire, il contient une ou plusieurs erreurs de saisies"
    );
  }
});

// Fonction d'envoi des données au back end et vérification du tableau idProducts

function sendOrder() {
  if (idProducts.length == 0) {
    alert("Désolé, votre panier est vide !");
  } else {
    console.log("envoi des données");
    console.log(JSON.stringify({ contact, idProducts }));
    // Fetch de type POST des données pour recevoir l'orderId de l'api
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ contact: contact, products: idProducts }),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })

      .then((data) => {
        if (data.orderId != "") {
          // Si l'api a répondu, redirection vers la page de confirmation en lien avec l'orderId reçu
          location.href = `confirmation.html?orderId=${data.orderId}`;
        }
        localStorage.clear();
      })
      // affichage dans la console en cas d'erreur du fetch
      .catch(function (err) {
        console.log(err);
      });
  }
}
