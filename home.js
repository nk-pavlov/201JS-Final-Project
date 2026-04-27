
// ფუნქციების იმპორტი
import {fetchProducts , productChecker} from './api.js'
import {renderProductsUser, updateStats , cartGenerator , renderCart } from "./ui.js"

let  cart

if  (localStorage.getItem('cart') !== null ) {
cart = JSON.parse(localStorage.getItem('cart'))
} else {
   cart = []
}

renderCart(cart)


const allProducts = await productChecker()
const featuredProducts = allProducts.slice(0, 8)
document.getElementById('featured-loader').classList.add('hidden')
renderProductsUser(featuredProducts, 'featured-grid')

updateStats(allProducts)
cartGenerator('featured-grid', allProducts, cart)
