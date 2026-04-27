export async function fetchProducts() {
  const response = await fetch('https://fakestoreapi.com/products')

  if (response.ok) {
    const products = await response.json()
    console.log('products:', products)
    return products
  } else {
    console.log('დაფიქსირდა შეცდომა', response.status)
  }
}


export async  function productChecker(){
let products 

if (localStorage.getItem('products') !== null) {
    products = JSON.parse(localStorage.getItem('products'))
} else {
    products = await fetchProducts()
} 

return products

}