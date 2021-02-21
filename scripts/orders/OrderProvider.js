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
      .then(res => { 
        const res_json = res.json()
        // console.info("OrderProvider.js  res.json()")
        // console.table(res_json)
        return res_json
      })
      .then((createdOrder) => {
        /*
          response from 41 will be in order.id is the saved order

        */
        console.info("OrderProvider.js - saveOrder - productsInOrder")
        console.table(productsInOrder)
        console.table(order)
        console.log("=====")

        /*
        OrderProduct is saving without orderId
        {
          "productId": 1,
          "id": 1
        },
        {
          "productId": 2,
          "id": 2
        }
        */
        const orderProducts = productsInOrder.map(product => {
          return {
            "orderId": createdOrder.id,
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
      /*
        statusId needs to be set before calling getOrders, else resuts in error:
        GET http://localhost:8088/orders?_expand=status net::ERR_CONNECTION_REFUSED
      */
  } else {
      alert("YOu must be logged in to place order")
  }
} // saveOrder

const dispatchStateChangeEvent = () => {
  const ordersStateChangedEvent = new CustomEvent("ordersStateChanged")
  console.info("Dispatching: ordersStateChanged")
  eventHub.dispatchEvent(ordersStateChangedEvent)
}
