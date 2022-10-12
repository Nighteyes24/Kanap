/**  enregistrement du cart ds le local storage
 * @param cart les donnés ds le local storage
 **/
export function setCart(cart) {
  localStorage.setItem("myCart", JSON.stringify(cart));
}

export function addToCart(product) {
  /**verifier que ds cart il y a 1 prod qui a id et color si oui on ajoute la quant au prod sinon on ajoute le produit au cart */
  var cart = getCart();
  if (typeof product == "undefined") {
    cart.push(product);
  } else typeof product <= 1;
  {
    Array.some(cart);
  }
}

setCart(cart);

export function getCart() {
  return JSON.parse(localStorage.getItem("myCart")) || [];
}
window.localStorage.clear();
