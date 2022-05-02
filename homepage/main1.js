

const productsEl = document.querySelector(".column");

function prodcutsDetails() {

  products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="column">
            <div class="prntcontainer">
            <div class="imgcontainer">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="content">
                        <h2>${product.name}</h2>
                        <h4 class="price">price :  <span><i class="fa-solid fa-euro-sign"></i>${product.price}</span> </h4>
                        <a class="add-cart cart1"><button type="submit">add to cart <i class="fas fa-plus"></i> </button></a>
                        </div>  
                        </div>
                        </div>
                        `;
  });
}

if(productsEl != null){
  prodcutsDetails();
}

let carts = document.querySelectorAll(".add-cart");

for (var i = 0; i < carts.length; i++) {
  (function(index){
    carts[i].onclick = function(){
      cartUnits(products[index]);
      total(products[index]);
    }

  })(i);
}


function cartUnits(product, qnSign = ""){
    //console.log(product, qnSign);
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
    }else if(qnSign == "minus" && product.inCart != 0){
        localStorage.setItem('cartUnits', productUnits - 1);
        document.querySelector('.cart span').textContent = productUnits - 1;
    }
    
    setItems(product);
}


function setItems(product){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if(cartItems != null){
    if(cartItems[product.tag] == undefined){
      cartItems ={
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart +=1 ;
  }else{
    product.inCart = 1;
    cartItems = {
        [product.tag]: product
    }
  }
  
  
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function total(product){
  //console.log("the product price is", product.price);//
  let cartTotal = localStorage.getItem("total");

  //console.log("my cart cost is", cartTotal);
  if (cartTotal != null){
    cartTotal = Number(cartTotal);
    localStorage.setItem("total", cartTotal + product.price);
  } else {

    localStorage.setItem("total", product.price);
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
      <img src="${item.imgSrc}">
      <span>${item.name}</span>
      </div>
      <div class="price"> Price: $${item.price}</div>
      <div class="quantity">Quantity:
      <i class="fa-solid fa-plus"></i>
      <span> ${item.inCart}</span><i class="fa-solid fa-minus"></i>
      </div>
      <div class="total">Total: $${item.inCart * item.price}</div>
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


// FUNCTION CHANGE QUANTITY//
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
      cartItems[presentProduct].inCart += 1;
      cartUnits(cartItems[presentProduct],"plus");
      localStorage.setItem("total", Number(cartItems[presentProduct].price) + Number(cartTotal));
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    }

    else if(action == "subtract"){
      presentQuantity = event.target.parentElement.querySelector("span").textContent;
      presentProduct = event.target.parentElement.parentElement.querySelector("span").textContent.toLocaleLowerCase().replace(/ /g,'').trim();
      if( cartItems[presentProduct].inCart > 1 ) {
        cartItems[presentProduct].inCart -= 1;
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
    localStorage.setItem('cartUnits', productUnits - cartItems[productName].inCart);
    localStorage.setItem('total', cartTotal - ( cartItems[productName].price * cartItems[productName].inCart));
    
    productUnits = localStorage.getItem('cartUnits');
    document.querySelector('.cart span').textContent = productUnits;

    delete cartItems[productName];
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    showCart();
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

loadCart();
showCart();