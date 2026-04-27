import { fetchProducts  , productChecker } from './api.js'
import { renderProducts, updateStats , insertCategories , renderCart , cartGenerator  } from "./ui.js"
let products = await productChecker()

let  cart

if  (localStorage.getItem('cart') !== null ) {
cart = JSON.parse(localStorage.getItem('cart'))
} else {
   cart = []
}


renderCart(cart)

//დეშბორდი
//1. ვამოწმებთ არის თუ არა მომხმარებელი დალოგინებული

 if (!localStorage.getItem('login')) {
    window.location.href = 'login.html';
 }


updateStats(products)
renderProducts(products, 'product-grid')




 //2. ავიღოთ ლოკალ სთორეჯიდან იუზერის ლოგინი და ჩავსვათ 

 const username = localStorage.getItem('login');
 function sayHi() {
document.getElementById('user-greeting').innerText=  `${username}`
document.getElementById('user-name').textContent = username
document.getElementById('user-avatar').textContent = username[0]

 }


 sayHi()



 // გასვლა
document.getElementById('btn-logout').addEventListener('click' , (event) => {
localStorage.removeItem('login')
window.location.href = 'login.html' ;
 })



 //სერჩი

document.getElementById('search-input').addEventListener('input' , () => {
const searchResult = document.getElementById('search-input').value.toLowerCase()
const filteredResult = products.filter(product => product.title.toLowerCase().includes(searchResult))

renderProducts(filteredResult , 'product-grid' )
}
)



//ფილტრი
insertCategories ( products, 'filter-select')


document.getElementById('filter-select').addEventListener('change' , () => {
const categoryResult = document.getElementById('filter-select').value.toLowerCase()
const selectedCategory = products.filter(product => product.category === (categoryResult))

renderProducts(selectedCategory , 'product-grid')

})



//სორტირება


document.getElementById('sort-select').addEventListener('change' , () => {
const checkedFilter = document.getElementById('sort-select').value

if (checkedFilter === 'price-asc')  {
const sorting = [...products].sort((a,b) => a.price - b.price)
renderProducts(sorting , 'product-grid') 
}

else if (checkedFilter === 'price-desc') {
const sorting2 = [...products].sort((a,b) => b.price - a.price)
renderProducts(sorting2 , 'product-grid')
}

else if (checkedFilter === 'name-asc') {
const sorting3 = [...products].sort((a,b) => a.title.localeCompare(b.title))
renderProducts(sorting3 , 'product-grid')
}

else if (checkedFilter === 'name-desc') {

  const sorting4 = [...products].sort((a,b) => b.title.localeCompare(a.title))
  renderProducts(sorting4 , 'product-grid') 
}
})




//პროდუქტის დამატება

document.getElementById('btn-add-product').addEventListener('click' , (event) => {
document.getElementById('add-modal').classList.remove('hidden')
})



document.getElementById('btn-modal-close').addEventListener('click' , (event) => {
document.getElementById('add-modal').classList.add('hidden')
})


document.getElementById('btn-modal-cancel').addEventListener('click' , (event) => {
document.getElementById('add-modal').classList.add('hidden')
})





document.getElementById('add-product-form').addEventListener('submit' , (event) => { event.preventDefault()
const title = document.getElementById('new-title').value 
const price = document.getElementById('new-price').value 
const category = document.getElementById('new-category').value 
const image = document.getElementById('new-image').value 
const desc = document.getElementById('new-desc').value 




if (title === '' || price === '' || category === '' || image === '' || desc === '') {
document.getElementById('modal-error').classList.remove('hidden')
return}
else {
   document.getElementById('add-modal').classList.add('hidden')
}




const newProduct = {
id: Math.max(...products.map(p=> p.id)) +1  ,
title: title,
price: parseFloat(price),
category: category,
image: image,
description: desc ,


}


products.push(newProduct)
localStorage.setItem( 'products' , JSON.stringify(products))


renderProducts(products, 'product-grid')
})



//პროდუქტის წაშლა

document.getElementById('product-grid').addEventListener('click' ,  (event) =>  {
if  (event.target.dataset.action === 'delete')  {
const id = event.target.dataset.id
products = products.filter(product => Number(product.id) !== Number(id))

renderProducts(products , 'product-grid')
localStorage.setItem ('products' , JSON.stringify(products))

cart = cart.filter(p => Number(p.id) !==  Number(id))
localStorage.setItem('cart',  JSON.stringify(cart))
renderCart(cart)
}})


cartGenerator('product-grid',  products,  cart)