const eventHub = document.querySelector("#container")
import { authHelper } from "../auth/authHelper.js"

export const Review = ( review, products ) => {
 const productName = products.find((product) => product.id === review.productId).name

 return `
  <li class="review">
   <p>Date: ${ review.date }</p>
   <p>Product: ${ productName }</p>
   <p>Rating: ${ review.rating }</p>
   <p>Review: ${ review.review }</p>
   <button id="delete--${ review.id }">Delete</button>
  </li>
 `
} // Review


eventHub.addEventListener("click", clickEvent => {
 if(authHelper.isUserLoggedIn() && clickEvent.target.id.startsWith("delete")) {
  const [prefix, id] = clickEvent.target.id.split("--")
  const deleteEvent = new CustomEvent("userDeletedReview", {
   detail: {
    reviewId: id
   }
  })
  eventHub.dispatchEvent(deleteEvent)
 }
}) // eventHub - click