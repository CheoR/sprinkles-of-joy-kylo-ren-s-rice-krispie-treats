import { getCategories, useCategories } from "./CategoryProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".filter__category")

let categories = []

export const CategorySelect = () => {
  getCategories()
  .then(() => {
    categories = useCategories()
    console.info("CategoryProvider.js")
    console.table(categories)
    render()
  })
}


const render = () => {
  const categoriesMap = categories.map(category => `<option value="${category.id}">${category.name}</option>`).join("")
  contentTarget.innerHtml = `
  <select class="dropdown" id="categorySelect">
  <option value="0">All baked goods...</option>
  ${categoriesMap}
      </select>
  `
}

eventHub.addEventListener("change", changeEvent => {
  if (changeEvent.target.id === "categorySelect") {
    const categoryCustomEvent = new CustomEvent("categorySelected", {
      detail: {
        selectedCategory: changeEvent.target.value
      }
    })
    console.info("dispatching: categorySelected")
    eventHub.dispatchEvent(categoryCustomEvent)
  }
})

// dispatch seems good but we are not listening to the change when a category is selected.
// we need to set up a CategoryList.js and render the categories as they are selected / checking the categoryId against the category chosen.
