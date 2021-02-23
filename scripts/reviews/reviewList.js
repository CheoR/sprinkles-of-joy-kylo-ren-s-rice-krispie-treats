import { getReviews, useReviews } from "./reviewProvider.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { authHelper } from "../auth/authHelper.js"
import { Review } from "./Review.js"

const eventHub = document.querySelector('#container')


const _render = ( reviews, products ) => {
 let userReviewsElement = document.querySelector(".userReviewList")
 const reviewElements = reviews.map((review) => Review(review, products)).join("")

 userReviewsElement.innerHTML = `
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

  _render(_userReviews, _productNames)

 })
} // reviewList


eventHub.addEventListener("reviewDBChangeEvent", reviewList) // reviewDBChangeEvent
