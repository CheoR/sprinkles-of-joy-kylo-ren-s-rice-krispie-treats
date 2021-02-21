import { bakeryAPI } from "../Settings.js"
import { saveOrderProducts } from "./OrderProductProvider.js"

const eventHub = document.querySelector("#container")

let orders = []

export const useOrders = () => orders.slice()

export const getOrders = () => {
  return fetch(`${bakeryAPI.baseURL}/orders?_expand=status`)
    .then(response => response.json())
    .then(response => {
      console.info("OrderProvider.js")
      console.table(response)
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
    .then(() => {
      const orderProducts = productsInOrder.map(product => {
        return {
          "orderId": order.id,
          "productId": product.id
        }
      })
      console.info("OrderProvider.js - saveOrder")
      console.table(orderProducts)
      productsInOrder = [] //change
      return saveOrderProducts(orderProducts)
    })
    .then(() => getOrders())
    .then(dispatchStateChangeEvent)
}

const dispatchStateChangeEvent = () => {
  const ordersStateChangedEvent = new CustomEvent("ordersStateChanged")
  console.info("Dispatching: ordersStateChanged")
  eventHub.dispatchEvent(ordersStateChangedEvent)
}
