import { bakeryAPI } from "../Settings.js"
import { saveOrderProducts } from "./OrderProductProvider.js"

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
      productsInOrder = [] //change
      return saveOrderProducts(orderProducts)
    })
    .then(() => getOrders())
    .then(dispatchStateChangeEvent)
}

const dispatchStateChangeEvent = () => {
  const ordersStateChangedEvent = new CustomEvent("ordersStateChanged")

  eventHub.dispatchEvent(ordersStateChangedEvent)
}
