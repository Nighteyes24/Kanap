/**  enregistrement du cart ds le local storage
 * @param cart les donnés ds le local storage
 **/
export function setCart(cart) {
  localStorage.setItem("myCart", JSON.stringify(cart));
}

export function addToCart(product) {
  /**verifier que ds cart il y a 1 prod qui a id et color si oui on ajoute la quant au prod sinon on ajoute le produit au cart */
  const cart = getCart();
  const item = cart.find(
    (item) => product.color + product.id == item.color + item.id
  );

  if (item) item.quantity += product.quantity;
  else cart.push((item = product));

  if (item.quantity > 100) item.quantity = 100;
  setCart(cart);

  if (item) item.color += product.color;
  else cart.push((item = product));
}
/**
 * @return {Array}
 *  structure du panier même si vide*/
export function getCart() {
  return JSON.parse(localStorage.getItem("myCart")) || [];
}
window.localStorage.clear();
