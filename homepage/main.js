      fetch('http://rest-api-webproject.herokuapp.com/products').then(res =>res.json()).then(data =>{
        console.log(data);
        let datasave = " ";
        data.results.forEach(element => {
          console.log(element.picture);
             datasave += 
             `<a href="product.html?getid=${element.product_name}">
             <div class="prntcontainer">
    <div class="imgcontainer">
      <img src="${element.picture}"> 
    </div>
    <div class="content">
    <h4>${element.product_name}</h4>
    <h4 class="price">price :  <span><i class="fa-solid fa-euro-sign"></i>${element.price}</span> </h4>
    </div>  
   </div>
  </a> `
        });
        document.querySelector('.column').innerHTML = datasave;

    })



var menuitem = document.querySelectorAll('.menuitem');
var active = document.querySelector('.active');
var cart = document.querySelectorAll('.cart');
var nav = document.querySelector('.nav');
var menucontainer = document.querySelector('.menucontainer');

var count = "true";
  function display() {
    if (count == "true") {
     menucontainer.style.display = "block";
    active.style.padding ="10px";
  for (let index = 0; index < menuitem.length; index++) {
    menuitem[index].style.padding = "10px";
  }
   for (let index = 0; index < cart.length; index++) {
    cart[index].style.padding = "10px";
     
   } 
   menucontainer.style.transition= "all 0.5s ease";
   count = "false";
    }else{
      menucontainer.style.display = "none";
      
      count = "true";
    }
  }


  function cartNumber() {
    let count = 0;
    let cartItem = JSON.parse(localStorage.getItem('productadded'))
   cartItem.forEach(element => {
       count = element.quantity +=count;
   });
   document.querySelector('.cartnumber').innerText = count;
}
cartNumber();
