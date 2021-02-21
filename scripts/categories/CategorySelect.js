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
