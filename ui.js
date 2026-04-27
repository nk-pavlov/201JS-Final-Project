

//პროდუქტების ქარდები(დეშბორდის)
export function renderProducts(products, gridId) {
  document.getElementById(gridId).innerHTML = products.map(product => `
    <div class="product-card">
      <div class="product-img-wrap">
        <img class="product-img" src="${product.image}" alt="${product.title}" />
      </div>
      <div class="product-body">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
      <div class="product-footer">
      <button class="btn btn-sm btn-danger" data-action="delete" data-id="${product.id}" >X</button>
      </div>
    </div>
  `).join('');
}


//პროდუქტების ქარდები (მთავარი+შოპი)

export function renderProductsUser(products, gridId) {
  document.getElementById(gridId).innerHTML = products.map(product => `
    <div class="product-card">
      <div class="product-img-wrap">
        <img class="product-img" src="${product.image}" alt="${product.title}" />
      </div>
      <div class="product-body">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
      <div class="product-footer">
  <button class="btn btn-sm btn-outline" data-action="add-to-cart" data-id="${product.id}">Add to cart</button>
</div>
    </div>
  `).join('');
}




//სტატისტიკა
export function updateStats(products) {
const total = products.length
const cats = new Set(products.map(p => p.category)).size
const avg = (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)

document.getElementById("home-stat-total").textContent = total
document.getElementById("home-stat-cats").textContent = cats
document.getElementById("home-stat-avg").textContent = '$' + avg
}


//კატეგორიების ჩასმა
export function  insertCategories(products, selectId) {
const categories = new Set(products.map(p =>  p.category))

categories.forEach(category => {
const option = document.createElement('option')
option.value = category
option.textContent = category
document.getElementById(selectId ).appendChild(option)
})
}




//კალათის ამბები

export function renderCart(cart) {
  document.getElementById('cart-items-list').innerHTML = cart.map(product  => `
    
    <li class="cart-item">
      <img class="cart-item-img"  src="${product.image}" alt="${product.title}" />
      <div class="cart-item-info">
        <span class="cart-item-title">${product.title}</span>
        <span class="cart-item-price">$${product.price.toFixed(2)}</span>
      </div>
      <button class="btn btn-sm btn-danger" data-action="remove-from-cart" data-id="${product.id}">✕</button>
    </li>
  `).join('')

const total = cart.reduce((sum, p) => sum + p.price, 0).toFixed(2)
document.getElementById( 'cart-total' ).textContent = '$' +  total
}

    


export function cartGenerator(gridId, products, cart) {

document.getElementById(gridId).addEventListener('click' ,  (event) =>  {
if  (event.target.dataset.action === 'add-to-cart')  {
const id = event.target.dataset.id
const product = products.find(product =>  Number(product.id) === Number(id))
cart.push(product)
localStorage.setItem('cart' , JSON.stringify(cart))
renderCart(cart)
 }})



 document.getElementById('btn-cart').addEventListener('click' ,  (event) =>  {
   document.getElementById('cart-drawer').classList.add('open')
 })

 document.getElementById('btn-cart-close').addEventListener('click' ,  (event) =>  {
  document.getElementById('cart-drawer').classList.remove('open')
})

document.getElementById('cart-items-list').addEventListener('click' ,  (event) =>  {
if  (event.target.dataset.action === 'remove-from-cart' )  {
 const id = event.target.dataset.id 
const product = products.find(product =>  Number(product.id) === Number(id))
cart = cart.filter(p =>  Number(p.id) !== Number(id))
localStorage.setItem('cart' , JSON.stringify(cart))


renderCart(cart)
}})}





