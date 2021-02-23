import { getReviews, useReviews } from "./reviewProvider.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { authHelper } from "../auth/authHelper.js"
// import { Review } from "./Review.js"

const eventHub = document.querySelector('#container')
let userReviewsElement = document.querySelector(".userReviews")


const _render = ( reviews, products ) => {
 const reviewElements = reviews.map((review) => {
  return `
   <li class="review">
    <p>Date: ${ review.date }</p>
    <p>Product: ${ products.find((product) => product.id === review.productId).name }</p>
    <p>Rating: ${ review.rating }</p>
    <p>Review: ${ review.review }</p>
    <button id="delete--${ review.id }">Delete</button>
   </li>
  `
}).join("")

 userReviewsElement.innerHTML += `
 <section class="yourReviews">
  <h2>Your Reviews</h2>
  <ul class="reviewList>
   ${ reviewElements }
  </ul>
 </section>
 `

} // _render

export const reviewList = () => {
getReviews()
 .then(getProducts)
 .then(() => {
  const _allReviews = useReviews()
  const _products = useProducts()
  const _userId = parseInt(authHelper.getCurrentUserId())
  const _userReviews = _allReviews.filter((review) =>  review.userId === _userId)
  const _productNames = _userReviews.map((review) => {
   return _products.find((product) => product.id === review.productId)
  }) // _userReviews

  debugger
  _render(_userReviews, _productNames)

 })
}