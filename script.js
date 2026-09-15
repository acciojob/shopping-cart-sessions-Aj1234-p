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

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.querySelector("#cart-list");
let clearCartButton = document.querySelector("#clear-cart-btn")
// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

productList.addEventListener('click',(e)=>{
  let prodId = e.target.dataset.id;
  addToCart(parseInt(prodId));
})

let userCartDetails = JSON.parse(sessionStorage.getItem("User Cart")) || [];
// Render cart list
function renderCart() {
  console.log("Comes inside a render function ");
  if(JSON.parse(sessionStorage.getItem("User Cart"))!==null){
    let existUserCartDetails = JSON.parse(sessionStorage.getItem("User Cart")) || [];
    console.log("render list ",userCartDetails);
    existUserCartDetails.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Remove to Cart</button>`;
      cartList.appendChild(li);
    });
  }
}

// Add item to cart
function addToCart(productId) {
  console.log("add to cart inside function");
      products.forEach((product)=>{
        if(product.id===productId){
          console.log("Product ",product);
           const li = document.createElement("li");
           li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Remove to Cart</button>`;
           cartList.appendChild(li);
          let cartDetails = {id: product.id, name: product.name, price: product.price};
          userCartDetails.push(cartDetails);
          sessionStorage.setItem("User Cart",JSON.stringify(userCartDetails));
        }
      })
}


cartList.addEventListener('click',(e)=>{
  console.log("user cart list ",e.target.dataset.id);
  let cartId = e.target.dataset.id;
  removeFromCart(parseInt(cartId));
})

// Remove item from cart
function removeFromCart(productId) {
     userCartDetails = userCartDetails.filter(cart => cart.id!==productId);
     console.log("updated cart details ",userCartDetails);
     sessionStorage.setItem("User Cart",JSON.stringify(userCartDetails));
}

clearCartButton.addEventListener('click',(e)=>{
  console.log("clear cart button inside");
  clearCart();
})
// Clear cart
function clearCart() {
  cartList.innerHTML = "";
  sessionStorage.clear();
}

// Initial render
renderProducts();
renderCart();
