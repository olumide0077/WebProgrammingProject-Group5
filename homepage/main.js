
const productsEl = document.querySelector(".column");
function prodcutsDetails() {
  /* products.forEach((product) => {
    productsEl.innerHTML += 
    `<div class="column">
      <div class="prntcontainer">
        <div class="imgcontainer">
          <img src="${element.picture}" alt="${element.product_name}">
        </div>
        <div class="content">
          <h2>${element.product_name}</h2>
          <h4 class="price">price :  <span><i class="fa-solid fa-euro-sign"></i>${element.price}</span> </h4>
          <a class="add-cart cart1"><button type="submit">add to cart <i class="fas fa-plus"></i> </button></a>
        </div>  
      </div>
    </div>`;
  }); */

  fetchData();

}

async function fetchData() {
  const response = await fetch('http://rest-api-webproject.herokuapp.com/products').then(res =>res.json()).then(data =>{
    console.log(data);
    let datasave = "";
    data.results.forEach(element => {
      //console.log(element.picture);
      datasave += 
      `<div class="column">
        <div class="prntcontainer">
          <div class="imgcontainer">
            <img src="{element.picture}" alt="${element.product_name}">
          </div>
          <div class="content">
            <h2>${element.product_name}</h2>
            <h4 class="price">price :  <span><i class="fa-solid fa-euro-sign"></i>${element.price}</span> </h4>
            <a class="add-cart cart1"><button type="submit">add to cart <i class="fas fa-plus"></i> </button></a>
          </div>  
        </div>
      </div>`;
    });
    document.querySelector('.column').innerHTML = datasave;
    
    let carts = document.querySelectorAll(".add-cart");
    console.log(carts);
    for (var i = 0; i < carts.length; i++) {
      (function(index){
        carts[i].onclick = function(){
          cartUnits(data.results[index]);
          total(data.results[index]);
        }

      })(i);
    }

    });
  
    // waits until the request completes...
    //console.log(response);

    
}

if(productsEl != null){
  prodcutsDetails();
}




function cartUnits(product, qnSign = ""){
    console.log(product, qnSign);
    let productUnits = localStorage.getItem('cartUnits');

    productUnits = parseInt(productUnits);
    //console.log(productUnits);

    if (productUnits && qnSign === ""){
      localStorage.setItem('cartUnits', productUnits + 1);
      document.querySelector('.cart span').textContent = productUnits + 1;
    }
    else{
      localStorage.setItem('cartUnits', 1);
      document.querySelector('.cart span').textContent = 1;
    }

    if (qnSign == "plus"){
        localStorage.setItem('cartUnits', productUnits + 1);
        document.querySelector('.cart span').textContent = productUnits + 1;
    }else if(qnSign == "minus" && product.product_in_cart != 0){
        localStorage.setItem('cartUnits', productUnits - 1);
        document.querySelector('.cart span').textContent = productUnits - 1;
    }
    
    setItems(product, qnSign);
}


