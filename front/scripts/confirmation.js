import { setCart } from "./cartManager.js";

// Création d'une variable pour y stocker l'id de la commande
const confirmId = new URL(window.location.href).searchParams.get("orderId");

function displayOrderId() {
  let spanId = document.getElementById("orderId");
  // console.log(orderId)
  spanId.innerHTML = confirmId;
}

displayOrderId();
setCart();
