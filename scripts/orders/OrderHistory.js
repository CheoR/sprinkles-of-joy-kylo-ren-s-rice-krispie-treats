const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".userOrders")

 export const renderCustomerOrderHistory = (customerOrderHistory) => {
    // const customerOrderHistory = event.detail.customerOrderHistory
    console.warn("== in order history rendercustomerorderhistory")
    const customerOrder = customerOrderHistory.map(order => {
        return `
            <div class="customerOrders">
                <div class="singleCustomerOrder">
                    <p>Order Id: ${ order.id }</p>
                    <p>Status Id: ${ order.statusId }</p>
                    <p>Timestamp: ${ order.timestamp }</p>
                    <p>Order Total: ${ order.orderTotal }</p>
                    <button id="deleteOrder--${order.id}">Delete</button>
                </div>
            </div>
        `
    }).join("")
    contentTarget.innerHTML = `${customerOrder}`
}

eventHub.addEventListener("showCustomerOrderHistory", event => {
    const customerOrderHistory = event.detail.customerOrderHistory
    const customerOrder = customerOrderHistory.map(order => {
        return `
            <div class="customerOrders">
                <div class="singleCustomerOrder">
                    <p>Order Id: ${ order.id }</p>
                    <p>Status Id: ${ order.statusId }</p>
                    <p>Timestamp: ${ order.timestamp }</p>
                    <p>Order Total: ${ order.orderTotal }</p>
                    <button id="deleteOrder--${order.id}">Delete</button>
                </div>
            </div>
        `
    }).join("")
    contentTarget.innerHTML = `${customerOrder}`
})

// eventHub.addEventListener