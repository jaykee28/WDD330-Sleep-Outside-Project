import { getLocalStorage } from './utils.mjs';

function updateCartCount() {
  const cartItems = getLocalStorage('so-cart') || [];
  const countElement = document.getElementById('cart-count');

  if (countElement) {
    countElement.textContent = cartItems.length;
  }
}

updateCartCount();