// SELECT ELEMENTS
const productsElement = document.querySelector(".products");
const cartItemsElement = document.querySelector(".cart-items");
const totalElement = document.querySelector(".total");
const totalItemsInCartElement = document.querySelector(".total-items-in-cart");

// Product-Details
function prodcutsDetails() {
  products.forEach((product) => {
    productsElement.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <h3><small>Instock: </small>${product.instock}</h3>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/cart-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
  });
}
prodcutsDetails();

// Cart-Details
function cartDetails() {
  cartItemsElement.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsElement.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
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

// ADD TO CART
function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}
// update cart
function updateCart() {
  cartDetails();
  total();

// save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}
// hold card from local storage
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// calculate Total
function total() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  totalElement.innerHTML = `Total (${totalItems} items): $${totalPrice.toFixed(2)}`;
  totalItemsInCartElement.innerHTML = totalItems;
}


// remove item from cart
function removeCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number of units
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
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
