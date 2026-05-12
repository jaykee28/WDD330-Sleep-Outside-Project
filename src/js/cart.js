import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

// Handle remove click
function handleRemoveItem(e) {
  const id = e.currentTarget.dataset.id;

  let cart = getLocalStorage('so-cart') || [];

  cart = cart.filter((item) => item.Id !== id);

  setLocalStorage('so-cart', cart);

  renderCartContents();
}

// Attach listeners
function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll('.remove-item');

  removeButtons.forEach((btn) => {
    btn.addEventListener('click', handleRemoveItem);
  });
}

// Template
function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <span class="remove-item" data-id="${item.Id}">❌</span>
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function calculateTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.FinalPrice, 0);
}

function updateCartCount(cartItems) {
  const countElement = document.getElementById('cart-count');

  if (countElement) {
    countElement.textContent = cartItems.length;
  }
}

// Render
function renderCartContents() {
  const cartItems =
    getLocalStorage('so-cart') || [];

  updateCartCount(cartItems);

  const cartFooter =
    document.querySelector('.cart-footer');

  if (cartItems.length === 0) {
    document.querySelector(
      '.product-list'
    ).innerHTML =
      '<p>Your cart is empty.</p>';

    document.getElementById(
      'cart-total-value'
    ).textContent = '0.00';

    cartFooter.classList.add('hide');

    return;
  }

  cartFooter.classList.remove('hide');

  const htmlItems = cartItems.map(
    (item) => cartItemTemplate(item)
  );

  document.querySelector(
    '.product-list'
  ).innerHTML = htmlItems.join('');

  attachRemoveListeners();

  const total =
    calculateTotal(cartItems);

  document.getElementById(
    'cart-total-value'
  ).textContent = total.toFixed(2);
}

// Init
renderCartContents();

