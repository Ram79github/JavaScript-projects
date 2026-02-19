document.addEventListener("DOMContentLoaded",()=>{
    const products =[
        {id:1, name: "product 1",price:13.99},
        {id: 2, name: "product 2",price:21.99},
        {id: 3, name: "product 3",price:53.99},
        {id: 4, name: "product 4",price:33.99}
    ];

    const cart=[];        ///----------- at the begnning cart is empty

    const productList=document.getElementById("product-list");
    const cartItems=document.getElementById("cart-items");
    const emptyCartMsg=document.getElementById("empty-cart");
    const cartTotalMsg=document.getElementById("cart-total");
    const totalPriceDisplay =document.getElementById("total-price");
    const checkOutBtn=document.getElementById("checkout-btn");
    const removeCartItemBtn=document.getElementById("remove-cartItem");


  //-- dynamically add product on productlist div ---//
    products.forEach(product => {
        const productDiv= document.createElement('div');
        productDiv.classList.add('product');
        // asscess this product obj from products which is mention at the top//
        productDiv.innerHTML=`<span>${product.name}-$${product.price.toFixed(2)}</span>          
        <button data-id="${product.id}">Add to Cart</button>`; 

        productList.appendChild(productDiv);
    
    });
   productList.addEventListener('click',(e)=>{
    // in this section i prevent the eventbobbling on whole div means when i click on btn,then only btn click not whole div click//
    if (e.target.tagName === "BUTTON") {
        const productId = parseInt(e.target.getAttribute('data-id')); // this is come into string  convert str tp int we parseit // 
        const product = products.find((p) => p.id === productId)
        addTOCart(product)
    }
   })
// add product to cart //
   function addTOCart(product){
    cart.push(product);
    renderCart();
   }
// here we render cartitem and add totalprice of shopping cart//
    function renderCart() {
    cartItems.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMsg.classList.add("hidden");
      cartTotalMsg.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        `;
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMsg.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }
   
   checkOutBtn.addEventListener('click',()=>{
    cart.length = 0;
    alert("checkout successfully");
    renderCart();
   })
   
})