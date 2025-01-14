
// //------Start OF SHOPPING CART-----------------------------------------------------//
// // OPEN & CLOSE CART
// const cartIcon = document.querySelector("#cart-icon");
// const cart = document.querySelector(".cart");
// const closeCart = document.querySelector("#cart-close");

// cartIcon.addEventListener("click", () => {
//     cart.classList.add("active");
// });

// closeCart.addEventListener("click", () => {
//     cart.classList.remove("active");
// });

// // Start when the document is ready
// if (document.readyState == "loading") {
//     document.addEventListener("DOMContentLoaded", start);
// } else {
//     start();
// }

// // =============== START ====================
// function start() {
//     addEvents();
// }

// // ============= UPDATE & RERENDER ===========
// function update() {
//     addEvents();
//     updateTotal();
// }

// // =============== ADD EVENTS ===============
// function addEvents() {
//     // Remove items from cart
//     let cartRemove_btns = document.querySelectorAll(".cart-remove");
//     console.log(cartRemove_btns);
//     cartRemove_btns.forEach((btn) => {
//         btn.addEventListener("click", handle_removeCartItem);
//     });

//     // Change item quantity
//     let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
//     cartQuantity_inputs.forEach((input) => {
//         input.addEventListener("change", handle_changeItemQuantity);
//     });

//     // Add item to cart
//     let addCart_btns = document.querySelectorAll(".add-cart");
//     addCart_btns.forEach((btn) => {
//         btn.addEventListener("click", handle_addCartItem);
//         // cart.classList.add("active");
//     });

//     // Buy Order
//     const buy_btn = document.querySelector(".btn-buy");
//     buy_btn.addEventListener("click", handle_buyOrder);
// }

// // ============= HANDLE EVENTS FUNCTIONS =============
// let itemsAdded = [];

// function handle_addCartItem() {
//     let product = this.parentElement;
//     let title = product.querySelector(".product-title").innerHTML;
//     let price = product.querySelector(".product-price").innerHTML;
//     let imgSrc = product.querySelector(".product-img").src;
//     console.log(title, price, imgSrc);

//     let newToAdd = {
//         title,
//         price,
//         imgSrc,
//     };

//     // handle item is already exist
//     if (itemsAdded.find((el) => el.title == newToAdd.title)) {
//         alert("This Item Is Already Exist!");
//         return;
//     } else {
//         itemsAdded.push(newToAdd);
//     }

//     // Add product to cart
//     let cartBoxElement = CartBoxComponent(title, price, imgSrc);
//     let newNode = document.createElement("div");
//     newNode.innerHTML = cartBoxElement;
//     const cartContent = cart.querySelector(".cart-content");
//     cartContent.appendChild(newNode);

//     update();
// }

// function handle_removeCartItem() {
//     this.parentElement.remove();
//     itemsAdded = itemsAdded.filter(
//         (el) =>
//             el.title !=
//             this.parentElement.querySelector(".cart-product-title").innerHTML
//     );

//     update();
// }

// function handle_changeItemQuantity() {
//     if (isNaN(this.value) || this.value < 1) {
//         this.value = 1;
//     }

//     // detects if the number of an item in a cart is equal to 10
//     else if (this.value > 10) {
//         this.value = 10;
//     }
//     this.value = Math.floor(this.value); // to keep it integer

//     update();
// }

// function handle_buyOrder() {
//     if (itemsAdded.length <= 0) {
//         alert("There is No Order to Place Yet! \nPlease Make an Order first.");
//         return;
//     }
//     const cartContent = cart.querySelector(".cart-content");
//     cartContent.innerHTML = "";
//     alert("Your Order is Placed Successfully :)");
//     itemsAdded = [];

//     update();
// }

// // =========== UPDATE & RERENDER FUNCTIONS =========
// function updateTotal() {
//     let cartBoxes = document.querySelectorAll(".cart-box");
//     const totalElement = cart.querySelector(".total-price");
//     let total = 0;
//     cartBoxes.forEach((cartBox) => {
//         let priceElement = cartBox.querySelector(".cart-price");
//         let price = parseFloat(priceElement.innerHTML.replace("$", ""));
//         let quantity = cartBox.querySelector(".cart-quantity").value;
//         total += price * quantity;
//     });

//     // keep 2 digits after the decimal point
//     total = total.toFixed(2);
//     // or you can use also
//     // total = Math.round(total * 100) / 100;

//     totalElement.innerHTML = "$" + total;
// }

// // ============= HTML COMPONENTS =============
// function CartBoxComponent(title, price, imgSrc) {
//     return `
//     <div class="cart-box">
//         <img src=${imgSrc} alt="" class="cart-img">
//         <div class="detail-box">
//             <div class="cart-product-title">${title}</div>
//             <div class="cart-price">${price}</div>
//             <input type="number" value="1" class="cart-quantity">
//         </div>
//         <!-- REMOVE CART  -->
//         <i class='bx bxs-trash-alt cart-remove'></i>
//     </div>`;
// }

// //------END OF SHOPPING CART-----------------------------------------------------//


