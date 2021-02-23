import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { Order } from "./Order.js"
import { getOrders, useOrders } from "./OrderProvider.js"
import { deleteOrder } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userOrders")
import {renderCustomerOrderHistory} from "./OrderHistory.js"

let customerOrders = []

export const OrderList = () => {
  if (authHelper.isUserLoggedIn()) {
    getOrders()
      .then(() => {
        customerOrders = useOrders()
        renderCustomerOrderHistory(customerOrders)
      })
  }
}

eventHub.addEventListener("showOrderHistory", () => {
  OrderList()
})

eventHub.addEventListener("click", event => {
  if (event.target.id === "modal--close") {
    closeModal()
  }
})

const closeModal = () => {
  contentContainer.innerHTML = ""
}

eventHub.addEventListener("click", clickEvent => {
  
  if (clickEvent.target.id.startsWith("deleteOrder")){
      const [prefix, id] = clickEvent.target.id.split("--")
      deleteOrder(id)
      .then(dispatchEvent)
      .then(OrderList)
    }
})

eventHub.addEventListener("ordersStateChanged", OrderList)

const dispatchEvent = () =>{
  const customEvent = new CustomEvent("orderStatusChanged")
  eventHub.dispatchEvent(customEvent)
}