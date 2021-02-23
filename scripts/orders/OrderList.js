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
    console.info("OrderList.js")
    getOrders()
      .then(() => {
        customerOrders = useOrders()
        console.warn("in OrderLIst ")
        renderCustomerOrderHistory(customerOrders)
      })
  }
}

// const render = () => {
//   const ordersHtmlRepresentation = customerOrders.map(order => Order(order)).join("")

//   contentContainer.innerHTML = `
//   <div id="orders__modal" class="modal--parent">
//         <div class="modal--content">
//         <h3>Previous Orders</h3>
//         <div>
//         <h5>Ordered on</h5>
//         ${ordersHtmlRepresentation}
//         </div>
//         <button id="modal--close">Close</button>
//         </div>
//     </div>
//       `
// }

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

      console.log("click event here")
      deleteOrder(id)
      .then(dispatchEvent)
      .then(OrderList)
    } // if
})

eventHub.addEventListener("ordersStateChanged", OrderList)

const dispatchEvent = () =>{
  const customEvent = new CustomEvent("orderStatusChanged")
  eventHub.dispatchEvent(customEvent)
  // debugger
  console.log("event disptached")
}