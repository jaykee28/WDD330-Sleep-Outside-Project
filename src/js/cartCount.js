import { getLocalStorage } from './utils.mjs';

function updateCartCount() {
  const cartItems = getLocalStorage('so-cart') || [];

  const cartCount =
    document.querySelector('.cart-count');

  if (cartCount) {
    cartCount.textContent = cartItems.length;
  }
}

document.addEventListener(
  'templateLoaded',
  updateCartCount
);