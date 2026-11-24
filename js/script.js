// UPDATE 1: Get cart data from Local Storage

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// UPDATE 2: Add food to cart

function addFood(name, price) {

    let food = cart.find(function(item) {
        return item.name === name;
    });

    if (food) {

        food.quantity++;

    } else {

        let newFood = {
            name: name,
            price: price,
            quantity: 1
        };

        cart.push(newFood);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Food added to cart");

}


// UPDATE 3: Display cart items

function displayCart() {

    let output = "";
    let subtotal = 0;

    cart.forEach(function(food, index) {

        let itemTotal = food.price * food.quantity;

        subtotal = subtotal + itemTotal;

        output += `
            <tr>
                <td>${food.name}</td>

                <td>₹${food.price}</td>

                <td>
                    <button onclick="changeQuantity(${index}, -1)">-</button>

                    ${food.quantity}

                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </td>

                <td>₹${itemTotal}</td>

                <td>
                    <button onclick="removeFood(${index})">
                        Remove
                    </button>
                </td>
            </tr>
        `;

    });


    // Display cart items

    let cartItems = document.getElementById("cart-items");

    if (cartItems) {
        cartItems.innerHTML = output;
    }


    // UPDATE 4: Calculate bill

    let delivery = subtotal > 0 ? 40 : 0;

    let total = subtotal + delivery;


    // Display item count

    let count = document.getElementById("item-count");

    if (count) {
        count.textContent = cart.length;
    }


    // Display subtotal

    let amount = document.getElementById("subtotal-amount");

    if (amount) {
        amount.textContent = "₹" + subtotal;
    }


    // Display delivery charges

    let deliveryAmount = document.getElementById("delivery-amount");

    if (deliveryAmount) {
        deliveryAmount.textContent = "₹" + delivery;
    }


    // Display final total

    let totalAmount = document.getElementById("total-amount");

    if (totalAmount) {
        totalAmount.textContent = "₹" + total;
    }

}


// UPDATE 5: Increase or decrease quantity

function changeQuantity(index, value) {

    cart[index].quantity = cart[index].quantity + value;

    if (cart[index].quantity === 0) {

        cart.splice(index, 1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// UPDATE 6: Remove food from cart

function removeFood(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// UPDATE 7: Clear complete cart

function clearCart() {

    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// UPDATE 8: Clear Cart button

let clearButton = document.getElementById("clear-cart");

if (clearButton) {

    clearButton.addEventListener("click", clearCart);

}


// UPDATE 9: Display saved cart when page loads

displayCart();


// search 

function searchFood(){

    let search=document.getElementById("search").value.toLowerCase();
    let products=document.querySelectorAll(".product");
    products.forEach(function(food){
        let name=food.querySelector("h3").textContent.toLowerCase();
        if(name.includes(search)){
            food.style.display="block";
        }
        else{
            food.style.display="none";
        }
    });
}