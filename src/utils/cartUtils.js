export function getCart() {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
}

export function addToCart(product) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated")); // <- necessário para atualização ao vivo
}

export function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

export function updateQuantity(productId, newQuantity) {
  const cart = getCart().map(item =>
    item.id === productId ? { ...item, quantity: newQuantity } : item
  );
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

export function clearCart() {
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cartUpdated"));
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}
