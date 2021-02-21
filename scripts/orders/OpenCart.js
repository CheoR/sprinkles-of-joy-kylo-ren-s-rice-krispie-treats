import { getProducts, useProducts } from "./../products/ProductProvider.js"
import { authHelper } from "../auth/authHelper.js"
import { getStatuses, useStatuses } from "../statuses/StatusProvider.js"
import { saveOrder } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const userCart = document.querySelector(".userCart")

let productsInCart = []

export const OpenCart = () => {
  render()
}

const render = () => {
  let cartHTML = ""
  let totalCost = 0
  if (productsInCart){
    console.info("OpenCart.js")
    console.table(productsInCart)
    for (const product of productsInCart) {
      cartHTML += `
        <div class="cart">
          <p>${product.name}</p>
          <p>$${product.price.toFixed(2)}</p>
        </div>
      `
      totalCost += product.price
    }
  
    userCart.innerHTML = `
      <div>
      <h4>Cart</h4>
      ${cartHTML}
      <hr/>
      <div class="cart">
      <button id="placeOrder">Place Order</button>
      <p>$${totalCost.toFixed(2)}</p>
      </div>
      </div>
    `
    
  }
    else {
      userCart.innerHTML = ""
    }
}

eventHub.addEventListener("showCustomerCart", e => OpenCart())

eventHub.addEventListener("addToCart", event => {
  const productId = event.detail.addedProduct
  getProducts()
    .then(() => {
      const allProducts = useProducts()
      const productToBeAdded = allProducts.find(prod => prod.id === productId)
      productsInCart.push(productToBeAdded)

      console.info("OpenCart.js - addToCart")
      console.table(allProducts)
      console.table(productToBeAdded)
      OpenCart()
    })
})

eventHub.addEventListener("click", clickEvent => {

    const options = {
      hour: '2-digit',
      minute: '2-digit',
      year: "numeric",  
      month: "numeric",  
      day: "numeric"
    }
  if (clickEvent.target.id === "placeOrder" && productsInCart.length !== 0) {
    const currentCustomerId = parseInt(authHelper.getCurrentUserId())
    getStatuses()
      .then(() => {
        const allStatuses = useStatuses()
        const initialOrderStatus = allStatuses.find(status => status.label.toLowerCase() === "Scheduled".toLowerCase())

        const dateObj = new Date()

        const newOrder = {
          "customerId": currentCustomerId,
          "statusId": initialOrderStatus.id,
          "timestamp": dateObj.toLocaleDateString('en-US', options)
        }

        console.info("OpenCart.js - placeOrder")
        console.table(newOrder)
        console.table(productsInCart)
        return saveOrder(newOrder, productsInCart)
      })
  }
})
