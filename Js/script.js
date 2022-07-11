const productEl=document.querySelector(".left-side");
const down=document.querySelector(".more-details");
const cartEl=document.querySelector(".cart-items");
const totalEl=document.querySelector(".subtotal");
const totalElCart=document.querySelector(".total-items-in-cart");
const descri=document.querySelector(".unit-price");
down.addEventListener('click',()=>{
    productEl.scrollIntoView({behavior:"smooth"})
})

function love(element,color){
    element.style.color=color;
   }


const products=[
    {
        id:0,
        price:13.68,
        instock:100,
        imgSrc:"res/shirt1.webp",
    },

    {
        id:1,
        price:20.99,
        instock:10,
        imgSrc:"res/shirt2.webp",
    },
    {
        id:2,
        price:30.73,
        instock:10,
        imgSrc:"res/shirt3.webp",
    },
    {
        id:3,
        price:15.22,
        instock:10,
        imgSrc:"res/shirt4.webp",
    },
    {
        id:4,
        price:20.13,
        instock:10,
        imgSrc:"./res/shirt5.webp",
    },
    {
        id:5,
        price: 36.8,
        instock:5,
        imgSrc:"res/shirt6.webp",
    }
];
function putProduct(){
 products.forEach((item)=>{
    productEl.innerHTML+=`<div class="product">
    <img src=${item.imgSrc} alt="" srcset="">
        
    <br>
    <div  class="desc">
      <p><small>$</small>${item.price}</p>
      <div class="add-to-wishlist"  >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"  onclick="love(this,'red')" ondblclick="love(this,'black')">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
          </svg>
        </div>
      <div class="add-to-cart" >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16" onclick="addToCart(${item.id})">
          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
        </svg>
      </div>
      </div>
    </div>`;
 });
}
putProduct();
//cart array 
let cart=JSON.parse(localStorage.getItem("CART"))||[];
updateCart();

function addToCart(id){
  if(cart.some((item)=>item.id===id)){
    updateNbUnits('plus',id);
  }
  else{
    const item=products.find((product)=>product.id===id);
    cart.push({...item,nbUnits:1});
  }
  updateCart();
   
  }


function updateCart(){
  addItem();
  putSubtotal();
 localStorage.setItem("CART", JSON.stringify(cart));
}

function addItem(){
  cartEl.innerHTML="";
cart.forEach((item)=>{
cartEl.innerHTML+=`  <div class="cart-item">
<div class="item-info" onclick="remove(${item.id})">
<img src="${item.imgSrc}" alt="">
</div>



<div class="unit-price">
<p>${item.price}</p>
</div>



<div class="units">
  <div class="btn minus" onclick="updateNbUnits('minus',${item.id})">-</div>
  <div class="number">${item.nbUnits}</div>
  <div class="btn plus" onclick="updateNbUnits('plus',${item.id})">+</div>           
</div>
</div>
`
});
}
function updateNbUnits(action,id){
  cart=cart.map((item)=>{
    let nbUnits=item.nbUnits;
    let price=item.price;
    if(item.id===id){
      if(action==='minus'){
        if(nbUnits>1){
          nbUnits--;
        }
     
      }
      else if(action==='plus'){
       if(nbUnits<item.instock) {nbUnits++;
       
      }
    
      else{
      cart=cart.map((item)=>{
        
        if(item.id===id){
        price="empty stock";
        }
      })
      }
    }}
      return ({...item,nbUnits,price,});
    })

    updateCart();
    }


    function putSubtotal(){
      totalElCart.innerHTML="";
      var total=0;
      var totalp=0;
      cart.forEach((item)=>{
        if(item.price==="empty stock"){
        totalp=0;
        }
        else{
          totalp+=item.price*item.nbUnits;
        }
        total+=item.nbUnits;
      })
      
      totalElCart.innerHTML+=total;
      totalEl.innerHTML=`Total (${total}product): $${totalp.toFixed(2)}`;
    }



    function remove(id){
    cart=cart.filter((item)=>item.id!==id);
    updateCart();
    }





