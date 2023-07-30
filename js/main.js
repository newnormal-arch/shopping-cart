// OPEN CART BUTTON
const openCartBtn = document.querySelector(".open-cart-btn");
const openSideCart = document.querySelector(".side-cart");
const closeSideCart = document.querySelector(".close-btn");

openCartBtn.addEventListener('click', openCart);
closeSideCart.addEventListener('click', closeCart);
// OPEN SIDE CART FUNCTION
function openCart() {
    openSideCart.classList.add('open');
}

// CLOSE SIDE CART FUNCTION
function closeCart() {
    openSideCart.classList.remove('open');
}

// PRODUCTS LIST
const products = [
    {
        id: 0,
        name: "Orange Hoodie",
        price: 249.99,
        instock: 100,
        imgSrc: "./images/hoodie-img.png",
    },
    {
        id: 1,
        name: "Leather Jacket",
        price: 749.99,
        instock: 100,
        imgSrc: "./images/jacket-img.png",
    },
    {
        id: 2,
        name: "White T-shirt",
        price: 79.99,
        instock: 100,
        imgSrc: "./images/t-shirt-img.png",
    }
];

// SELECT ELEMENTS
const productsElements = document.querySelector(".shopping-products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

// RENDER PRODUCTS
function renderProdcuts() {
    products.forEach((product) => {
        productsElements.innerHTML += `
      <div class="shopping-items">
      <img class="product-img" src="${product.imgSrc}" alt="${product.name}">
      <h3 class="product-title">${product.name}</h3>
      <div class="price-counter">
          <h5 class="product-price">R <span class="price">${product.price}</span></h5>
          <button class="add-to-cart" onclick="addToCart(${product.id})">Add To Cart</button>
          <!-- <div class="product-quantity">
             <button id="decrease-quantity" class="decrease-btn"><i class="fas fa-minus"></i></button>
             <input id="quantity" type="number" min="0" class="quantity-value form-control text-center" value="0">
             <button id="increase-quantity" class="increase-btn"><i class="fas fa-plus"></i></button>
          </div> -->
      </div>
  </div>
          `;
    });
}
renderProdcuts();

// CREATE CART ARRAY
let cartArray = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {

    //check if product exists in cart
    if (cartArray.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id);
    } else {
        const item = products.find((product) => product.id === id);

        cartArray.push({
            ...item,
            numberOfUnits: 1,
        });
    }

    updateCart();
}

// UPDATE CART
function updateCart() {
    renderCartItems();
    renderSubtotal();

    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cartArray));
}

// CALCULATE AND RENDER SUBTOTAL
function renderSubtotal() {
    let totalPrice = 0,
        totalItems = 0;

    cartArray.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    subtotalEl.innerHTML = `Subtotal (${totalItems} items): R ${totalPrice.toFixed(2)}`;
    totalItemsInCartEl.innerHTML = totalItems;
}

// RENDER CART ITEMS
function renderCartItems() {
    // CLEAR CART ELEMENT
    cartItemsEl.innerHTML = "";
    cartArray.forEach((item) => {
        cartItemsEl.innerHTML += `
          <div class="cart-item">
                <div class="remove-item" onclick="removeItemFromCart(${item.id})">x</div>
              <div class="item-info" >
                  <img src="${item.imgSrc}" alt="${item.name}">
                  
              </div>
              <div class="unit-price">
                <h4>${item.name}</h4>
                  <small>R</small>${item.price}
              </div>
              <div class="units">
                  <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                  <div class="number">${item.numberOfUnits}</div>
                  <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
              </div>
          </div>
        `;
    });
}

// REMOVE ITEM FROM CART
function removeItemFromCart(id) {
    cartArray = cartArray.filter((item) => item.id !== id);

    updateCart();
}

// CHANGE NUMBER OF UNITS PER ITEM
function changeNumberOfUnits(action, id) {
    cartArray = cartArray.map((item) => {
        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === "plus" && numberOfUnits < item.instock) {
                numberOfUnits++;
            }
        }

        return {
            ...item,
            numberOfUnits,
        };
    });

    updateCart();
}


