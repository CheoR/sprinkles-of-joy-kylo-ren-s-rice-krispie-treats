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
      console.info("OrderProvider.js")
      console.table(response)
      orders = response
    })
}

export const saveOrder = (order, productsInOrder) => {

  if(authHelper.isUserLoggedIn()) {
    /*
      Either restrict user ability to place order if not logged in, or add disabled class to button if 
      user is not logged in.
    */
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
  } else {
      alert("YOu must be logged in to place order")
  }
} // saveOrder

const dispatchStateChangeEvent = () => {
  const ordersStateChangedEvent = new CustomEvent("ordersStateChanged")
  console.info("Dispatching: ordersStateChanged")
  eventHub.dispatchEvent(ordersStateChangedEvent)
}
