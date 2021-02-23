import { bakeryAPI } from "../Settings.js"
import { authHelper } from "../auth/authHelper.js"

let _reviews = []
const eventHub = document.querySelector('#container')
const dateOptions = {
  hour: '2-digit',
  minute: '2-digit',
  year: "numeric",  
  month: "numeric",  
  day: "numeric"
}


export const useReviews = () => _reviews.slice()

export const getReviews = () => {
 return fetch(`${bakeryAPI.baseURL}/reviews`)
  .then(response => response.json())
  .then(prasedResponse => {
   _reviews = prasedResponse
  })
}

const _saveReview = ( review ) => {
  /*
    Review Obj.
    {
        "date": "2/23/2021, 06:56 AM",
        "userId": 1,
        "productId": 3,
        "rating": 4,
        "review": "test",
        "id": 1
    }

  */
  return fetch(`${bakeryAPI.baseURL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  })
} // _saveReview


eventHub.addEventListener("reviewFormSubmitted", clickEvent => {

  const dateObj = new Date()

  const _date = document.querySelector("#reviewDate").value || `${dateObj.toLocaleDateString('en-US', dateOptions)}`
  const _userId = authHelper.getCurrentUserId()
  const _productId = parseInt(document.querySelector("#productSelection").value)
  const _rating = parseInt(document.querySelector("#ratingSelection").value)
  const _review = document.querySelector("#reviewEntry").value

  const newReview = {
    date: _date,
    userId: parseInt(_userId),
    productId: _productId,
    rating: parseInt(_rating),
    review: _review
  }

_saveReview(newReview)
  .then(getReviews)
  .then(() => {
    console.info("reviewFormSubmitted saved - need to dispatach state changed")
  }) // _saveReview
}) // eventHub - click
