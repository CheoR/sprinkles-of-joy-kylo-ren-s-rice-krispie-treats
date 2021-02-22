import { bakeryAPI } from "../Settings.js"
import { saveOrderProducts } from "./OrderProductProvider.js"
import { authHelper } from "../auth/authHelper.js"

const eventHub = document.querySelector("#container")

let orders = []

export const useOrders = () => orders.slice()

export const getOrders = () => {
  return fetch(`${bakeryAPI.baseURL}/orders?_expand=status`)
    .then(response => response.json())
    .then(response => {
      orders = response
    })
}

export const saveOrder = (order, productsInOrder) => {
  return fetch(`${bakeryAPI.baseURL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then(res => res.json())
    .then((createOrder) => {
      const orderProducts = productsInOrder.map(product => {
        return {
          "orderId": createOrder.id,
          "productId": product.id
        }
      })
      return saveOrderProducts(orderProducts)
    })
    .then(() => getOrders())
    .then(dispatchStateChangeEvent)
    .then(() => {
      return
    })
}

const dispatchStateChangeEvent = () => {
  const ordersStateChangedEvent = new CustomEvent("ordersStateChanged")

  eventHub.dispatchEvent(ordersStateChangedEvent)
}

eventHub.addEventListener("showPastOrders", event => {
    if (authHelper.isUserLoggedIn) {
      const currentUserId = parseInt(authHelper.getCurrentUserId())
      getOrders() // get current state of 'orders' in bakerydb.json
      .then(() => {
        const orders = useOrders() // get a copy of current 'orders'
        const customerOrderHistory = orders.filter(order => order.customerId === currentUserId)
        // console.log('customerOrderHistory: ', customerOrderHistory);
      const customEvent = new CustomEvent ("showCustomerOrderHistory", {
        detail: {
          customerOrderHistory: customerOrderHistory
        }
      })
      eventHub.dispatchEvent(customEvent)
    })
  }
})

export const deleteOrder = (id) =>{
  return fetch(`http://localhost:8088/bakerydb/orders/${id}`, {
    method: "DELETE"
})
.then(getOrders)
}