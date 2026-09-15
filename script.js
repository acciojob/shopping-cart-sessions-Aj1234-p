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

const productList = document.getElementById("product-list");
const cartList = document.querySelector("#cart-list");
const clearCartButton = document.querySelector("#clear-cart-btn");

let userCartDetails = JSON.parse(sessionStorage.getItem("User Cart")) || [];

function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

productList.addEventListener("click", (e) => {
  const prodId = e.target.dataset.id;
  if (!prodId) return; // clicked outside a button
  addToCart(parseInt(prodId));
});

// Single function responsible for drawing the cart from state
function renderCart() {
  cartList.innerHTML = ""; // clear first so we never duplicate
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
  sessionStorage.setItem("User Cart", JSON.stringify(userCartDetails));
  renderCart(); // re-render from updated state
}

cartList.addEventListener("click", (e) => {
  const cartId = e.target.dataset.id;
  if (!cartId) return;
  removeFromCart(parseInt(cartId));
});

function removeFromCart(productId) {
  userCartDetails = userCartDetails.filter((cart) => cart.id !== productId);
  sessionStorage.setItem("User Cart", JSON.stringify(userCartDetails));
  renderCart(); // re-render from updated state
}

clearCartButton.addEventListener("click", () => {
  clearCart();
});

function clearCart() {
  userCartDetails = [];
  sessionStorage.removeItem("User Cart");
  renderCart();
}

renderProducts();
renderCart();