function setItems(product, qnSign){
  console.log(product.product_name);
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productName = "";
  productName = product.product_name.toLowerCase();
  if(cartItems != null){
    if(cartItems[product.product_name] == undefined){
      cartItems ={
        ...cartItems,
        [productName]: product
      }
    }

    cartItems[product.product_tag].product_in_cart +=1 ;
  }else{
    product.product_in_cart = 1;
    cartItems = {
        [product.product_tag]: product
    }
  }
  
  
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function total(product){
  //console.log("the product price is", product.price);//
  let cartTotal = localStorage.getItem("total");
  console.log(product.price);
  //console.log("my cart cost is", cartTotal);
  if (cartTotal != 0){
    cartTotal = Number(cartTotal);
    localStorage.setItem("total", cartTotal + Number(product.price));
  } else {

    localStorage.setItem("total", Number(product.price));
  }

}



function loadCart(){
  let productUnits = localStorage.getItem('cartUnits');
  if (productUnits){
      document.querySelector('.cart span').textContent = productUnits;
  }
}


function showCart() {
  let cartItems = localStorage.getItem("productsInCart");
      cartItems = JSON.parse(cartItems);

      //console.log(cartItems);
  

  let cartProducts = document.querySelector(".products");
  let cartTotal = localStorage.getItem("total");
      if(cartItems && cartProducts) {
    
        cartProducts.innerHTML = "";
    Object.values(cartItems).map(item =>{
      cartProducts.innerHTML += `
      <div class="products_wrap">
      <div class="products">
      <i class="fa-solid fa-xmark"></i>
      <img src="${item.picture}">
      <span>${item.product_name}</span>
      </div>
      <div class="price">$${item.price}</div>
      <div class="quantity">
      <i class="fa-solid fa-plus"></i>
      <span>${item.product_in_cart}</span><i class="fa-solid fa-minus"></i>
      </div>
      <div class="total">$${item.product_in_cart * item.price}</div>
      </div>
      `
   });

    cartProducts.innerHTML += `
    <div class="cartTotalContainer">
    <h4 class="cartTotalTitle">
        Cart Total &nbsp;
    </h4>
    <h4 class="cartTotal">
    $${cartTotal}
    </h4>
    `;

  }


}


/// FUNCTION CHANGE QUANTITY//
function changeQuantity(event, action){
  let presentQuantity = 0;
  let presentProduct = "";
  let cartItems = localStorage.getItem("productsInCart");
  let cartTotal = localStorage.getItem("total");
  cartItems = JSON.parse(cartItems);

  

    if(action == "add"){
      presentQuantity = event.target.parentElement.querySelector("span").textContent;
      console.log(cartItems);
      presentProduct = event.target.parentElement.parentElement.querySelector("span").textContent.toLocaleLowerCase().replace(/ /g,'').trim();
      cartItems[presentProduct].product_in_cart += 1;
      cartUnits(cartItems[presentProduct],"plus");
      localStorage.setItem("total", Number(cartItems[presentProduct].price) + Number(cartTotal));
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    }

    else if(action == "subtract"){
      presentQuantity = event.target.parentElement.querySelector("span").textContent;
      presentProduct = event.target.parentElement.parentElement.querySelector("span").textContent.toLocaleLowerCase().replace(/ /g,'').trim();
      if( cartItems[presentProduct].product_in_cart > 1 ) {
        cartItems[presentProduct].product_in_cart -= 1;
        cartUnits(cartItems[presentProduct], "minus");
        localStorage.setItem("total", Number(cartTotal) - Number(cartItems[presentProduct].price));
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      }
    }

    showCart();

}

let qnChange = document.querySelector(".products");
if(qnChange != null){
  qnChange.addEventListener("click", (event) => {
    if(event.target.tagName == "I" && event.target.className == "fa-solid fa-plus"){
      changeQuantity(event, "add");
    }

    else if(event.target.tagName == "I" && event.target.className == "fa-solid fa-minus"){
      changeQuantity(event, "subtract");
    }
  });
}




// FUNCTION REMOVE FROM CART //
function removeCart(event, action){
  
  let productUnits = localStorage.getItem('cartUnits');
  let cartTotal = localStorage.getItem("total");
  let cartItems = localStorage.getItem('productsInCart');
  let productName = "";
  cartItems = JSON.parse(cartItems);
  
  if(action == "del"){
    productName = event.target.parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
    console.log(cartItems);
    console.log(productName);
    //console.log(cartItems[productName]);
    localStorage.setItem('cartUnits', productUnits - cartItems[productName].product_in_cart);
    localStorage.setItem('total', cartTotal - ( cartItems[productName].price * cartItems[productName].product_in_cart));
    
    productUnits = localStorage.getItem('cartUnits');
    document.querySelector('.cart span').textContent = productUnits;

    delete cartItems[productName];
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    showCart();
    checkoutProcess();
  }
    
}

let closeIcon = document.querySelector(".products");
if(closeIcon != null){
  closeIcon.addEventListener("click", (event) => {
    if(event.target.tagName == "I" && event.target.className == "fa-solid fa-xmark"){
      removeCart(event, "del");
    }
});

}


// Checkout 
const btnCheckout =  document.querySelector(".btn-checkout");
if(btnCheckout != null){
  checkoutProcess();
  btnCheckout.addEventListener("click", () => {
    let cartItems = localStorage.getItem('cartUnits');
    let cartTotal = localStorage.getItem("total");
    let productUnits = localStorage.getItem('productsInCart');
    
    localStorage.clear();
    
    localStorage.setItem("db_cartItems", cartItems);
    localStorage.setItem("db_productUnits", productUnits);
    localStorage.setItem("db_cartTotal", cartTotal);

    document.querySelector(".cart-container").innerHTML = "";
    document.querySelector('.cart span').textContent = 0;
    alert('Thank You For Shopping With Us.');
  });
}

function checkoutProcess(){
  let productUnits = localStorage.getItem('cartUnits');
  if(productUnits != null){
    if(productUnits >= 1){
      btnCheckout.classList.add("checkout_btn_show");
    }else{
      btnCheckout.classList.remove("checkout_btn_show");
    }
  }
}



loadCart();
showCart();