//------Start OF SHOPPING CART-----------------------------------------------------//

// selects the cart icon in the navbar, the cart and the cart close button
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");
const cartOverlay = document.querySelector(".cart-overlay");

// adds the class active to the cart when the cart icon is clicked
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
    cartOverlay.classList.add("active");
});

// removes the class active from the cart when the close icon is clicked
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
    cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
    cart.classList.remove("active");
    cartOverlay.classList.remove("active");
});

// starts when the document is ready
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}

// =============== START ====================
function start() {
    updateCartDisplay();
}

// ============= UPDATE & RERENDER ===========
function update() {
    updateTotal();
}

// =============== ADD EVENTS ===============
function addEvents() {
    // removes items from cart
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    // changes item quantity
    let minusButtons = document.querySelectorAll(".quantity-btn.minus");
    let plusButtons = document.querySelectorAll(".quantity-btn.plus");
    minusButtons.forEach((btn) => {
        btn.addEventListener("click", handle_decreaseQuantity);
    });
    plusButtons.forEach((btn) => {
        btn.addEventListener("click", handle_increaseQuantity);
    });

    // adds item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });

    // buy Order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}

// ============= HANDLE EVENTS FUNCTIONS =============
function handle_addCartItem() {
    let product = this.closest('.product-box');
    let title = product.querySelector(".product-title").innerHTML;
    let price = parseFloat(product.querySelector(".product-price").innerHTML.replace('$', ''));
    let imgSrc = product.querySelector(".product-img").src;
    let size = document.querySelector('input[name="size"]:checked').nextElementSibling.innerHTML;
    let quantity = parseInt(document.getElementById('quantity').value);

    let newToAdd = {
        title,
        price,
        imgSrc,
        size,
        quantity
    };

    // handles if the item has already been added to the cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cart.find((el) => el.title == newToAdd.title && el.size == newToAdd.size);
    if (existingItem) {
        // if item has already been added, then increase the item quantity by the selected quantity to a max of 10
        existingItem.quantity = Math.min(existingItem.quantity + quantity, 10);
    } else {
        // if item isn't already in the cart, then add the item to the cart
        cart.push(newToAdd);
    }

    // saves the current items in the cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // updates the cart display
    updateCartDisplay();

    // opens the cart when adding an item to the cart
    document.querySelector(".cart").classList.add("active");

    // closes the modal
    document.getElementById('dialog').close();
}

function updateCartDisplay() {
    const cartContent = document.querySelector(".cart-content");
    cartContent.innerHTML = '';

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach(item => {
        let cartBoxElement = CartBoxComponent(item.title, item.price, item.imgSrc, item.size, item.quantity);
        let newNode = document.createElement("div");
        newNode.innerHTML = cartBoxElement;
        cartContent.appendChild(newNode);
    });

    updateTotal();
    addEvents();
}

function handle_removeCartItem() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let title = this.parentElement.querySelector(".cart-product-title").innerHTML;
    let size = this.parentElement.querySelector(".cart-size").innerHTML.split(": ")[1];
    
    cart = cart.filter(el => !(el.title == title && el.size == size));
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartDisplay();
}

function updateCartItem(button, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let title = button.closest('.cart-box').querySelector(".cart-product-title").innerHTML;
    let item = cart.find(el => el.title == title);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateTotal();
}

function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = document.querySelector(".cart .total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        // gets the price of each item that is in the cart and multiplies it by its quantity then adds it to the total
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = parseInt(cartBox.querySelector(".cart-quantity").textContent.replace("Quantity: ", ""));
        total += price * quantity;
    });

    // rounds the total to 2 decimal places
    total = total.toFixed(2);
    // adds the total to the .total-price element + a $ sign
    totalElement.innerHTML = "$" + total;
}

function handle_buyOrder() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length <= 0) {
        // shows the modal
        let modal = document.getElementById("orderModal");
        modal.style.display = "block";

        // closes the modal when clicking on the x
        let span = document.getElementsByClassName("close")[0];
        span.onclick = function () {
            modal.style.display = "none";
        }

        // closes the modal when clicking outside of it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        return;
    }
    localStorage.removeItem('cart');

    // opens the checkout page
    location.href = "checkout.html";

    // closes the cart
    document.querySelector(".cart").classList.remove("active");

    updateCartDisplay();
}

// =========== UPDATE & RERENDER FUNCTIONS =========
function handle_removeCartItem() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let title = this.parentElement.querySelector(".cart-product-title").innerHTML;
    let size = this.parentElement.querySelector(".cart-size").innerHTML.split(": ")[1];
    
    cart = cart.filter(el => !(el.title == title && el.size == size));
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartDisplay();
}

// ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc, size, quantity) {
    // outputs the HTML for each item that gets added to the cart (title, price, img, size, and its quantity)
    return `
    <div class="cart-box">
        <img src="${imgSrc}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="price-section">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">$${price.toFixed(2)}</div>
            </div>
            <div class="cart-size">Size: ${size}</div>
            <div class="cart-quantity">Quantity: ${quantity}</div>
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}

//------END OF SHOPPING CART-----------------------------------------------------//