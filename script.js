const products = [
  {id:1,name:"Y80 Ultra Smart Watch",cat:"Gadgets",price:1250,icon:"⌚",desc:"Smart everyday wearable"},
  {id:2,name:"XT-02 Selfie Stick Tripod",cat:"Accessories",price:850,icon:"📱",desc:"Tripod + selfie stick"},
  {id:3,name:"A9 Mini WiFi Camera",cat:"Gadgets",price:1450,icon:"📷",desc:"Compact smart camera"},
  {id:4,name:"STN-28 Bluetooth Headphone",cat:"Gadgets",price:990,icon:"🎧",desc:"Wireless listening"},
  {id:5,name:"Astronaut Desk Lamp",cat:"Gifts",price:700,icon:"🚀",desc:"Cute room decoration"},
  {id:6,name:"Mini Portable Speaker",cat:"Gadgets",price:790,icon:"🔊",desc:"Small and convenient"},
  {id:7,name:"LED Phone Stand",cat:"Accessories",price:550,icon:"💡",desc:"Desk setup essential"},
  {id:8,name:"Cute Gift Box",cat:"Gifts",price:650,icon:"🎁",desc:"Simple gift idea"}
];

let cart = JSON.parse(localStorage.getItem("hjCart") || "[]");

const $ = id => document.getElementById(id);
function money(n){return n.toLocaleString("en-BD")}
function renderProducts(){
  const q=$("search").value.toLowerCase();
  const c=$("category").value;
  const list=products.filter(p=>(c==="all"||p.cat===c)&&(p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)));
  $("products").innerHTML=list.length?list.map(p=>`
    <article class="product">
      <div class="product-img">${p.icon}</div>
      <div class="product-body">
        <span class="tag">${p.cat}</span>
        <h3>${p.name}</h3><p>${p.desc}</p>
        <div class="price">৳${money(p.price)}</div>
        <button class="add" onclick="addToCart(${p.id})">+ Add to cart</button>
      </div>
    </article>`).join(""):`<p>No products found.</p>`;
}
function addToCart(id){
  const item=cart.find(x=>x.id===id);
  if(item)item.qty++; else cart.push({id,qty:1});
  saveCart(); openCart();
}
function saveCart(){localStorage.setItem("hjCart",JSON.stringify(cart));renderCart()}
function renderCart(){
  const items=cart.map(x=>({...products.find(p=>p.id===x.id),qty:x.qty}));
  $("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  $("cartItems").innerHTML=items.length?items.map(p=>`
    <div class="cart-row"><div><strong>${p.name}</strong><br><small>৳${money(p.price)} × ${p.qty}</small></div>
    <div class="qty"><button onclick="changeQty(${p.id},-1)">−</button> ${p.qty} <button onclick="changeQty(${p.id},1)">+</button></div></div>`).join(""):"<p>Your cart is empty.</p>";
  $("cartTotal").textContent=money(items.reduce((s,p)=>s+p.price*p.qty,0));
}
function changeQty(id,d){
  const item=cart.find(x=>x.id===id); if(!item)return;
  item.qty+=d;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();
}
function openCart(){$("cartPanel").classList.add("open");$("overlay").classList.add("show")}
function closeCart(){$("cartPanel").classList.remove("open");$("overlay").classList.remove("show")}
$("cartBtn").onclick=openCart;$("closeCart").onclick=closeCart;$("overlay").onclick=closeCart;
$("menuBtn").onclick=()=>$("nav").classList.toggle("open");
$("search").oninput=renderProducts;$("category").onchange=renderProducts;

$("checkoutBtn").onclick=()=>{
  if(!cart.length){alert("Please add a product first.");return}
  $("checkoutModal").classList.add("show");closeCart();
};
$("closeModal").onclick=()=>$("checkoutModal").classList.remove("show");

$("orderForm").onsubmit=e=>{
  e.preventDefault();
  const fd=new FormData(e.target);
  const items=cart.map(x=>({...products.find(p=>p.id===x.id),qty:x.qty}));
  const lines=items.map(p=>`• ${p.name} × ${p.qty} = ৳${p.price*p.qty}`).join("%0A");
  const total=items.reduce((s,p)=>s+p.price*p.qty,0);
  const msg=`HJ SHOP ORDER%0A%0AName: ${fd.get("name")}%0APhone: ${fd.get("phone")}%0ADistrict: ${fd.get("district")}%0AAddress: ${fd.get("address")}%0APayment: ${fd.get("payment")}%0A%0AProducts:%0A${lines}%0A%0ATotal: ৳${total}`;
  window.open(`https://wa.me/8801320939359?text=${msg}`,"_blank");
};
$("whatsappLink").href="https://wa.me/8801320939359";
$("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
