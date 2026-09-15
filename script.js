// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const CART_KEY = "User Cart"; // define once, use everywhere - avoids typos

const productList = document.getElementById("product-list");
const cartList = document.querySelector("#cart-list");
const clearCartButton = document.querySelector("#clear-cart-btn");

let userCartDetails = [];

// Explicit loader, called once on init
function loadCartFromStorage() {
  try {
    const stored = sessionStorage.getItem(CART_KEY);
    userCartDetails = stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Failed to parse cart from sessionStorage:", err);
    userCartDetails = [];
  }
}

function saveCartToStorage() {
  sessionStorage.setItem(CART_KEY, JSON.stringify(userCartDetails));
}

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  userCartDetails.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove from Cart</button>`;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  userCartDetails.push({ id: product.id, name: product.name, price: product.price });
  saveCartToStorage();
  renderCart();
}

function removeFromCart(productId) {
  userCartDetails = userCartDetails.filter((cart) => cart.id !== productId);
  saveCartToStorage();
  renderCart();
}

function clearCart() {
  userCartDetails = [];
  sessionStorage.removeItem(CART_KEY);
  renderCart();
}

productList.addEventListener("click", (e) => {
  const prodId = e.target.dataset.id;
  if (!prodId) return;
  addToCart(parseInt(prodId));
});

cartList.addEventListener("click", (e) => {
  const cartId = e.target.dataset.id;
  if (!cartId) return;
  removeFromCart(parseInt(cartId));
});

clearCartButton.addEventListener("click", clearCart);

// Init sequence: load state first, then render everything from that state
loadCartFromStorage();
renderProducts();
renderCart();