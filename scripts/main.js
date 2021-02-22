console.log("Welcome to Sprinkles of Joy!")

import "./customers/RegisterForm.js"
import "./orders/OpenCart.js"
import "./orders/OrderList.js"
import { CustomerNav } from "./customers/CustomerNav.js"
import { CategorySelect } from "./categories/CategorySelect.js"
import { LoginForm } from "./customers/LoginForm.js"
import { ProductList } from "./products/ProductList.js"
import "./orders/OrderHistory.js"

console.info("Main.js")
LoginForm()
CustomerNav()
CategorySelect()
ProductList()

console.info("All modules loaded . . i think")
