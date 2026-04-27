


import { fetchProducts , productChecker } from './api.js'
import { renderProductsUser , renderCart , cartGenerator , insertCategories } from './ui.js'



const products = await productChecker()
renderProductsUser(products,  'shop-grid' )



let  cart

if  (localStorage.getItem('cart') !== null ) {
cart = JSON.parse(localStorage.getItem('cart'))
} else {
   cart = []
}







renderCart(cart)





cartGenerator('shop-grid', products, cart)



 //სერჩი

document.getElementById('shop-search').addEventListener('input' , () => {
const searchResult = document.getElementById('shop-search').value.toLowerCase()
const filteredResult = products.filter(product => product.title.toLowerCase().includes(searchResult))

renderProductsUser(filteredResult , 'shop-grid' )
}
)



//ფილტრი

insertCategories ( products, 'cat-filter')


document.getElementById('cat-filter').addEventListener('change' , () => {
const categoryResult = document.getElementById('cat-filter').value.toLowerCase()
const selectedCategory = products.filter(product => product.category === (categoryResult))

renderProductsUser(selectedCategory , 'shop-grid')

})

