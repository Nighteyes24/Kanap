export function setCart(cart) {
  localStorage.setItem("myCart", JSON.stringify(cart));
}

export function addToCart(product) {
  var cart = getCart();

  cart.push(product);

  setCart(cart);
}

export function getCart() {
  return JSON.parse(localStorage.getItem("myCart")) || [];
}
