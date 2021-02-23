import { getReviews, useReviews } from "./reviewProvider.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { authHelper } from "../auth/authHelper.js"

const eventHub = document.querySelector('#container')
let userReviewsElement = document.querySelector(".userReviews")


const _render = ( productsCollection ) => {
 console.log("made it to here")
 console.table(productsCollection)

 const products = productsCollection.map(( product ) => `<option value="${ product.id }">${ product.name }</option>`) // productsCollection

/*
  TODO: figure out why submit button works even if no selection is made. Fields marked 'rquired' do not raise warning if selection not made.
  Removing "0" from value in default selection does nothing.
*/

 userReviewsElement.innerHTML = `
  <h2>Add Review</h2>
  <form action="" method="POST" class="userReviews__form">
   <fieldset>
    <label for="reviewDate">Date of Entry</label>
    <input type="date" name="reviewDate" id="reviewDate">

    <label for="productSelection">Product:</label>
    <select name="productSelection" id="productSelection" required >
     <option value="0">Product</option>
     ${ products }
    </select>

    <label for="ratingSelection">Rating:</label>
    <select name="ratingSelection" id="ratingSelection" required >
     <option value="0">Rating</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>

    <label for="reviewEntry">Review Entry</label>
    <textarea id="reviewEntry" name="reviewEntry" rows="5" cols="33" placeholder="Review here . . "></textarea>
   </fieldset>
   <input id="submit" type="submit" value="Submit" />
  </form>
 `
}


eventHub.addEventListener('showNewReviewForm', clickEvent => {
getProducts()
 .then(() => {
   const products = useProducts()
   if(authHelper.isUserLoggedIn()) {
     _render(products)
   } else {
     alert("Please log in to review product")
   }
 }) // getProducts
}) // evenHub


eventHub.addEventListener("click", clickEvent => {
 clickEvent.preventDefault()

 if(authHelper.isUserLoggedIn() && clickEvent.target.id === "submit") {  
    eventHub.dispatchEvent(new CustomEvent("reviewFormSubmitted"))
 } // if
}) // eventHub - click
